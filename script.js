const sideBar = document.getElementById("sideBar");
const addNoteButton = document.getElementById("addNoteButton");
const searchNotes = document.getElementById("searchNotes");
const showNotesList = document.getElementById("showNotesList");
const textareaContainer = document.getElementById("textareaContainer");
const WritingTextArea = document.getElementById("WritingTextArea");
const showTextArea = document.getElementById("showTextArea");

//Which note is currently being selected variable
let activeNoteId = null;
//If no notes are saved, default to an empty array []
let renderNotes = JSON.parse(localStorage.getItem("markdownNotes")) || [];

// This function saves rendernotes to the local storage in the name of markdownNotes
function savedNotes() {
  localStorage.setItem("markdownNotes", JSON.stringify(renderNotes));
}

function dateFunction() {
  //Better time id with actuall time and date
  const options = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Get the string and force lowercase am/pm
  const uniqueTimeId = new Date()
    .toLocaleString("en-US", options)
    .toLowerCase();

  return uniqueTimeId;
}

addNoteButton.addEventListener("click", function () {
  dateFunction();

  // Notes object
  const newNoteObject = {
    id: "N" + dateFunction(),
    title: "Untitled",
    content: "# Type your text here...",
    updatedAt: dateFunction(),
  };

  renderNotes.push(newNoteObject);
  savedNotes();
  NotesTitleFunction(renderNotes);
});

function NotesTitleFunction(notesToDraw) {
  // clearning the sidebar to avoid duplicates
  showNotesList.textContent = "";

  notesToDraw.forEach((elementTitle) => {
    // parent div for the below two elements
    const listContainer = document.createElement("div");
    if (elementTitle.id === activeNoteId) {
      listContainer.classList.add("highlight-active-container");
    } else {
      listContainer.classList.remove("highlight-active-container");
    }
    // notes title
    const listTitle = document.createElement("h2");
    listTitle.innerHTML = elementTitle.title;
    listContainer.appendChild(listTitle);

    // notes timeid
    const listUpdate = document.createElement("span");
    listUpdate.innerHTML = elementTitle.updatedAt;
    listContainer.appendChild(listUpdate);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    listContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      const deleteNote = renderNotes.filter(
        (note) => note.id !== elementTitle.id,
      );
      if(elementTitle.id === activeNoteId){
        activeNoteId = null
        WritingTextArea.value = ""
        showTextArea.innerHTML= ""
      }

      renderNotes = deleteNote;
      savedNotes();
      NotesTitleFunction(renderNotes);
    });

    // appending the list container with the html main div
    showNotesList.appendChild(listContainer);

    listContainer.addEventListener("click", function (e) {
      activeNoteId = elementTitle.id;
      WritingTextArea.value = elementTitle.content;
      NotesTitleFunction(renderNotes);
      const updateTextarea = parseMarkdown(elementTitle.content);
      showTextArea.innerHTML = updateTextarea;
    });
  });
}

WritingTextArea.addEventListener("input", function () {
  //  Stop immediately if no active note
  if (!activeNoteId) return;
  //  Find the folder
  const activeNote = renderNotes.find(function (note) {
    return note.id === activeNoteId;
  });

  firstLine = WritingTextArea.value.split("\n");
  if (firstLine[0] === "") {
    activeNote.title = "Untitled";
  } else {
    activeNote.title = firstLine[0];
  }

  //  Update the folder now that you have it
  if (activeNote) {
    activeNote.content = WritingTextArea.value;
    activeNote.updatedAt = dateFunction();
    savedNotes();
    NotesTitleFunction(renderNotes);
  }

  const storeText = parseMarkdown(WritingTextArea.value);
  showTextArea.innerHTML = storeText;
});

// to make things bold italic and the first line means heading h1 this is called regex which is too confusing but it is very uselful
function parseMarkdown(text) {
  let html = text
    .replace(/^# (.*)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
  return html;
}

searchNotes.addEventListener("input", function () {
  const searchInput = searchNotes.value.toLowerCase();
  const filterdArray = renderNotes.filter((note) =>
    note.title.toLowerCase().includes(searchInput),
  );

  NotesTitleFunction(filterdArray);
});

NotesTitleFunction(renderNotes);
