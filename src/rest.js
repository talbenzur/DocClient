import { serverAddress } from "./constants"
import axios from "axios";

const createUser = (user) => {
    fetch(serverAddress + "/user", {
      method: 'POST',
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
}
const loginUser = async (email, password) => {
  console.log("im logging in");
  fetch(serverAddress + "/auth/login", {
    method: "post",
    url: serverAddress + "/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: email,
      password: password,
    },
  });
};

const shareRequest = async (
  documentID,
  ownerID,
  emails,
  permission,
  notify
) => {
  const res = await axios({
    method: "patch",
    url: serverAddress + "/document/share",
    headers: {
      token: "1669728413023-26563711-c6d1-487f-a04e-63631185afb3",
    },
    data: {
      documentID: documentID,
      ownerID: ownerID,
      emails: emails,
      permission: permission,
      notify: notify,
    },
  });
  console.log(res);
};

const fileImport = async (token, ownerId, filePath, parentId) => {
  const res = await axios({
    method: "post",
    url: serverAddress + "/document/import",
    headers: {
      token: token,
    },
    data: {
      ownerId: ownerId,
      filePath: filePath,
      parentId: parentId,
    },
  });
  console.log(res);
};

const fileExport = async (token, documentId, userId) => {
  const res = await axios({
    method: "get",
    url: serverAddress + "/document/export",
    headers: {
      token: token,
    },
    data: {
      documentId: documentId,
      userId: userId,
    },
  });
  console.log(res);
};

export { createUser, loginUser, shareRequest, fileImport, fileExport };