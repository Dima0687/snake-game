const TIME_TILL_MSG_REMOVE_IN_MS = 5000;

export function showMessageBox(container, ...messages) {
  createMessageBox(container, messages);
}


function createMessageBox(container, messages) {
  const messageBox = document.createElement("div");
  messageBox.className = "msg-box";

  const triangle = document.createElement("span");
  triangle.id = "triangle";

  if(!messages.length) return;
  messages = messages.map((msg) => {
    if(msg === "") return;

    const msgElem = document.createElement("p");
    msgElem.textContent = msg;
    
    return msgElem;
  });

  messageBox.append(triangle, ...messages);

  container.append(messageBox);

  removeMessageBox(messageBox);
}

function removeMessageBox(msgBox) {
  if(!msgBox) return;

  setTimeout(() => {
    msgBox.remove();
  }, TIME_TILL_MSG_REMOVE_IN_MS );
}