<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOne request
        if (isset($_GET['id'])) {
            getCourse($_GET['id']);
        } else {
            getCourses();
        }
        break;
    case 'POST':
        createCourse();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Course ID is required for update"));
        } else {
            updateCourse($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Course ID is required for deletion"));
        }
        deleteCourse($_GET['id']);
        break;
    default:
        break;
}

function getCourses()
{
    include ("connect.php");

    $sql = "SELECT * FROM courses";
    $result = $db_conn->query($sql);

    $courses = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $courses[] = $row; // Add each row to the $courses array
        }
        echo json_encode($courses); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No Courses found"));
    }

    $db_conn->close();
    return;
}

function getCourse($ID)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM courses WHERE id = ?";

    // Prepare the SQL statement
    $stmt = $db_conn->prepare($sql);

    // Bind the user ID parameter to the SQL statement
    $stmt->bind_param("i", $ID);

    // Execute the SQL statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if a user with the given ID exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $course = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($course);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "course not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}

function createCourse()
{
    include ("connect.php"); // Include connect.php to access $db_conn

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input data
    $title = mysqli_real_escape_string($db_conn, $data['title']);
    $code = mysqli_real_escape_string($db_conn, $data['code']);
  
    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    $sql = "INSERT INTO courses (title, code, created_at, updated_at)
        VALUES ('$title','$code','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        echo "course created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateCourse($ID)
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
    $id = mysqli_real_escape_string($db_conn, $ID);
    $title = mysqli_real_escape_string($db_conn, $data['title']);
    $code = mysqli_real_escape_string($db_conn, $data['code']);
 
    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE courses SET id='$id', title='$title', code='$code', updated_at='$updatedAt' WHERE id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "course updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating course: " . mysqli_error($db_conn)));
    }
}

function deleteCourse($ID)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $ID);


    $checkSql = "SELECT id FROM courses WHERE id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM courses WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "course deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting course: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "course not found"));
    }
}





