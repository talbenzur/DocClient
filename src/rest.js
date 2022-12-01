import { serverAddress } from "./constants";
import axios from "axios";

// const createUser = (user) => {
//   fetch(serverAddress + "/auth/signup", {
//     method: "POST",
//     body: JSON.stringify({
//       name: user.name,
//       email: user.email,
//       password: user.password,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

const createUser = async (user) => {
  console.log("in create user");

  const res = await axios({
    method: "post",
    url: serverAddress + "/auth/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
};
const loginUser = async (user) => {
  console.log("in Login user");

  const res = await axios({
    method: "post",
    url: serverAddress + "/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: user.email,
      password: user.password,
    },
  });
  console.log(res);
};

const shareRequest = async (
  token,
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
      token: token,
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
      ownerId: ownerId,
    },
    data: {
      filePath: filePath,
      parentId: parentId,
    },
  });
  console.log(res);

  res.then((response) => {
    let data = response.data;
    console.log(data);
    const textarea = document.getElementById("main-doc");
    textarea.value += data;
  });
};

//checked!! works!!
const fileExport = async (token, documentId, userId) => {
  console.log("fileExport");
  const res = await axios({
    method: "get",
    url: serverAddress + "/document/export",
    headers: {
      token: token,
      documentId: documentId,
      userId: userId,
    },
  });
  console.log(res);
};

const getURL = async (documentId) => {
  const res = await axios({
    method: "get",
    url: serverAddress + "/document/getUrl",
    headers: {
      documentId: documentId,
    },
  });
  console.log(res);
};

export { createUser, loginUser, shareRequest, fileImport, fileExport, getURL };