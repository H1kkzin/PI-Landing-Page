<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "landing_page_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Falha na conexão com o banco de dados.']));
}

$sql = "SELECT nome, feedback FROM comentarios ORDER BY id DESC";
$result = $conn->query($sql);

$comentarios = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = $row;
    }
}

echo json_encode($comentarios);

$conn->close();
?>