<?php
// Configurações de e-mail
$destinatario = "xxxxx@gmail.com"; // Substitua pelo e-mail desejado
$assunto = "Nova mensagem do site Ignitech";

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturar dados do formulário
    $nome = filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $mensagem = filter_var($_POST['mensagem'], FILTER_SANITIZE_STRING);
    
    // Validar dados
    if (empty($nome) || empty($email) || empty($mensagem)) {
        echo "<script>alert('Por favor, preencha todos os campos.'); window.history.back();</script>";
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Por favor, insira um e-mail válido.'); window.history.back();</script>";
        exit;
    }
    
    // Montar o corpo do e-mail
    $corpo_email = "
    <html>
    <head>
        <title>Nova mensagem do site Ignitech</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1976D2; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nova mensagem do site Ignitech</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nome:</div>
                    <div class='value'>" . htmlspecialchars($nome) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>E-mail:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Mensagem:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($mensagem)) . "</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Cabeçalhos do e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    // Enviar e-mail
    if (mail($destinatario, $assunto, $corpo_email, $headers)) {
        echo "
        <!DOCTYPE html>
        <html lang='pt-BR'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Mensagem Enviada - Ignitech</title>
            <link rel='stylesheet' href='estilo.css'>
        </head>
        <body>
            <div class='container' style='text-align: center; padding: 100px 20px;'>
                <h1 style='color: #1976D2;'>Mensagem Enviada com Sucesso!</h1>
                <p style='font-size: 1.2rem; margin-bottom: 30px;'>Obrigado por entrar em contato conosco. Responderemos em breve.</p>
                <a href='index.html' style='background: linear-gradient(90deg, #1976D2 0%, #63A0FB 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;'>Voltar ao Site</a>
            </div>
        </body>
        </html>
        ";
    } else {
        echo "
        <!DOCTYPE html>
        <html lang='pt-BR'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Erro no Envio - Ignitech</title>
            <link rel='stylesheet' href='estilo.css'>
        </head>
        <body>
            <div class='container' style='text-align: center; padding: 100px 20px;'>
                <h1 style='color: #d32f2f;'>Erro no Envio</h1>
                <p style='font-size: 1.2rem; margin-bottom: 30px;'>Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.</p>
                <a href='index.html' style='background: linear-gradient(90deg, #1976D2 0%, #63A0FB 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;'>Voltar ao Site</a>
            </div>
        </body>
        </html>
        ";
    }
} else {
    // Redirecionar se acessado diretamente
    header("Location: index.html");
    exit;
}
?>

