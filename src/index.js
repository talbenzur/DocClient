import $ from "jquery";
import { createUser, loginUser, shareRequest } from "./rest";
import { openConnection } from "./sockets";
import "bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

//hardcoded value for testing
const documentId = 94;
const token = "1669842953374-27889509-52ee-4ac5-bd1a-4801c3266ee7";
const ownerId = 74;

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

//share
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
      "permission:" +
      permission
  );

  shareRequest(token, documentId, ownerId, userEmailList, permission, notify);
};
