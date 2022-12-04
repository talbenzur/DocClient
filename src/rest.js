import { serverAddress } from "./constants";
import axios from "axios";

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

  console.log(res);

  if ((res.status = "200")) {
    alert("create user successful- Check your email for activation");
    //window.location.href = "./login.html";
  } else {
    alert("create user failed");
  }
};

const loginUser = async (user) => {
  console.log("in Login user");

  const { data: response } = await axios({
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
  if (response.success) {
    console.log(response);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);

    alert("Login successful");
    //window.location.href = "./document.html";
  } else {
    alert("Login failed");
  }
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

  if ((res.status = "200")) {
    removeAllEmails();
    alert("share successful");
    //window.location.href = "./document.html";
  } else {
    alert("share failed");
  }
};

const removeAllEmails = () => {
  var emailList = document.getElementById("users-table");
  emailList.innerHTML = "";
};

const displayUserDocuments = async (userId) => {
  deleteChildren("document-id-selector");

  const res = await axios({
    method: "get",
    url: serverAddress + "/document/getDocumentsByUser",
    headers: {
      userId: userId,
    },
  });

  let userDocs = res.data.data;
  console.log(userDocs);

  let documentSelect = document.getElementById("document-id-selector");
  let idsLength = userDocs.length;

  for (var i = 0; i < idsLength; i++) {
    var text = userDocs[i].url + " (#" + userDocs[i].documentId + ")";
    var documentData = document.createTextNode(text);
    var option = document.createElement("option");
    option.appendChild(documentData);
    documentSelect.appendChild(option);
  }
};

const deleteChildren = (elementId) => {
  let element = document.getElementById(elementId);

  var child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
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
      documentId: documentId,
      userId: userId,
    },
  });
  console.log(res);
};

const getURL = async (documentId) => {
  const { data: response } = await axios({
    method: "get",
    url: serverAddress + "/document/getUrl",
    headers: {
      documentId: documentId,
    },
  });

  if (response.success) {
    console.log(response);
    console.log(response.data.data);
  } else {
    console.log("getUrl failed");
  }
};

export {
  createUser,
  loginUser,
  shareRequest,
  fileImport,
  fileExport,
  getURL,
  displayUserDocuments,
};
