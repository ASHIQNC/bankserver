require("dotenv").config();

//importing a package or library
const express = require("express");

//importing cors for conntecting FE and BE we are using cors
const cors = require("cors");
const router = require("./routes/userRouting");

//importing db connection
require("./db/dbconnections");

//import router
//require("./routes/userRouting");

//import env file
//ee dotenv file install cheyyanam
//npm i dotenv

//server creation using express
const server = express();

//connecting server and fe using cors
server.use(cors());

//to convert all incoming json type data in to js
//egane cheyyumpo serverlott vernna alla requestum javascriptilott convert aakikolum egane cheythal
server.use(express.json());

server.use(router);

//*example how  the rquest are made

// //server verunna request access cheythitt response send cheyyan
// server.get("/getpath", (req, res) => {
//   //sending response
//   res.send("get api response");
// });

// //second request

// server.get("/lastuser", (req, res) => {
//   //sending response
//   res.send("get api from last user");
// });

//*/

//to run the sever we need to set the port
//process akath aaanu nammal env file indavaa
//so nammal port run cheyunna timil env file koode run aavan vendi egane kodukkanam
const port = 3000 || process.env.port;

//running config in this port
//listen() is an inbuild method.

server.listen(port, () => {
  console.log(`---server started at port numbers ${port}---`);
});
