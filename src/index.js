import $ from "jquery";
import { createUser, loginUser, shareRequest, getUserDocuments } from "./rest";
import { join, openConnection } from "./sockets";
import "bootstrap";
import "./style.css";

import {
  // documentId,
  ownerId,
  // userId,
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
    displayUserDocuments();
  });

   // open document
   $("#btnSelectDocument").on("click", function (event) {
    event.preventDefault();
    console.log("opening a document");

    const requiredDocumentId = $("#documentIdInput").val();
    join(requiredDocumentId);
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

// openConnection();

const userEmailList = new Array();

// Display document metadata:
const displayMetaData = (metadata) => {
  document.getElementById("doc-title").innerHTML = metadata.title;
  document.getElementById("doc-last-edited").innerHTML = metadata.lastUpdated;
};

const displayUserDocuments = () => {
  let userId = localStorage.getItem("userId");
  let documentIds = getUserDocuments(userId);
  let documentSelect = document.getElementById("document-id-selector");
  let idsLength = documentIds.length;

  for (var i = 0; i < idsLength; i++) {
    var documentId = document.createTextNode(documentIds[i]);
    var option = document.createElement("option");
    option.appendChild(documentId);
    documentSelect.appendChild(option);
  }
}

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

  shareRequest(
    localStorage.getItem("token"),
    localStorage.getItem("documentId"),
    ownerId,
    userEmailList,
    permission,
    notify
  );
};

export { displayMetaData };
