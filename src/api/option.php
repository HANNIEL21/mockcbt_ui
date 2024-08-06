<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getOption($_GET['id']);
        } else {
            getOptions();
        }
        break;
    case 'POST':
        createOption();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Option ID is required for update"));
        } else {
            updateOption($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Option ID is required for deletion"));
        }
        deleteOption($_GET['id']);
        break;
    default:
        break;
}

function getOptions()
{
    include ("connect.php");

    $sql = "SELECT * FROM options";
    $result = $db_conn->query($sql);

    $options = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $options[] = $row; // Add each row to the $options array
        }
        echo json_encode(array("data"=> $options, "error"=>"")); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("error" => "No Option found"));
    }

    $db_conn->close();
    return;
}

function getOption($id)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM options WHERE option_id = ?";

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
        $option = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($option);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "Option not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}

function createOption()
{
    include ("connect.php");

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);


    // Sanitize input data
    $question_id = mysqli_real_escape_string($db_conn, $data['question_id']);
    $value = mysqli_real_escape_string($db_conn, $data['value']);
    $score = mysqli_real_escape_string($db_conn, $data['score']);


    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    $sql = "INSERT INTO questions (question_id, value, score, created_at, updated_at) 
    VALUES ('$question_id','$value','$score','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        echo json_encode(array("message" => "Option created successfully"));
    } else {
        echo json_encode(array("message" => "message: " . $sql . "<br>" . mysqli_error($db_conn))); "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateOption($id)
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
    $option_id = mysqli_real_escape_string($db_conn, $id);
    $qid = mysqli_real_escape_string($db_conn, $data['qid']);
    $value = mysqli_real_escape_string($db_conn, $data['value']);
    $score = mysqli_real_escape_string($db_conn, $data['score']);

    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE options SET question_id='$qid', value='$value', score='$score', updatedAt='$updatedAt' WHERE option_id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "Option updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating Option: " . mysqli_error($db_conn)));
    }
}

function deleteOption($id)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $id);


    $checkSql = "SELECT id FROM options WHERE option_id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM options WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Option deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting Option: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Option not found"));
    }
}