<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");


try {
    include ("connect.php");

    // Check if the 'id' parameter is provided in the URL
    if (!isset($_GET['id'])) {
        throw new Exception('Exam ID is missing.');
    }

    // Get the exam ID from the URL
    $id = $_GET['id'];

    // Query to fetch the exam with the provided ID
    $sql = "SELECT * FROM exams WHERE exam_id = '$id'";
    $result = mysqli_query($db_conn, $sql);

    // Check if the exam exists
    if (mysqli_num_rows($result) > 0) {
        // Fetch the exam details
        $exam = mysqli_fetch_assoc($result);
        $examType = $exam['type'];
        $noOfQuestions = $exam["questions"];

        // Calculate exam duration
        $startTime = strtotime($exam['start']);
        $endTime = strtotime($exam['end']);
        $durationMinutes = ($endTime - $startTime) / 60;

        // Query to fetch questions and options by exam type
        $questionSql = "
            SELECT q.*, o.*
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            WHERE type = '$examType'
        ";
        $questionResult = mysqli_query($db_conn, $questionSql);

        $questions = [];
        while ($row = mysqli_fetch_assoc($questionResult)) {
            $questions[] = $row;
        }

        // Return response
        if ($questions) {
            echo json_encode(['success' => true, 'questions' => $questions]);
        } else {
            throw new Exception('No questions found for the exam.'. $examType);
        }
    } else {
        // Exam not found
        throw new Exception('Exam not found.');
    }
} catch (Exception $e) {
    // Error handling
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

