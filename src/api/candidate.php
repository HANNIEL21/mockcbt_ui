<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getOneCandidate($_GET['id']);
        } else {
            getCandidates();
        }
        break;
    case 'POST':
        createCandidate();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "User ID is required for update"));
        } else {
            updateCandidate($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "User ID is required for deletion"));
        }
        deleteCandidate($_GET['id']);
        break;
    default:
        break;
}

function getCandidates()
{
    include ("connect.php");

    $sql = "SELECT * FROM candidates";
    $result = $db_conn->query($sql);

    $candidates = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $candidates[] = $row; // Add each row to the $candidates array
        }
        echo json_encode($candidates); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No candidates found"));
    }

    $db_conn->close();
    return;
}

function getOneCandidate($cID)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM candidates WHERE id = ?";

    // Prepare the SQL statement
    $stmt = $db_conn->prepare($sql);

    // Bind the user ID parameter to the SQL statement
    $stmt->bind_param("i", $cID);

    // Execute the SQL statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if a user with the given ID exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $candidate = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($candidate);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "Candidate not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}


function createCandidate()
{
    include ("connect.php"); // Include connect.php to access $db_conn

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input data
    $firstname = mysqli_real_escape_string($db_conn, $data['firstname']);
    $lastname = mysqli_real_escape_string($db_conn, $data['lastname']);
    $username = $firstname . '.' . $lastname;
    $username = mysqli_real_escape_string($db_conn, $username);
    $email = mysqli_real_escape_string($db_conn, $data['email']);
    $phone = mysqli_real_escape_string($db_conn, $data['phone']);
    $gender = mysqli_real_escape_string($db_conn, $data['gender']);
    $exam = mysqli_real_escape_string($db_conn, $data['exam']);
    $group = mysqli_real_escape_string($db_conn, $data['group']);
    $seatno = mysqli_real_escape_string($db_conn, $data['seatno']);
    $examno = mysqli_real_escape_string($db_conn, $data['examno']);
    $time = mysqli_real_escape_string($db_conn, $data['time']);
    $date = mysqli_real_escape_string($db_conn, $data['date']);
    $state = mysqli_real_escape_string($db_conn, $data['state']);
    $photo = mysqli_real_escape_string($db_conn, $data['photo']);
    $faculty = mysqli_real_escape_string($db_conn, $data['faculty']);
    $department = mysqli_real_escape_string($db_conn, $data['department']);

    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    $sql = "INSERT INTO candidates (username, firstname, lastname, email, exam, phone, `group`, gender, seatno, examno, time, date, state, photo, faculty, department, created_at, updated_at)
        VALUES ('$username','$firstname','$lastname','$email','$exam','$phone','$group','$gender','$seatno','$examno','$time','$date','$state','$photo','$faculty','$department','$createdAt','$updatedAt')";

    // Execute the query
    if (mysqli_query($db_conn, $sql)) {
        echo "candidate created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateCandidate($cID)
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
    $id = mysqli_real_escape_string($db_conn, $cID);
    $firstname = mysqli_real_escape_string($db_conn, $data['firstname']);
    $lastname = mysqli_real_escape_string($db_conn, $data['lastname']);
    $username = mysqli_real_escape_string($db_conn, $data['username']);
    $email = mysqli_real_escape_string($db_conn, $data['email']);
    $phone = mysqli_real_escape_string($db_conn, $data['phone']);
    $gender = mysqli_real_escape_string($db_conn, $data['gender']);
    $exam = mysqli_real_escape_string($db_conn, $data['exam']);
    $group = mysqli_real_escape_string($db_conn, $data['group']);
    $seatno = mysqli_real_escape_string($db_conn, $data['seatno']);
    $examno = mysqli_real_escape_string($db_conn, $data['examno']);
    $time = mysqli_real_escape_string($db_conn, $data['time']);
    $date = mysqli_real_escape_string($db_conn, $data['date']);
    $state = mysqli_real_escape_string($db_conn, $data['state']);
    $photo = mysqli_real_escape_string($db_conn, $data['photo']);
    $faculty = mysqli_real_escape_string($db_conn, $data['faculty']);
    $dept = mysqli_real_escape_string($db_conn, $data['department']);


    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE candidates SET username='$username', email='$email', exam='$exam', firstname='$firstname', lastname='$lastname', phone='$phone', gender='$gender', `group`='$group', seatno='$seatno', examno='$examno', time='$time', date='$date', state='$state', photo='$photo', faculty='$faculty', department='$dept', updated_at='$updatedAt' WHERE id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "candidate updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating candidate: " . mysqli_error($db_conn)));
    }
}

function deleteCandidate($cID)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $cID);


    $checkSql = "SELECT id FROM candidates WHERE id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM candidates WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "candidate deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting candidate: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "candidate not found"));
    }
}





