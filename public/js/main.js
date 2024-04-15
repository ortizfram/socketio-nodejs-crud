// main.js
const noteForm = document.querySelector("#noteForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    // actualizando
    updateNote(savedId, title.value, description.value);
  } else {
    // creando
    saveNote(title.value, description.value);
  }
  title.value = ""
  description.value = ""

  title.focus()
});
