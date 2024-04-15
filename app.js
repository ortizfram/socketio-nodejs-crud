const express = require("express");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/views.routes.js");
const { Server: WebSocketServer } = require("socket.io");
const http = require("http");
const { v4: uuid } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server); // server para trabajar con sockets

let notes = [];

// templates
app.use(express.static(__dirname + "/public")); //pasar archivos js a plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  //socket: traer info de cliente
  console.log("cliente conectado", socket.id);

  socket.emit("server:loadnotes", notes);

  // test
  socket.emit("ping");
  socket.on("pong", () => console.log("pong"));

  // client:newnote
  socket.on("client:newnote", (newNote) => {
    const note = {
      ...newNote,
      id: uuid(),
    };
    console.log(note);
    notes.push(note);
    io.emit("server:newnote", note);
  });

  // client:deletenote
  socket.on("client:deletenote", (noteId) => {
    notes = notes.filter((note) => note.id !== noteId);
    io.emit("server:loadnotes", notes);
  });

  // client:getnote
  socket.on("client:getnote", (noteId) => {
    const note = notes.find((note) => note.id == noteId);
    socket.emit("server:selectednote", note);
  });

  // client:updatenote
  socket.on("client:updatenote", (updatedNote) => {
    console.log(updatedNote)
    notes = 
    notes.map((note) => {
      if (note.id == updatedNote.id) {
        note.title = updatedNote.title;
        note.description = updatedNote.description;
      }
      return note;
    });
    io.emit("server:loadnotes", notes);
  });
});

server.listen(8080, () => console.log("listening 8080"));
