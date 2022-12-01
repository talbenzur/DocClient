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
  });
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

  console.log(response);

  if (response.success) {
    console.log(response);

    console.log("res.data.token: " + response.data.token);
    console.log("res.data.userId: " + response.data.userId);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.userId);

    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("userId"));

    alert("Login successful");
  } else {
    alert("Login failed");
  }
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

  if (res.success) {
    //TODO: remove email from list
    alert("share successful");
  } else {
    alert("share failed");
  }
};

const getUserDocuments = async (userId) => {
  const res = await axios({
    method: "get",
    url: serverAddress + "/user/getUserDocuments",
    headers: {
      userId: userId,
    }});

    console.log(res.data.data);
    return res.data.data;
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

const getURL = async (documentId) => {
  const res = await axios({
    method: "get",
    url: serverAddress + "/document/getUrl",
    data: {
      documentId: documentId,
    },
  });
  console.log(res);
};

export { createUser, loginUser, shareRequest, fileImport, fileExport, getURL, getUserDocuments };
