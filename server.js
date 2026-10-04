import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 10000;

app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`RAW Lighting Solution running on port ${port}`);
});
