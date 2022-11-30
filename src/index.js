import $ from "jquery";
import { createUser } from "./rest";
import { openConnection } from "./sockets";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

$(() => {
  $(document).on("submit", () => {
    const user = {
      email: $("#emailInput").val(),
      name: $("#userInput").val(),
      password: $("#passwordInput").val(),
    };
    createUser(user);
  });
});
openConnection();
