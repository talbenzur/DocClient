import $ from "jquery";
import { addUpdate } from "./sockets";

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

const importFile = () => {
  $(".import").on("click", function () {
    console.log("on import");
    //TODO
  });
};

const exportFile = () => {
  $(".export").on("click", function () {
    console.log("on export");
    //TODO
  });
};

const copyLink = () => {
  var $temp = $("<input>");
  var $url = $(location).attr("href");

  $(".clipboard").on("click", function () {
    console.log("on copyLink");

    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    $("p").text("URL copied!");
  });
};

export { update, share, importFile, exportFile, copyLink };
