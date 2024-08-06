        <?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if it's a regular GET or a getOneUser request
        if (isset($_GET['id'])) {
            getExam($_GET['id']);
        } else {
            getExams();
        }
        break;
    case 'POST':
        createExam();
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Exam ID is required for update"));
        } else {
            updateExam($_GET['id']);
        }
        break;

    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Exam ID is required for deletion"));
        }
        deleteExam($_GET['id']);
        break;
    default:
        break;
}

function getExams()
{
    include ("connect.php");

    $sql = "SELECT * FROM exams";
    $result = $db_conn->query($sql);

    $exams = array(); // Initialize an empty array to store users

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $exams[] = $row; // Add each row to the $users array
        }
        echo json_encode($exams); // Echo the JSON representation of the array
    } else {
        echo json_encode(array("message" => "No Exams found"));
    }

    $db_conn->close();
    return;
}

function getExam($id)
{
    include ("connect.php");

    // Prepare SQL statement with a placeholder for the user ID
    $sql = "SELECT * FROM exams WHERE exam_id = ?";

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
        $exam = $result->fetch_assoc();
        // Echo the JSON representation of the user data
        echo json_encode($exam);
    } else {
        // If no user found with the given ID, echo a message
        echo json_encode(array("message" => "Exam not found"));
    }

    // Close the database connection
    $stmt->close();
    $db_conn->close();
    return;
}


function createExam()
{
    include ("connect.php");

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input data
    $exam = mysqli_real_escape_string($db_conn, $data['exam']);
    $questions = mysqli_real_escape_string($db_conn, $data['questions']);
    $duration = mysqli_real_escape_string($db_conn, $data['duration']);
    $start = mysqli_real_escape_string($db_conn, $data['start']);
    $end = mysqli_real_escape_string($db_conn, $data['end']);
    $title = mysqli_real_escape_string($db_conn, $data['title']);
    $type = mysqli_real_escape_string($db_conn, $data['type']);
    $group = mysqli_real_escape_string($db_conn, $data['group']);
    $sub1 = mysqli_real_escape_string($db_conn, $data['sub1']);
    $sub2 = mysqli_real_escape_string($db_conn, $data['sub2']);
    $sub3 = mysqli_real_escape_string($db_conn, $data['sub3']);
    $sub4 = mysqli_real_escape_string($db_conn, $data['sub4']);

    // Set createdAt and updatedAt
    $createdAt = date('Y-m-d H:i:s');
    $updatedAt = date('Y-m-d H:i:s');

    // Execute the query
    $sql = "INSERT INTO exams (exam, questions, duration, start, end, title, type, `group`, sub1, sub2, sub3, sub4, created_at, updated_at) VALUES ('$exam', '$questions', '$duration', '$start', '$end', '$title', '$type', '$group', '$sub1', '$sub2', '$sub3', '$sub4', '$createdAt', '$updatedAt')";

    if (mysqli_query($db_conn, $sql)) {
        echo "Exam created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db_conn);
    }

    // Close the database connection
    mysqli_close($db_conn);
}

function updateExam($id)
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
    $exam = mysqli_real_escape_string($db_conn, $data['exam']);
    $questions = mysqli_real_escape_string($db_conn, $data['questions']);
    $duration = mysqli_real_escape_string($db_conn, $data['duration']);
    $start = mysqli_real_escape_string($db_conn, $data['start']);
    $end = mysqli_real_escape_string($db_conn, $data['end']);
    $title = mysqli_real_escape_string($db_conn, $data['title']);
    $sub1 = mysqli_real_escape_string($db_conn, $data['sub1']);
    $sub2 = mysqli_real_escape_string($db_conn, $data['sub2']);
    $sub3 = mysqli_real_escape_string($db_conn, $data['sub3']);
    $sub4 = mysqli_real_escape_string($db_conn, $data['sub4']);
    $type = mysqli_real_escape_string($db_conn, $data['type']);
    $group = mysqli_real_escape_string($db_conn, $data['group']);

    // Get current timestamp
    $updatedAt = date('Y-m-d H:i:s');

    // Execute UPDATE query
    $sql = "UPDATE exams SET exam='$exam', questions='$questions', duration='$duration', start='$start', end='$end', title='$title', sub1='$sub1', sub2='$sub2', sub3='$sub3', sub4='$sub4', type='$type', `group`='$group', updated_at='$updatedAt' WHERE exam_id=$id";

    if (mysqli_query($db_conn, $sql)) {
        http_response_code(200); // OK
        echo json_encode(array("message" => "Exam updated successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("message" => "Error updating exam: " . mysqli_error($db_conn)));
    }

    // Close the database connection
    mysqli_close($db_conn);
}




function deleteExam($id)
{
    include ("connect.php");

    $id = mysqli_real_escape_string($db_conn, $id);


    $checkSql = "SELECT id FROM exams WHERE id = '$id'";
    $result = mysqli_query($db_conn, $checkSql);

    if (mysqli_num_rows($result) > 0) {

        $deleteSql = "DELETE FROM exams WHERE id = '$id'";
        if (mysqli_query($db_conn, $deleteSql)) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Exam deleted successfully"));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting Exam: " . mysqli_error($db_conn)));
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array("message" => "Exam not found"));
    }
}





