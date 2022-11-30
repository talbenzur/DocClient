import $ from "jquery";
import { addUpdate } from "./sockets";
import { fileImport, fileExport } from "./rest";

$(() => {
  var input = $("#main-doc");

  input.on("keydown", (event) => {
    var key = event.keyCode || event.charCode;
    if (key == 8 || key == 46) {
      console.log(
        "deleting: " +
          input
            .val()
            .substring(input.prop("selectionStart"), input.prop("selectionEnd"))
      );
    }
  });
  input.on("input", (event) => {
    // let start = input.prop("selectionStart");
    let end = input.prop("selectionEnd");
    addUpdate($("#userInput").val(), event.originalEvent.data, end - 1, end);
  });

  $(".copyLink").on("click", function () {
    console.log("on copyLink");
    copyLink();
  });

  $(".import").on("click", function () {
    console.log("on import");
    
    //implement: token, ownerId, filePath, parentId
    fileImport(token, ownerId, filePath, parentId);
  });

  $(".export").on("click", function () {
    console.log("on export");

    //implement: token, documentId, userId
    fileExport(token, documentId, userId);
  });

});

const update = (updateData) => {
  let textArea = $("#main-doc");
  let user = $("#userInput").val();
  let start = textArea.prop("selectionStart");
  if (user != updateData.userEmail) {
    let text = textArea.val();
    text =
      text.substring(0, updateData.startPosition) +
      updateData.content +
      text.substring(updateData.endPosition, text.length);
    textArea.val(text);
    if (updateData.startPosition < start) {
      start++;
      textArea[0].setSelectionRange(start, start);
    }
  }
};

const share = () => {};

const copyLink = () => {
  var $temp = $("<input>");
  var $url = $(location).attr("href");
  $("body").append($temp);
  $temp.val($url).select();
  document.execCommand("copy");
  $temp.remove();
  $("p").text("URL copied!");
};

export { update, share };
