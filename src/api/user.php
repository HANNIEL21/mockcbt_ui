<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getOneUser($_GET['id']);
        } else {
            getUsers();
        }
        break;
    case 'POST':
        createUser();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "User ID is required for update"));
        } else {
            updateUser($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "User ID is required for deletion"));
        }
        deleteUser($_GET['id']);
        break;
    default:
        break;
}

function getUsers()
{
    include ("connect.php");

    $sql = "SELECT * FROM users";
    $result = $db_conn->query($sql);

    $users = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row; // Add each row to the $users array
        }
        echo json_encode($users); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No users found"));
    }

    $db_conn->close();
    return;
}

function getOneUser($userId)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM users WHERE id = ?";

    // Prepare the SQL statement
    $stmt = $db_conn->prepare($sql);

    // Bind the user ID parameter to the SQL statement
    $stmt->bind_param("i", $userId);

    // Execute the SQL statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if a user with the given ID exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $user = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($user);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "User not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}


function createUser()
{
    include ("connect.php"); // Include connect.php to access $db_conn

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input data
    $username = mysqli_real_escape_string($db_conn, $data['username']);
    $firstname = mysqli_real_escape_string($db_conn, $data['firstname']);
    $lastname = mysqli_real_escape_string($db_conn, $data['lastname']);
    $email = mysqli_real_escape_string($db_conn, $data['email']);
    $password = mysqli_real_escape_string($db_conn, $data['password']);
    $phone = mysqli_real_escape_string($db_conn, $data['phone']);
    $gender = mysqli_real_escape_string($db_conn, $data['gender']);
    $usergroup = mysqli_real_escape_string($db_conn, $data['usergroup']);
    $role = mysqli_real_escape_string($db_conn, $data['role']);

    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    $sql = "INSERT INTO users (username, firstname, lastname, email, password, phone, gender, usergroup, role, createdAt, updatedAt) VALUES ('$username','$firstname','$lastname','$email','$password','$phone','$gender','$usergroup','$role','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateUser($userID)
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
    if (!isset($data['id'], $data['username'], $data['email'], $data['password'], $data['firstname'], $data['lastname'], $data['phone'], $data['gender'], $data['usergroup'], $data['role'])) {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "All fields are required"));
        return;
    }

    // Sanitize input data if necessary
    $id = mysqli_real_escape_string($db_conn, $userID);
    $username = mysqli_real_escape_string($db_conn, $data['username']);
    $email = mysqli_real_escape_string($db_conn, $data['email']);
    $password = mysqli_real_escape_string($db_conn, $data['password']);
    $firstname = mysqli_real_escape_string($db_conn, $data['firstname']);
    $lastname = mysqli_real_escape_string($db_conn, $data['lastname']);
    $phone = mysqli_real_escape_string($db_conn, $data['phone']);
    $gender = mysqli_real_escape_string($db_conn, $data['gender']);
    $usergroup = mysqli_real_escape_string($db_conn, $data['usergroup']);
    $role = mysqli_real_escape_string($db_conn, $data['role']);

    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE users SET username='$username', email='$email', password='$password', firstname='$firstname', lastname='$lastname', phone='$phone', gender='$gender', usergroup='$usergroup', role='$role', updatedAt='$updatedAt' WHERE id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "User updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating user: " . mysqli_error($db_conn)));
    }
}


function deleteUser($userID)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $userID);


    $checkSql = "SELECT id FROM users WHERE id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM users WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "User deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting user: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "User not found"));
    }
}





