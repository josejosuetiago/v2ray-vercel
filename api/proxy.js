import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();

export default (req, res) => {
  const target = "wss://se.zclaro.com.br:443"; // Substitua pelo endereço da sua VPS.

  // Redirecionando a solicitação para a VPS
  proxy.web(req, res, { target, changeOrigin: true }, (err) => {
    console.error("Erro ao encaminhar a solicitação:", err);
    res.status(502).send("Erro ao conectar ao servidor WebSocket.");
  });

  // Escutando erros de WebSocket
  proxy.on("error", (err) => {
    console.error("Erro no proxy WebSocket:", err);
  });
};
