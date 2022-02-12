// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const url = "mongodb://localhost/post";
// const url_online =
//   "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const port = 3370;
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, { cors: { origin: "*" } });

// mongoose.connect(url_online).then(() => {
//   console.log("database is connected");
// });

// app.use(cors());
// app.use(express.json());

// app.use("/", require("./router"));

// server.listen(port, () => {
//   console.log("let's GOOOOO");
// });

// io.on("connection", (socket) => {
//   console.log("socket.io: User connected: ", socket.id);

//   socket.on("disconnect", () => {
//     console.log("socket.io: User disconnected: ", socket.id);
//   });
// });

// const db = mongoose.connection;

// db.on("open", () => {
//   const observer = db.collection("posts").watch();

//   observer.on("change", (change) => {
//     if (change.operationType === "insert") {
//       const newData = {
//         _id: change.fullDocument._id,
//         name: change.fullDocument.name,
//         description: change.fullDocument.description
//       };
//       io.emit("newPost", newData);
//     }
//   });
// });

const express = require("express");
const cors = require("cors");
const app = express();
const port = 2233;
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const mongoose = require("mongoose");
const url =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
  console.log("database now connect");
});

io.on("connection", (socket) => {
  console.log("socket connected");
});
app.use(cors());
app.use(express.json());
app.use("/", require("./router"));

const db = mongoose.connection;

db.on("open", () => {
  const observer = db.collection("posts").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      const myPost = {
        _id: change.fullDocument._id,
        name: change.fullDocument.name,
        description: change.fullDocument.description
      };
      io.emit("newPost", myPost);
    }
  });
});

server.listen(port, () => {
  console.log(`server is now connected: ${port}`);
});
