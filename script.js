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
  const newNoteObject = {
    id: "N" + Date.now(),
    title: "Untitled",
    content: "Type your text here...",
    updatedAt: Date.now(),
  };
  renderNotes.push(newNoteObject);
  savedNotes();
});
console.log(renderNotes);
