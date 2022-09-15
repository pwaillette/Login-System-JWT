import 'dotenv/config';
import http from 'http';
import app from './app';

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`[SERVER] - Listening at port : ${process.env.PORT}`);
});

process.on('exit', () => {
  server.close();
});

process.on('kill', () => {
  server.close();
});
