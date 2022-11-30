import { serverAddress } from "./constants";

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

export { createUser, loginUser };
