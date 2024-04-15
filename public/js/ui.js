// ui.js
const notesList = document.querySelector("#notes");

let savedId = ''// guardar note sleccionada global para navegador

const noteUI = (note) => {
  console.log(note);

  const div = document.createElement("div")
  div.innerHTML = `
  <div class="card card-body rounded-0 mb-2">
  <div class="d-flex justify-content-between">
  <h1 class="h3 card-title">${note.title}</h1>
  <div>
  <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
  <button class="btn btn-secondary update" data-id="${note.id}">update</button>
  </div>
  </div>
  <p>${note.description}</p>
  </div>`;

 const btnDelete = div.querySelector(".delete")
 const btnUpdate = div.querySelector(".update")
 btnDelete.addEventListener('click', ()=>{
    deleteNote(btnDelete.dataset.id) 
 })
 btnUpdate.addEventListener('click', ()=>{
    getNote(btnUpdate.dataset.id) 
    // console.log(btnUpdate.dataset.id) 
 })

 return div
};

const renderNotes = (notes) => {
    notesList.innerHTML = ""
  notes.forEach((note) => {
    notesList.append(noteUI(note))
  });
};

const appendNote = note => {
    notesList.append(noteUI(note))
}
