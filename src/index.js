import $ from "jquery";
import { createUser, loginUser, shareRequest } from "./rest";
import { openConnection } from "./sockets";
import "bootstrap";
import "./style.css";

import {
  documentId,
  token,
  ownerId,
} from "./globals.js";

$(() => {
  //create user
  $(document).on("submit", function (event) {
    event.preventDefault();
    console.log("on signup");

    const user = {
      email: $("#emailInput").val(),
      name: $("#userInput").val(),
      password: $("#passwordInput").val(),
    };
    createUser(user);
  });

  //login
  $("#btnLogin").on("click", function (event) {
    event.preventDefault();
    console.log("on login");

    const user = {
      email: $("#emailInputLogin").val(),
      password: $("#passwordInputLogin").val(),
    };
    loginUser(user);
  });

  //add user to list
  $("#addUser").on("click", function () {
    console.log("on add user");
    const email = document.getElementById("email-input-user").value;
    addEmailToList(email);
  });

  //update permission
  $(document).on("click", "#btnUpdate", () => {
    console.log("on update");
    updatePermission(false);
  });

  //update permission and notify
  $(document).on("click", "#btnUpdateAndNotify", () => {
    console.log("on update and notify");
    updatePermission(true);
  });
});

openConnection();

const userEmailList = new Array();

// Display document metadata:
const displayMetaData = (metadata) => {
  document.getElementById("doc-title").innerHTML = metadata.title;
  document.getElementById("doc-last-edited").innerHTML = metadata.lastUpdated;
};

// Share
const addEmailToList = (inputUser) => {
  console.log("in addEmailToList, input user: " + inputUser);
  var user = document.createTextNode(inputUser);
  var li = document.createElement("li");
  li.appendChild(user);
  userEmailList.push(inputUser);
  console.log(inputUser);
  console.log(userEmailList);
  document.getElementById("users-table").appendChild(li);
};

const updatePermission = (notify) => {
  let permission = document.getElementById("permission").value;

  console.log(
    "on Update Permission user list: " +
      userEmailList +
      " permission: " +
      permission
  );

  shareRequest(token, documentId, ownerId, userEmailList, permission, notify);
};

export { displayMetaData };
