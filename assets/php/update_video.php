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

if (!isset($data['id']) || !isset($data['titulo']) || !isset($data['url_vimeo']) || !isset($data['descricao'])) {
    die(json_encode(['success' => false, 'message' => 'Dados incompletos para a atualização.']));
}

$id = $data['id'];
$titulo = $data['titulo'];
$url_vimeo = $data['url_vimeo'];
$descricao = $data['descricao'];

$stmt = $conn->prepare("UPDATE videos SET titulo = ?, url_vimeo = ?, descricao = ? WHERE id = ?");
$stmt->bind_param("sssi", $titulo, $url_vimeo, $descricao, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Vídeo atualizado com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o vídeo: ' . $conn->error]);
}

$stmt->close();
$conn->close();
?>