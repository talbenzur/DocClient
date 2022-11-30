import $ from "jquery";
import { createUser, loginUser, shareRequest } from "./rest";
import { openConnection } from "./sockets";
import "bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

$(() => {
  $(document).on("submit", () => {
    const user = {
      email: $("#emailInput").val(),
      name: $("#userInput").val(),
      password: $("#passwordInput").val(),
    };
    createUser(user);
  });

  //add user to list
  $(document).on("click", ".addUser", () => {
    const email = document.getElementById("#input-email-user").val();
    addEmailToList(email);
  });

  //update permission
  $(document).on("click", "#btnUpdate", () => {
    updatePermission(false);
  });

  //update permission and notify
  $(document).on("click", "#btnUpdateAndNotify", () => {
    updatePermission(true);
  });
});
openConnection();

const userEmailList = new Array();

//share
const addEmailToList = () => {
  var li = document.createElement("li");
  var user = document.createTextNode(inputUser);
  li.appendChild(user);
  userEmailList.push(inputUser);
  console.log(inputUser);
  console.log(userEmailList);
  document.getElementById("users-table").appendChild(li);
};

const updatePermission = (notify) => {
  console.log("on Update Permission user list: " + userEmailList);
  //update permission
  //TODO: change ownerId, parentId
  shareRequest(76, 74, userEmailList, permission, notify);
};
