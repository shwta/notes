$(document).ready(function() {

    showNotes();

    function getNotes() { //To get stored Notes from Local Storage
        var notesArray = [];
        var storedNotes = localStorage.getItem('notes');
        if (storedNotes !== null) {
            notesArray = JSON.parse(storedNotes);
        }
        return notesArray;
    }

    function showNotes() { // To build HTML for  Notes
        $("#notesList").empty();
        var notesArray = getNotes();
        for (var i = 0; i < notesArray.length; i++) {
            $("#notesList").append('<div spellcheck="false" class="sublist" id="'
            + notesArray[i].id + '"><a class="closeButton"></a><p class="noteTitle">'
            + notesArray[i].title + '</p><ul class="list">'
            + notesArray[i].list + '</ul></div>');
        };
    };

    function createNote(noteId) { //To create new note
        var noteobject = {
            "id": noteId,
            "title": "New Note",
            "list": "<li></li>"
        }
        var notesArray = getNotes();
        notesArray.push(noteobject);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        showNotes();

    }

    function update(noteId, noteList, noteTitle) { //To update Exisitng Note
        var notesArray = getNotes();
        for (var i = 0; i < notesArray.length; i++) {
            if (noteId == notesArray[i].id) {
                notesArray[i].title = noteTitle;
                notesArray[i].list = noteList;
            }
        }
        localStorage.setItem("notes", JSON.stringify(notesArray));
        showNotes();
    }

    function remove(noteId) { // To remove note
        var notesArray = getNotes();
        for (var i = 0; i < notesArray.length; i++) {
            if (noteId == notesArray[i].id) {
                notesArray.splice(i, 1);
            }
        }
        localStorage.setItem("notes", JSON.stringify(notesArray));
        showNotes();
    }

    //Clik Event to create new note
    $("#createNote").on("touchstart click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var noteId = new Date().getTime();
        createNote(noteId);
    });

    //Click event to remove note
    $(document).on("touchstart click", ".closeButton", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var noteId = $(this).parent().attr('id');
        remove(noteId);
    })

    // Click event to edit the note and update it.
    $(document).on("touchend dblclick", "ul, p", function(e) {

        e.preventDefault();
        e.stopPropagation();
        var position = $(this).position();
        var pos = position.top;
        $(this).attr('contenteditable', true).focus();
        $(document).scrollTop(pos);

    }).on("blur", ".sublist", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr('contentEditable', false);
        var noteId = $(this).attr('id');
        var noteTitle = $(this).find("p").text();
        var noteList = $(this).find("ul").html();
        update(noteId, noteList, noteTitle);
    });

});
