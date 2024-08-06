<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
        if (isset($data["username"])) {
            $username = $data['username'];
            authenticate($username);
        } else if (isset($data["password"])) {
            $password = $data['password']; // Corrected variable name
            authenticatePass($password);
        } else {
            // Invalid request
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "Username or password is required")); // Changed message
        }
        break;
    default:
        // Handle other HTTP methods if needed
        break;
}

function authenticate($name)
{
    include ("connect.php");
    $sqlu = "SELECT * FROM users WHERE username = ?";
    $sqlc = "SELECT * FROM candidates WHERE examno = ?";

    // Prepare and execute the query to check the users table
    $stmt = $db_conn->prepare($sqlu);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // If username is found in users table, return the user data
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        // If username is not found in users table, check candidates table
        $stmt = $db_conn->prepare($sqlc);
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // If username is found in candidates table, return the candidate data
            $candidate = $result->fetch_assoc();
            echo json_encode($candidate);
        } else {
            // If username is not found in candidates table, return an error message
            echo json_encode(array("message" => "Invalid username or reg.no"));
        }
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}



function authenticatePass($pass)
{
    include ("connect.php");
    $sql = "SELECT * FROM users WHERE password = ?";
    $stmt = $db_conn->prepare($sql);
    $stmt->bind_param("s", $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        echo json_encode(array("error" => "Invalid User password found"));
    }

    $stmt->close();
    $db_conn->close();
    return;
}
