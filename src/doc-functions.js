import $ from 'jquery'
import { addUpdate } from './sockets';


$(() => {

    var input = $('#main-doc');
    let isDelete = false;

    input.on('keydown', (event) => {
        var key = event.keyCode || event.charCode;

        if (key == 8 || key == 46) {
            isDelete = true;
            let start = input.prop("selectionStart");
            let end = input.prop("selectionEnd") - 1;
            let type = "DELETE";

            console.log("start: " + start);
            console.log("end: " + end);

            if (end - start > 1) {
                type = "DELETE_RANGE";
            }

            console.log(type);
            console.log("deleting: " + input.val().substring(start, end));
            addUpdate($('#userInput').val(), type, null, start, end);
        }
    });
    input.on("input", (event) => {
        if (!isDelete) {
            let start = input.prop("selectionStart") - 1;
            let end = input.prop("selectionEnd");
            let type = "APPEND";
    
            console.log("start: " + start);
            console.log("end: " + end);
    
            if (end - start > 1) {
                type = "APPEND_RANGE";
            }
    
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
    let start = textArea.prop("selectionStart");
    let end = textArea.prop("selectionEnd");
    let text = textArea.val();

    text = text.substring(0, start) + text.substring(end + 1);
    textArea.val(text);

    textArea[0].setSelectionRange(start, start);
}

const appendRange = (updateData) => {
    let textArea = $('#main-doc');
    let start = textArea.prop("selectionStart");
    let end = textArea.prop("selectionEnd");
    let text = textArea.val();

    text = text.substring(0, start) + updateData.content + text.substring(end + 1);
    textArea.val(text);

    textArea[0].setSelectionRange(end, end);
}

export { update }