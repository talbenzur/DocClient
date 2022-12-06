import { serverAddress } from "./constants";
import {createMainFolder} from "./index";
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
  localStorage.clear();

  console.log("in Login user");

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({email: user.email, password: user.password}),
    redirect: "follow",
  };
  fetch(serverAddress + "/auth/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.success) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        alert("You are now logged-in!");
        displayUserDocuments();
      } else {
        alert("Login failed - " + result.message);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
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

const displayUserDocuments = async () => {
  let userId = localStorage.getItem("userId");

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

const fileImport = async (token, ownerId, filePath, parentId) => {
  const res = await axios({
    method: "post",
    url: serverAddress + "/document/import",
    headers: {
      token: token,
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

  if (res.data.success) {
    alert("Document was successfully exported!")
  } else {
    alert("Error occurred while trying to export: " + res.message);
  }
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
    alert("URL: " + response.data);
  } else {
    console.log("getUrl failed");
  }
};

const createFolder = async (parentId, title) => {
  let ownerId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("ownerId", ownerId);

  var data = new FormData();
  data.append("parentId", parentId);
  data.append("title", title);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  fetch(serverAddress + "/folder/create", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        console.log(result);
        localStorage.setItem("folderId", result.data.id);
      } else {
        alert("Error Occurred: " + result.message);
      }
    })
    .catch((error) => console.log("error", error));
}

const createDocument = async (title) => {
  let ownerId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  let parentId = localStorage.getItem("folderId");
  if (parentId == null || parentId == "undefined") {
    // createMainFolder();
    localStorage.setItem("folderId", "3");
    parentId = localStorage.getItem("folderId");
  }

  let myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("ownerId", ownerId);

  var data = new FormData();
  data.append("parentId", parentId);
  data.append("title", title);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  fetch(serverAddress + "/document/create", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        console.log(result);
        alert("Document was successfully created!");
        displayUserDocuments();
        return result.data;
      } else {
        alert("Error Occurred: " + result.message);
      }
    })
    .catch((error) => console.log("error", error));
}

const deleteDocument = async (documentId) => {
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");

  let myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("userId", userId);
  myHeaders.append("documentId", documentId);

  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(serverAddress + "/document/delete", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert("Document was successfully deleted!");
      console.log(result);
      displayUserDocuments();
    })
    .catch((error) => console.log("error", error));
}

const deleteChildren = (elementId) => {
  let element = document.getElementById(elementId);

  var child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
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
  createDocument,
  deleteDocument,
  createFolder
};
