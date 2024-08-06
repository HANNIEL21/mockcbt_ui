<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "engine";

// Create connection
$db_conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($db_conn->connect_error) {
    die("Connection failed: " . $db_conn->connect_error);
}