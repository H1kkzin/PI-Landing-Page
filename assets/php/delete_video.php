<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "landing_page_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Falha na conexão com o banco de dados.']));
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id'])) {
    die(json_encode(['success' => false, 'message' => 'ID do vídeo não fornecido.']));
}

$id = $data['id'];

$stmt = $conn->prepare("DELETE FROM videos WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Vídeo excluído com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao excluir o vídeo: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>