<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getDepartment($_GET['id']);
        } else {
            getDepartments();
        }
        break;
    case 'POST':
        createDepartment();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Faculty ID is required for update"));
        } else {
            updateDepartment($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Faculty ID is required for deletion"));
        }
        deleteDepartment($_GET['id']);
        break;
    default:
        break;
}

function getDepartments()
{
    include ("connect.php");

    $sql = "SELECT * FROM departments";
    $result = $db_conn->query($sql);

    $departments = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $departments[] = $row; // Add each row to the $departments array
        }
        echo json_encode($departments); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No departments found"));
    }

    $db_conn->close();
    return;
}

function getDepartment($dID)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM departments WHERE department_id = ?";

    // Prepare the SQL statement
    $stmt = $db_conn->prepare($sql);

    // Bind the user ID parameter to the SQL statement
    $stmt->bind_param("i", $dID);

    // Execute the SQL statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if a user with the given ID exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $department = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($department);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "department not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}

function createDepartment()
{
    include ("connect.php"); // Include connect.php to access $db_conn

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input data
    $faculty_id = mysqli_real_escape_string($db_conn, $data['fID']);
    $department_title = mysqli_real_escape_string($db_conn, $data['title']);
  
    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    $sql = "INSERT INTO departments (faculty_id, department_title, created_at, updated_at)
        VALUES ('$faculty_id','$department_title','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        echo "candidate created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateDepartment($dID)
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
    $id = mysqli_real_escape_string($db_conn, $dID);
    $faculty_id = mysqli_real_escape_string($db_conn, $data['fID']);
    $department_title = mysqli_real_escape_string($db_conn, $data['title']);
 
    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE departments SET faculty_id='$faculty_id', department_title='$department_title',  updated_at='$updatedAt' WHERE department_id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "department updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating department: " . mysqli_error($db_conn)));
    }
}

function deleteDepartment($dID)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $dID);


    $checkSql = "SELECT id FROM departments WHERE department_id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM departments WHERE department_id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "department deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting department: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "department not found"));
    }
}





