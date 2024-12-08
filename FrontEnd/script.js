// Função para formatar como moeda
function formatCurrency(value) {
    const cleanValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = parseInt(cleanValue, 10) || 0; // Garante que o valor seja numérico
    const formattedValue = (numericValue / 100).toFixed(2).replace('.', ','); // Formata como 0,00
    return `R$ ${formattedValue}`;
}

// Evento para aplicar a máscara enquanto o usuário digita
document.getElementById('valor').addEventListener('input', function (e) {
    e.target.value = formatCurrency(e.target.value);
});

// Função para validar campos obrigatórios
function validateForm() {
    const fields = document.querySelectorAll('#productForm input');
    let isValid = true;

    fields.forEach((field) => {
        const errorMessage = field.nextElementSibling;

        if (!field.value.trim()) {
            field.classList.add('error');
            errorMessage.textContent = 'Este campo é obrigatório.';
            errorMessage.classList.add('visible');
            isValid = false;
        } else {
            field.classList.remove('error');
            errorMessage.textContent = '';
            errorMessage.classList.remove('visible');
        }
    });

    return isValid;
}

// Evento para salvar os dados
document.getElementById("saveButton").addEventListener("click", function () {
    if (!validateForm()) {
        return; // Para a execução se houver campos inválidos
    }

    const cod = parseInt(document.getElementById('cod').value, 10);
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value.replace('R$ ', '').replace(',', '.');


    const productData = {
        cod,
        descricao,
        valor: parseFloat(valor),
    };

    console.log(JSON.stringify(productData, null, 2));
});

// Chamando a API em JAVA
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('productForm');
    const saveButton = document.getElementById('saveButton');
    const messageDiv = document.createElement('div');
    const messageDivError = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDivError.className = 'error-message';

    saveButton.parentElement.appendChild(messageDiv);
    saveButton.parentElement.appendChild(messageDivError);

    saveButton.addEventListener('click', async () => {
        const cod = document.getElementById('cod').value;
        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value.replace('R$ ', '').replace(',', '.');

        if (cod && descricao && valor) {
            messageDivError.textContent = '';
            const produto = {
                cod,
                descricao,
                valor,
            };

            try {
                const response = await fetch('http://localhost:8080/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(produto)
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar os dados');
                }

                const resultado = await response.json();

                // Exibe a mensagem de sucesso e limpa os campos
                messageDiv.textContent = `Produto salvo com sucesso!`;
                setTimeout(() => {
                    messageDiv.textContent = '';
                    form.reset();
                }, 2000);

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        } else {
            messageDivError.textContent = `Preencha todos os campos para salvar o produto!`;
        }
    });
});

var valorNum = document.getElementById("cod")

valorNum.addEventListener("keydown", function (e) {
    // prevent: "e"
    if ([69].includes(e.keyCode)) {
        e.preventDefault();
    }
})