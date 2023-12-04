import { WebSocketServer } from 'ws';
import app from './app';

const APP_PORT = process.env.PORT;

const server = app.listen(APP_PORT, () => {
  console.log(`Server rodando na porta: ${APP_PORT}`);
});

export default new WebSocketServer({ server });
