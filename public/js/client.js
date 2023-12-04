const socket = new WebSocket("wss://draw-api.onrender.com");
const body = document.querySelector("body");
const logo = document.getElementById("logo");
const messageDiv = document.getElementById("message");

function setClientState(state, code = "") {
  // Início da animação
  body.className = "main";
  messageDiv.classList.toggle("hide-message", true);
  logo.classList.toggle("stop-spin", false);
  logo.classList.toggle("spin-animation", true);

  setTimeout(() => {
    if (state === "win") {
      body.classList.add("win");
      messageDiv.innerText = code;
    } else if (state === "lose") {
      body.classList.add("lose");
      messageDiv.innerText = "";
    }

    messageDiv.classList.toggle("show-message", state === "win");
    messageDiv.classList.toggle("hide-message", state !== "win");
    logo.classList.toggle("spin-animation", false);
    logo.classList.toggle("stop-spin", true);
  }, 4100);
}

function handleServerMessage(event) {
  const data = JSON.parse(event.data);

  switch (data.status) {
    case STATUS.WIN:
      console.log("caso vencedor");
      setClientState("win", data.code);
      break;
    case STATUS.LOSE:
      setClientState("lose");
      break;
    default:
      console.log("Status não encontrado");
  }
}

socket.addEventListener("message", handleServerMessage);
