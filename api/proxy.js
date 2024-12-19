import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();

export default (req, res) => {
  const target = "wss://45.140.192.26:443"; // Substitua pelo endereço da sua VPS.

  // Verificar o protocolo WebSocket
  if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === "websocket") {
    proxy.ws(req, res, { target, changeOrigin: true }, (err) => {
      console.error("Erro ao encaminhar WebSocket:", err);
      res.status(502).send("Erro ao conectar ao servidor WebSocket.");
    });
  } else {
    // Caso não seja WebSocket, tratar como requisição normal
    proxy.web(req, res, { target, changeOrigin: true }, (err) => {
      console.error("Erro ao encaminhar a solicitação:", err);
      res.status(502).send("Erro ao conectar ao servidor.");
    });
  }

  // Escutando erros do proxy
  proxy.on("error", (err) => {
    console.error("Erro no proxy:", err);
  });
};
