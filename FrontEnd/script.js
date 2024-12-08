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

    const cod = document.getElementById("cod").value;
    const descricao = document.getElementById("descricao").value;
    const valor = document.getElementById("valor").value;

    const productData = {
        cod,
        descricao,
        valor: valor.replace('R$ ', '').replace(',', '.'), // Converte para formato numérico
    };

    console.log(JSON.stringify(productData, null, 2));
});
