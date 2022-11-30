import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import { serverAddress } from "./constants"
import { update } from './doc-functions';

let stompClient;
const socketFactory = () => {
    return new SockJS(serverAddress + '/ws');
}

const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    console.log(message);
    update(message);
}

const onConnected = () => {
    stompClient.subscribe('/topic/updates', onMessageReceived);
    stompClient.send("/app/hello", [],
        JSON.stringify({ name: "Default user" })
    )
}

const openConnection = () => {
    const socket = socketFactory();
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected);
}

const addUpdate = (user, type, content, startPosition, endPosition) => {
    sendUpate(user, type, content, startPosition, endPosition)
}

const sendUpate = (user, type, content, startPosition, endPosition) => {
    stompClient.send("/app/update", [], JSON.stringify({
        userEmail: user,
        type: type,
        content: content,
        startPosition: startPosition,
        endPosition: endPosition
    }))
}

export { openConnection, addUpdate }