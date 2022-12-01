import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import { serverAddress } from "./constants";
import { update } from "./doc-functions";
import { displayMetaData } from "./index.js";

import { documentId } from "./globals.js";
let stompClient;
const socketFactory = () => {
  return new SockJS(serverAddress + "/ws");
};

const onMessageReceived = (payload) => {
  var message = JSON.parse(payload.body);
  console.log(message);
  update(message);
  getMetaData(documentId);
};

const onMetaDataReceived = (payload) => {
  var metadata = JSON.parse(payload.body);
  console.log(metadata);
  displayMetaData(metadata);
};

const onConnected = () => {
  stompClient.subscribe("/topic/updates", onMessageReceived);
  stompClient.subscribe("/topic/metadata", onMetaDataReceived);
  stompClient.send("/app/hello", [], JSON.stringify({ name: "Default user" }));
  getMetaData(documentId);
};

const openConnection = () => {
  const socket = socketFactory();
  stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected);
};

const addUpdate = (userEmail, type, content, startPosition, endPosition) => {
  sendUpate(userEmail, type, content, startPosition, endPosition);
};

const sendUpate = (userEmail, type, content, startPosition, endPosition) => {
  stompClient.send(
    "/app/update",
    [],
    JSON.stringify({
      documentId: documentId,
      userEmail: userEmail,
      type: type,
      content: content,
      startPosition: startPosition,
      endPosition: endPosition,
    })
  );
};

const getMetaData = (documentId) => {
  stompClient.send("/app/metadata", [], documentId.toString());
};

export { openConnection, addUpdate };
