const http = require('http');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>api de pleiculas y series</title>
</head>
<body>
  <header>
    <h1>api de pleiculas y series</h1>
  </header>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(html);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
