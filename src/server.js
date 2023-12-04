import WebSocket, { WebSocketServer } from 'ws';
import app from './app';
import ACTIONS from './utils/constantutils';

const APP_PORT = process.env.PORT;

const server = app.listen(APP_PORT, () => {
  console.log(`Server rodando na porta: ${APP_PORT}`);
});

const wss = new WebSocketServer({ server });

let clients = [];

function handleDraw(confirmationCode) {
  const participants = Array.from(wss.clients).filter(
    (client) => !client.isAdmin,
  );
  const winner = participants[Math.floor(Math.random() * participants.length)];

  participants.forEach((cliente) => {
    let result = JSON.stringify({ status: 'youlose' });

    if (cliente === winner) {
      result = JSON.stringify({ status: 'youwin', code: confirmationCode });
    }
    cliente.send(result);
  });
}

function handleIncomingMessage(ws, msg) {
  const data = JSON.parse(msg);
  const { action } = data;

  switch (action) {
    case ACTIONS.ADMIN:
      ws.isAdmin = true;
      break;
    case ACTIONS.DRAW:
      handleDraw(data.code);
      break;
    default:
      console.warn('Ação desconhecida:', action);
  }
}

function updateAdminClientCount() {
  const clientCount = Array.from(wss.clients).filter(
    (client) => !client.isAdmin,
  ).length;

  Array.from(wss.clients).forEach((client) => {
    if (client.isAdmin && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          action: ACTIONS.CLIENT_COUNT_UPDATE,
          count: clientCount,
        }),
      );
    }
  });
}

wss.on('connection', (ws) => {
  updateAdminClientCount(ws);

  ws.on('close', () => {
    clients = clients.filter((client) => client !== ws);
    updateAdminClientCount();
  });

  ws.on('message', handleIncomingMessage.bind(null, ws));
});
