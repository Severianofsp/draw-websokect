import app from './app';

const APP_PORT = process.env.PORT;

app.listen(APP_PORT, () => {
  console.log(`Server rodando na porta: ${APP_PORT}`);
});
