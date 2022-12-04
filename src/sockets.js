import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import { serverAddress } from "./constants";
import { update } from "./doc-functions";
import { displayMetaData, displayActiveUsers } from "./index.js";

let stompClient;
const socketFactory = () => {
  return new SockJS(serverAddress + "/ws");
};

const onMessageReceived = (payload) => {
  var message = JSON.parse(payload.body);
  console.log(message);
  update(message);
  getMetaData(localStorage.getItem("documentId"));
};

const onMetaDataReceived = (payload) => {
  var metadata = JSON.parse(payload.body);
  console.log(metadata);
  displayMetaData(metadata);
};

const onActiveUsersReceived = (payload) => {
    var activeUsers = JSON.parse(payload.body);
    console.log(activeUsers);

    displayActiveUsers(activeUsers);
};

const onConnected = () => {
  stompClient.subscribe("/topic/updates", onMessageReceived);
  stompClient.subscribe("/topic/metadata", onMetaDataReceived);
  stompClient.subscribe("/topic/activeUsers", onActiveUsersReceived);
  getMetaData(localStorage.getItem("documentId"));
  getActiveUsers(localStorage.getItem("documentId"));
};

const onJoinMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    console.log(message);

    localStorage.setItem("document", message.body.data);
    
    let content = message.body.data.content;
    console.log(content);
    document.getElementById("main-doc").value = content;
}

const onJoined = () => {
    stompClient.subscribe("/topic/join", onJoinMessageReceived);

    let documentId = localStorage.getItem("documentId");
    let userId = localStorage.getItem("userId");
    stompClient.send("/app/join", [], JSON.stringify({documentId, userId}));
    onConnected();
}

const openConnection = () => {
  const socket = socketFactory();
  stompClient = Stomp.over(socket);
  stompClient.connect({}, onJoined);
};

const join = (requiredDocumentId) => {
    localStorage.setItem("documentId", requiredDocumentId);
    openConnection();
};

const leave = () => {
    displayMetaData(null);
    displayActiveUsers([]);

    let documentId = localStorage.getItem("documentId");
    let userId = localStorage.getItem("userId");
    stompClient.send("/app/leave", [], JSON.stringify({documentId, userId}));

    localStorage.removeItem("documentId");
};

const addUpdate = (type, content, startPosition, endPosition) => {
  sendUpate(type, content, startPosition, endPosition);
};

const sendUpate = (type, content, startPosition, endPosition) => {
    let documentId = localStorage.getItem("documentId");
    let userId = localStorage.getItem("userId");

    stompClient.send(
    "/app/update",
    [],
    JSON.stringify({
      documentId: documentId,
      userId: userId,
      type: type,
      content: content,
      startPosition: startPosition,
      endPosition: endPosition,
    })
  );
};

const getMetaData = () => {
    let documentId = localStorage.getItem("documentId");
    stompClient.send("/app/metadata", [], documentId.toString());
};

const getActiveUsers = () => {
    let documentId = localStorage.getItem("documentId");
    stompClient.send("/app/activeUsers", [], documentId.toString());
}

export { openConnection, addUpdate, join };
