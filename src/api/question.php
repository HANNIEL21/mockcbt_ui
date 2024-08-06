<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getQuestion($_GET['id']);
        } else {
            getQuestions();
        }
        break;
    case 'POST':
        createQuestion();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Question ID is required for update"));
        } else {
            updateQuestion($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Question ID is required for deletion"));
        }
        deleteQuestion($_GET['id']);
        break;
    default:
        break;
}

function getQuestions()
{
    include ("connect.php");

    $sql = "SELECT * FROM questions";
    $result = $db_conn->query($sql);

    $exams = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $exams[] = $row; // Add each row to the $users array
        }
        echo json_encode($exams); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No Questions found"));
    }

    $db_conn->close();
    return;
}

function getQuestion($id)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM questions WHERE id = ?";

    // Prepare the SQL statement
    $stmt = $db_conn->prepare($sql);

    // Bind the user ID parameter to the SQL statement
    $stmt->bind_param("i", $id);

    // Execute the SQL statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if a user with the given ID exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $question = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($question);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "Question not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}

function createQuestion()
{
    include ("connect.php");

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input data
    $question = mysqli_real_escape_string($db_conn, $data['question']);
    $ans = mysqli_real_escape_string($db_conn, $data['answer']);
    $course = mysqli_real_escape_string($db_conn, $data['course']);
    $type = mysqli_real_escape_string($db_conn, $data['type']);
    $category = mysqli_real_escape_string($db_conn, $data['category']);
    $mark = mysqli_real_escape_string($db_conn, $data['mark']);
    $opt1 = mysqli_real_escape_string($db_conn, $data['opt1']);
    $opt2 = mysqli_real_escape_string($db_conn, $data['opt2']);
    $opt3 = mysqli_real_escape_string($db_conn, $data['opt3']);
    $opt4 = mysqli_real_escape_string($db_conn, $data['opt4']);
    $opt5 = mysqli_real_escape_string($db_conn, $data['opt5']);

    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    $sql = "INSERT INTO questions (question, answer, course, type, mark, category, created_at, updated_at) VALUES ('$question','$ans','$course','$type','$mark','$category','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        $questionId = mysqli_insert_id($db_conn);
        echo "Question created successfully with ID $questionId";

        // Create options
        $sqlOptions = "INSERT INTO options (question_id, opt1, opt2, opt3, opt4, opt5, created_at, updated_at) 
        VALUES ('$questionId','$opt1','$opt2','$opt3','$opt4','$opt5','$createdAt','$updatedAt')";
        if (mysqli_query($db_conn, $sqlOptions)) {
            echo "Options created successfully";
        } else {
            echo "Error creating options: ". mysqli_error($db_conn);
        }
    } else {
        echo "Error: ". $sql. "<br>". mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateQuestion($id)
{
    include ("connect.php");

    // Check if request data is JSON
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Check if JSON decoding was successful
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        // Handle JSON decoding error
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Invalid JSON data"));
        return;
    }


    // Sanitize input data if necessary
    $id = mysqli_real_escape_string($db_conn, $id);
    $question = mysqli_real_escape_string($db_conn, $data['question']);
    $ans = mysqli_real_escape_string($db_conn, $data['ans']);
    $sub = mysqli_real_escape_string($db_conn, $data['sub']);
    $type = mysqli_real_escape_string($db_conn, $data['type']);
    $category = mysqli_real_escape_string($db_conn, $data['category']);

    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE questions SET question='$question', answer='$ans', subject='$sub', type='$type', category='$category', updatedAt='$updatedAt' WHERE id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "Question updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating Question: " . mysqli_error($db_conn)));
    }
}

function deleteQuestion($id)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $id);


    $checkSql = "SELECT id FROM questions WHERE id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM questions WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Question deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting Question: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Question not found"));
    }
}