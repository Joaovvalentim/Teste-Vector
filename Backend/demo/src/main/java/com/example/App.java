package com.example;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import org.json.JSONObject;

public class App {

    public static void main(String[] args) throws IOException {
        // Cria o servidor HTTP na porta 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Define um endpoint POST em "/api"
        server.createContext("/api", new PostHandler());

        // Inicia o servidor
        server.setExecutor(null);
        System.out.println("Servidor iniciado na porta 8080");
        server.start();
    }


    static class PostHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                byte[] requestBody = exchange.getRequestBody().readAllBytes();
                String body = new String(requestBody);

                // Log do corpo da requisição
                System.out.println("Corpo da requisicao: " + body);

                JSONObject json = new JSONObject(body);

                // Extrai os campos
                String cod = json.getString("cod");
                String descricao = json.getString("descricao");
                String valor = json.getString("valor");

                // Insere os dados no banco de dados
                System.out.println("Inserindo no banco de dados:");
                System.out.println("INSERT INTO TB_PRODUTOS (cod, descricao, valor)");
                System.out.println("VALUES (" + cod + ", '" + descricao + "', " + valor + ");");

                // Cria uma resposta JSON
                String jsonResponse = "{\"status\": \"sucesso\", \"mensagem\": \"Dados recebidos\"}";

                // Define cabeçalhos CORS
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", " POST");
                exchange.getResponseHeaders().add("Content-Type", "application/json");

                // Envia a resposta
                exchange.sendResponseHeaders(200, jsonResponse.getBytes().length);

                // Escreve a resposta
                OutputStream os = exchange.getResponseBody();
                os.write(jsonResponse.getBytes());
                os.close();
            } else if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {

                // Resposta para requisição preflight OPTIONS
                String optionsResponse = "";
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST");
                exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(200, 0); 
                OutputStream os = exchange.getResponseBody();
                os.write(optionsResponse.getBytes());
                os.close();
            } else {
                // Retorna 405 se o método não for POST
                String errorResponse = "Método não permitido";
                exchange.sendResponseHeaders(405, errorResponse.length());
                OutputStream os = exchange.getResponseBody();
                os.write(errorResponse.getBytes());
                os.close();
            }
        }
    }
}
