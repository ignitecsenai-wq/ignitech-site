// Alternativa JavaScript para envio de e-mail usando EmailJS
// Para usar este código, você precisa configurar uma conta no EmailJS (https://www.emailjs.com/)

// Configuração do EmailJS (substitua pelos seus dados)
const EMAIL_CONFIG = {
    serviceID: 'service_zaj2pai', // Substitua pelo seu Service ID do EmailJS
    templateID: 'template_6qt5ztk', // Substitua pelo seu Template ID do EmailJS
    userID: '2YsM2TGKVFFgIDiYm' // Substitua pelo seu User ID do EmailJS
};

// Função para inicializar o EmailJS
function inicializarEmailJS() {
    emailjs.init(EMAIL_CONFIG.userID);
}

// Função para enviar e-mail
function enviarEmail(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    // Capturar dados do formulário
    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const mensagem = document.querySelector('textarea[name="mensagem"]').value;
    
    // Validar campos
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Mostrar loading
    const botaoEnviar = document.querySelector('.formulario-contato .botao');
    const textoOriginal = botaoEnviar.textContent;
    botaoEnviar.textContent = 'Enviando...';
    botaoEnviar.disabled = true;
    
    // Parâmetros para o template do EmailJS
    const templateParams = {
        from_name: nome,
        from_email: email,
        message: mensagem,
        to_email: 'ignitecsenai@gmail.com' // Substitua pelo e-mail de destino
    };
    
    // Enviar e-mail usando EmailJS
    emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, templateParams)
        .then(function(response) {
            console.log('E-mail enviado com sucesso!', response.status, response.text);
            mostrarMensagemSucesso();
            limparFormulario();
        })
        .catch(function(error) {
            console.error('Erro ao enviar e-mail:', error);
            mostrarMensagemErro();
        })
        .finally(function() {
            // Restaurar botão
            botaoEnviar.textContent = textoOriginal;
            botaoEnviar.disabled = false;
        });
}

// Função para validar e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-sucesso';
    mensagem.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(90deg, #1976D2 0%, #63A0FB 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
        ">
            <h3 style="margin-bottom: 15px;">Mensagem Enviada com Sucesso!</h3>
            <p style="margin-bottom: 20px;">Obrigado por entrar em contato conosco. Responderemos em breve.</p>
            <button onclick="fecharMensagem()" style="
                background: rgba(255,255,255,0.2);
                border: 1px solid white;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            ">Fechar</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        " onclick="fecharMensagem()"></div>
    `;
    document.body.appendChild(mensagem);
}

// Função para mostrar mensagem de erro
function mostrarMensagemErro() {
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-erro';
    mensagem.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(90deg, #d32f2f 0%, #f44336 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
        ">
            <h3 style="margin-bottom: 15px;">Erro no Envio</h3>
            <p style="margin-bottom: 20px;">Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.</p>
            <button onclick="fecharMensagem()" style="
                background: rgba(255,255,255,0.2);
                border: 1px solid white;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            ">Fechar</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        " onclick="fecharMensagem()"></div>
    `;
    document.body.appendChild(mensagem);
}

// Função para fechar mensagem
function fecharMensagem() {
    const mensagemSucesso = document.querySelector('.mensagem-sucesso');
    const mensagemErro = document.querySelector('.mensagem-erro');
    
    if (mensagemSucesso) {
        mensagemSucesso.remove();
    }
    
    if (mensagemErro) {
        mensagemErro.remove();
    }
}

// Função para limpar formulário
function limparFormulario() {
    document.querySelector('input[name="nome"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('textarea[name="mensagem"]').value = '';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS (descomente quando configurar)
    inicializarEmailJS();
    
    // Adicionar event listener ao formulário
    const formulario = document.querySelector('.formulario-contato');
    if (formulario) {
        formulario.addEventListener('submit', enviarEmail);
    }
});

