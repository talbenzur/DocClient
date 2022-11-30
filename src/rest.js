import { serverAddress } from "./constants";
import axios from "axios";

const createUser = (user) => {
  console.log("in createUser- signup");

  fetch(serverAddress + "/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
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

export { createUser, loginUser, shareRequest };
