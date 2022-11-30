import $ from "jquery";

const update = (updateData) => {
  let user = $("#userInput").val();
  if (user != updateData.userEmail) {
    switch (updateData.type) {
      case "APPEND":
        appendText(updateData);
        break;
      case "DELETE":
        deleteText(updateData);
        break;
      case "APPEND_RANGE":
        appendRange(updateData);
        break;
      case "DELETE_RANGE":
        deleteRange(updateData);
        break;
    }
  }
};

const appendText = (updateData) => {
  let textArea = $("#main-doc");
  let start = textArea.prop("selectionStart");
  let text = textArea.val();

  text =
    text.substring(0, updateData.startPosition) +
    updateData.content +
    text.substring(updateData.startPosition, text.length);
  textArea.val(text);

  if (updateData.startPosition < start) {
    start++;
    textArea[0].setSelectionRange(start, start);
  }
};

const deleteText = (updateData) => {
  let textArea = $("#main-doc");
  let start = updateData.startPosition;
  let end = updateData.endPosition;
  let text = textArea.val();

  let count = start - end;

  text = text.substring(0, Math.max(0, start - count)) + text.substring(start);
  textArea.val(text);

  textArea[0].setSelectionRange(end, end);
};

const deleteRange = (updateData) => {
  let textArea = $("#main-doc");
  let start = updateData.startPosition;
  let end = updateData.endPosition;
  let text = textArea.val();

  text = text.substring(0, start) + text.substring(end);
  textArea.val(text);

  textArea[0].setSelectionRange(start, start);
};

const appendRange = (updateData) => {
  let textArea = $("#main-doc");
  let start = updateData.startPosition;
  let end = updateData.endPosition;
  let text = textArea.val();
  let endOfAppendedText = start + updateData.content.length;

  text = text.substring(0, start) + updateData.content + text.substring(end);
  textArea.val(text);

  textArea[0].setSelectionRange(endOfAppendedText, endOfAppendedText);
};

export { update, appendText, deleteText, deleteRange, appendRange };
