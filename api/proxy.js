export default async (req, res) => {
  const target = "wss://seu-endereco-vps"; // Substitua pelo endereço da sua VPS.

  res.writeHead(302, {
    Location: target,
    "X-Proxy-By": "Vercel"
  });

  res.end();
};
