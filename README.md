1. Pré-requisitos
Certifique-se de que as seguintes ferramentas estão instaladas no seu ambiente de desenvolvimento:

IDE recomendada: Visual Studio Code (VSCode)
Maven: versão 3.9.9 ou superior (Instalar Maven)
Java: versão 21.0.5 (Instalar Java)

2. Clonar o Repositório
Realize o download ou clone o repositório utilizando o comando abaixo no terminal:

bash
Copy code
git clone https://github.com/usuario/teste-vector.git
Abra o código na IDE de sua preferência. Recomendamos o Visual Studio Code para uma melhor experiência.


3. Executar o Frontend
Instale a extensão Live Server no VSCode:

Acesse a aba de extensões no VSCode (ícone no lado esquerdo ou Ctrl+Shift+X).
Busque por "Live Server" e clique em Instalar.
Após a instalação:

Abra o arquivo principal do frontend (HTML) na IDE.
No canto inferior direito do VSCode, clique em "Go Live" para iniciar o servidor.
O servidor frontend estará disponível em http://127.0.0.1:5500 ou similar, dependendo da configuração.

4. Executar o Backend
Instale a extensão Extension Pack for Java no VSCode:

Na aba de extensões, busque por "Extension Pack for Java" e clique em Instalar.
No terminal, certifique-se de que o Maven está configurado corretamente. Verifique utilizando:

bash
Copy code
mvn -v
Navegue até o diretório do projeto backend e execute o seguinte comando para baixar as dependências:

bash
Copy code
mvn clean install
No arquivo App.java (localizado em src/main/java):

Clique com o botão direito e selecione "Run Java" ou utilize a opção "RUN" disponível no editor.
O backend será executado na porta 8080. Certifique-se de que essa porta está disponível.


5. Tecnologias Utilizadas
Frontend: Servidor estático com Live Server.
Backend: Java gerenciado pelo Maven.
6. Versões das Dependências
Certifique-se de utilizar as seguintes versões para evitar problemas de compatibilidade:

Maven: 3.9.9
Java: 21.0.5
