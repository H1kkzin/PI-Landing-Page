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

if (empty($data['titulo'])) {
    die(json_encode(['success' => false, 'message' => 'O título não pode ser vazio.']));
}

$titulo = $data['titulo'];
$url_vimeo = $data['url_vimeo'];
$descricao = $data['descricao'];

$stmt = $conn->prepare("INSERT INTO videos (titulo, url_vimeo, descricao) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $titulo, $url_vimeo, $descricao);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Vídeo salvo com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar o vídeo: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>