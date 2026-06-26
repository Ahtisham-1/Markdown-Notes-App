# 📝 Real-Time Markdown Notes App
A state-driven, retro-themed terminal style Markdown editor built from scratch with vanilla HTML, CSS Grid, and JavaScript.

## 🚀 Live Features
* **Real-Time Live Preview:** Renders formatted headings (`#`), bold (`**`), and italics (`*`) instantly as you type using custom regular expression rules.
* **State-First Design:** Entire application UI is driven dynamically from a centralized JavaScript array representing the data state.
* **LocalStorage Persistence:** Notes, text content, and update timestamps survive browser refreshes and are saved automatically.
* **Dynamic Auto-Titling:** The first line of your writing in the editor automatically becomes the note's title in the sidebar list (defaults to "Untitled" if empty).
* **Sidebar Search / Filter:** Real-time, case-insensitive search filtering across note titles.
* **Secure Note Deletion:** Simple note deletion with event propagation controls (`event.stopPropagation()`) to prevent conflict with note selection.

## 🛠️ Tech Stack
* **HTML5:** Semantic markup.
* **CSS Grid & Flexbox:** Three-panel layout (Sidebar, Editor, Preview) optimized for full height responsive views.
* **Vanilla JavaScript (ES6+):** Array filtering (`.filter()`, `.find()`), event listeners, and regular expressions.

## 💻 How to Run Locally
1. **Clone the repository:**
   ```bash
   git clone git@github.com:Ahtisham-1/Markdown-Notes-App.git
   ```
2. **Navigate into the folder:**
   ```bash
   cd Markdown-Notes-App
   ```
3. **Open the app:**
   Open the `index.html` file directly in any web browser.
---
## 🧠 What I Learned from This Project
* How to separate the **data state** (JavaScript array) from the **view layer** (DOM rendering).
* Writing custom **Regular Expression (Regex)** capture groups to find and replace formatting marks.
* Handling **Event Propagation** (bubbling) to control nested click listeners cleanly.