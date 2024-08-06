<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getResult($_GET['id']);
        } else {
            getResults();
        }
        break;
    case 'POST':
        createResult();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Exam ID is required for update"));
        } else {
            updateResult($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Exam ID is required for deletion"));
        }
        deleteResult($_GET['id']);
        break;
    default:
        break;
}

function getResults()
{
    include ("connect.php");

    $sql = "SELECT * FROM results";
    $result = $db_conn->query($sql);

    $results = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $results[] = $row; // Add each row to the $users array
        }
        echo json_encode($results); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No Result found"));
    }

    $db_conn->close();
    return;
}

function getResult($id)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM results WHERE id = ?";

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
        $result = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($result);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "Result not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}


function createResult()
{
    include ("connect.php");

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);


    // Sanitize input data
    $exam = mysqli_real_escape_string($db_conn, $data['exam']);
    $title = mysqli_real_escape_string($db_conn, $data['title']); // Make sure to sanitize and validate this input
    $candidateID = mysqli_real_escape_string($db_conn, $data['candidateid']);
    $firstname = mysqli_real_escape_string($db_conn, $data['firstname']);
    $lastname = mysqli_real_escape_string($db_conn, $data['lastname']);
    $score = mysqli_real_escape_string($db_conn, $data['score']); // Make sure to sanitize and validate this input
    $examno = mysqli_real_escape_string($db_conn, $data['examno']); // Make sure to sanitize and validate this input
    $seatno = mysqli_real_escape_string($db_conn, $data['seatno']);
    $examiner = mysqli_real_escape_string($db_conn, $data['examiner']);
    $sub1 = mysqli_real_escape_string($db_conn, $data['sub1']);
    $sub2 = mysqli_real_escape_string($db_conn, $data['sub2']);
    $sub3 = mysqli_real_escape_string($db_conn, $data['sub3']);
    $sub4 = mysqli_real_escape_string($db_conn, $data['sub4']);

    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    // Create the SQL query
    $sql = "INSERT INTO results (exam, title, firstname, lastname, candidate_id, examno, seatno, examiner, score, sub1, sub2, sub3, sub4, created_at, updated_at) 
            VALUES ('$exam','$title','$firstname','$lastname','$candidateID','$examno','$seatno','$examiner','$score','$sub1','$sub2','$sub3', '$sub4','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        echo "Result created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}


function updateResult($id)
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

    // Validate and sanitize input data
    // Example validation: Check if required fields are present
    if (!isset($data['id'], $data['username'], $data['firstname'], $data['lastname'], $data['exam'], $data['percentage'])) {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "All fields are required"));
        return;
    }

    // Sanitize input data if necessary
    $id = mysqli_real_escape_string($db_conn, $id);
    $exam = mysqli_real_escape_string($db_conn, $data['exam']);
    $title = mysqli_real_escape_string($db_conn, $data['title']); // Make sure to sanitize and validate this input
    $candidateID = mysqli_real_escape_string($db_conn, $data['candidateid']);
    $firstname = mysqli_real_escape_string($db_conn, $data['firstname']);
    $lastname = mysqli_real_escape_string($db_conn, $data['lastname']);
    $score = mysqli_real_escape_string($db_conn, $data['score']); // Make sure to sanitize and validate this input
    $examno = mysqli_real_escape_string($db_conn, $data['examno']); // Make sure to sanitize and validate this input
    $seatno = mysqli_real_escape_string($db_conn, $data['seatno']);
    $examiner = mysqli_real_escape_string($db_conn, $data['examiner']);
    $sub1 = mysqli_real_escape_string($db_conn, $data['sub1']);
    $sub2 = mysqli_real_escape_string($db_conn, $data['sub2']);
    $sub3 = mysqli_real_escape_string($db_conn, $data['sub3']);
    $sub4 = mysqli_real_escape_string($db_conn, $data['sub4']);

    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE results SET exam='$exam', title='$title', firstname='$firstname', lastname='$lastname', candidate_id='$candidateID', score='$score', examno='$examno', seatno='$seatno', examiner='$examiner', sub1='$sub1', sub2='$sub2', sub3='$sub3', sub4='$sub4', updated_at='$updatedAt' WHERE id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "result updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating result: " . mysqli_error($db_conn)));
    }
}


function deleteResult($id)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $id);


    $checkSql = "SELECT id FROM result WHERE id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM result WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Result deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting Result: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Result not found"));
    }
}





