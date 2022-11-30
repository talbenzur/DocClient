import $ from 'jquery'
import { addUpdate } from './sockets';


$(() => {

    var input = $('#main-doc');
    let isDelete = false;
    let start, end;
    let type;

    input.on('keydown', (event) => {
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
            addUpdate($('#userInput').val(), type, null, start, end);
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
    
            addUpdate($('#userInput').val(), type, event.originalEvent.data, start, end);
        }

        isDelete = false;
    })
})

const update = (updateData) => {
    let user = $('#userInput').val();
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
                deleteRange(updateData)
                break;
        }
    }
}

const appendText = (updateData) => {
    let textArea = $('#main-doc');
    let start = textArea.prop("selectionStart");
    let text = textArea.val();

    text = text.substring(0, updateData.startPosition) + updateData.content + text.substring(updateData.startPosition, text.length);
    textArea.val(text);

    if (updateData.startPosition < start) {
        start++;
        textArea[0].setSelectionRange(start, start);
    }
}

const deleteText = (updateData) => {
    let textArea = $('#main-doc');
    let start = updateData.startPosition;
    let end = updateData.endPosition;
    let text = textArea.val();

    let count = start - end;

    text = text.substring(0, Math.max(0, start - count)) + text.substring(start);
    textArea.val(text);

    textArea[0].setSelectionRange(end, end);
}

const deleteRange = (updateData) => {
    let textArea = $('#main-doc');
    let start = updateData.startPosition;
    let end = updateData.endPosition;
    let text = textArea.val();

    text = text.substring(0, start) + text.substring(end);
    textArea.val(text);

    textArea[0].setSelectionRange(start, start);
}

const appendRange = (updateData) => {
    let textArea = $('#main-doc');
    let start = updateData.startPosition;
    let end = updateData.endPosition;
    let text = textArea.val();
    let endOfAppendedText = start + updateData.content.length;

    text = text.substring(0, start) + updateData.content + text.substring(end);
    textArea.val(text);

    textArea[0].setSelectionRange(endOfAppendedText, endOfAppendedText);
}

export { update }