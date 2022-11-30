import $ from "jquery";
import { addUpdate } from "./sockets";
import { shareRequest, fileImport, fileExport, getURL } from "./rest";
import {
  update,
  appendText,
  deleteText,
  deleteRange,
  appendRange,
} from "./editDoc";

$(() => {
  var input = $("#main-doc");
  let isDelete = false;
  let start, end;
  let type;

  input.on("keydown", (event) => {
    var key = event.keyCode || event.charCode;

    start = input.prop("selectionStart");
    end = input.prop("selectionEnd");

    if (key == 8 || key == 46) {
      isDelete = true;

      console.log("start: " + start);
      console.log("end: " + end);

      if (end - start >= 1) {
        type = "DELETE_RANGE";
      } else {
        type = "DELETE";
        end = end - 1;
      }

      console.log(type);
      console.log("deleting: " + input.val().substring(start, end));
      addUpdate($("#userInput").val(), type, null, start, end);
    }
  });
  input.on("input", (event) => {
    if (!isDelete) {
      if (end - start >= 1) {
        type = "APPEND_RANGE";
      } else {
        type = "APPEND";
        end = end + 1;
      }

      console.log("start: " + start);
      console.log("end: " + end);

      addUpdate(
        $("#userInput").val(),
        type,
        event.originalEvent.data,
        start,
        end
      );
    }

    isDelete = false;
  });

  $(".copyLink").on("click", function () {
    console.log("on copyLink");
    copyLink();
    //implement: send- documentId
    getURL(documentId);
  });

  $(".import").on("click", function () {
    console.log("on import");

    //implement: send- token, ownerId, filePath, parentId
    fileImport(token, ownerId, filePath, parentId);
  });

  $(".export").on("click", function () {
    console.log("on export");

    //implement: send- token, documentId, userId
    fileExport(token, documentId, userId);
  });
});

const copyLink = () => {
  var $temp = $("<input>");
  var $url = $(location).attr("href");
  $("body").append($temp);
  $temp.val($url).select();
  document.execCommand("copy");
  $temp.remove();
  $("p").text("URL copied!");
};

export { update };
