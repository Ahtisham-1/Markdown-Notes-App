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

addNoteButton.addEventListener("click", function () {
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

  // Notes object
  const newNoteObject = {
    id: "N" + uniqueTimeId,
    title: "Untitled",
    content: "Type your text here...",
    updatedAt: uniqueTimeId,
  };

  renderNotes.push(newNoteObject);
  savedNotes();
  NotesTitleFunction();
});

function NotesTitleFunction() {
  // clearning the sidebar to avoid duplicates
  showNotesList.textContent = "";

  renderNotes.forEach((elementTitle) => {
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

    // appending the list container with the html main div
    showNotesList.appendChild(listContainer);

    listContainer.addEventListener("click", function (e) {
      activeNoteId = elementTitle.id;
      WritingTextArea.value = elementTitle.content;
      NotesTitleFunction();
    });
  });
}

NotesTitleFunction();
