const newNode = (message, name, reversed) => {
  const copyButton = document.createElement("button");
  copyButton.setAttribute(
    "class",
    "btn-icon chat__conversation-board__message__option-button option-item emoji-button"
  );
  copyButton.addEventListener("click", () => {
    navigator.clipboard
      .writeText(message)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  });
  copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z"/></svg>`;

  const optionsSection = document.createElement("div");
  optionsSection.setAttribute(
    "class",
    "chat__conversation-board__message__options"
  );
  optionsSection.appendChild(copyButton);
  //   CHAT
  const messageBubble = document.createElement("div");
  messageBubble.setAttribute(
    "class",
    "chat__conversation-board__message__bubble"
  );
  const spanMessage = document.createElement("span");
  spanMessage.innerText = message;
  messageBubble.appendChild(spanMessage);
  const spanName = document.createElement("span");
  spanName.setAttribute(
    "class",
    "chat__conversation-board__message__person__nickname"
  );
  spanName.innerText = name;

  const messageContent = document.createElement("div");
  messageContent.setAttribute(
    "class",
    "chat__conversation-board__message__context"
  );
  messageContent.appendChild(spanName);

  messageContent.appendChild(messageBubble);
  const messageContainer = document.createElement("div");
  messageContainer.setAttribute(
    "class",
    "chat__conversation-board__message-container"
  );
  if (reversed) messageContainer.classList.add("reversed");

  messageContainer.appendChild(messageContent);
  messageContainer.appendChild(optionsSection);
  return messageContainer;
};
const connectionTemplate = (msg) => {
  const para = document.createElement("p");
  para.setAttribute("id", "user-connected");
  para.innerText = msg;
  const container = document.createElement("div");
  container.setAttribute("class", "user-connected");
  container.appendChild(para);
  return container;
};
const messageContainerRoot = document.getElementById("message-container");

const emmitMessage = (e) => {
  console.log("hello");
  e.preventDefault(); // Prevent form submission
  const msg = $("#input-message").val();
  $("#input-message").val("");

  socket.emit("chat message", msg, { name });
  $("#m").val("");
  return false;
};
let name = localStorage.getItem("shareme-username");
const socket = io();
socket.emit("user connected", localStorage.getItem("shareme-username"));
$("#send").click(emmitMessage);
const input = $("input");

$("#input-message").on("keydown", function (event) {
  if (event.keyCode === 13) {
    emmitMessage(event);
  }
});

socket.on("chat message", ({ msg, user }) => {
  messageContainerRoot.appendChild(
    newNode(msg, user.name, !(user.name == name))
  );
  messageContainerRoot.scrollTop = messageContainerRoot.scrollHeight;
  console.log(user);
});
socket.on("user connected", (user) => {
  template = connectionTemplate(user.username + " joined");
  messageContainerRoot.appendChild(template);
  messageContainerRoot.scrollTop = messageContainerRoot.scrollHeight;
});
socket.on("user disconnected", (user) => {
  template = connectionTemplate(user.username + " left");
  messageContainerRoot.appendChild(template);
  messageContainerRoot.scrollTop = messageContainerRoot.scrollHeight;
});
// // console.log(socket);
