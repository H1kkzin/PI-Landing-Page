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

$sql = "SELECT id, titulo, url_vimeo, descricao FROM videos ORDER BY data_adicao DESC";
$result = $conn->query($sql);

$videos = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $videos[] = $row;
    }
}

echo json_encode($videos);

$conn->close();
?>