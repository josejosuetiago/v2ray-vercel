import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();

export default (req, res) => {
  const target = "https://se.zclaro.com.br"; // Substitua pelo endereço da VPS.

  // Adicionando tratamento de erros
  proxy.on("error", (err) => {
    console.error("Erro no proxy WebSocket:", err.message);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Erro ao conectar ao servidor WebSocket.");
    }
  });

  // Redirecionando a solicitação
  proxy.web(req, res, { target, changeOrigin: true });
}
