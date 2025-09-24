<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Configurações do banco de dados
$servername = "localhost";
$username = "root"; // Usuário padrão do XAMPP
$password = ""; // Senha padrão do XAMPP
$dbname = "landing_page_db"; // O nome do banco de dados que você criou

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Checa a conexão
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Falha na conexão com o banco de dados.']));
}

// Recebe os dados do formulário
$data = json_decode(file_get_contents('php://input'), true);
$nome = $data['nome'];
$email = $data['email'];
$feedback = $data['feedback'];

// Prepara e executa a query de inserção
$stmt = $conn->prepare("INSERT INTO comentarios (nome, email, feedback) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $feedback);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Comentário salvo com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar o comentário: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>