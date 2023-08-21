//evide nammmal mongooose use cheyyunnne collection/model create cheyyyan vendi aaanu

const mongoose = require("mongoose");

//create model for collections
//namukk evide users ennullla collection aanu ullath so oru collection maathram create cheytha mathy
//"new keyword" vechit object aanu create chyunnath

//note:"schema":collectionte fields and values anu schema(ie it's the structure)

//users

const users = new mongoose.model("users", {
  acno: Number,
  uname: String,
  psw: String,
  balance: Number,
  transaction: [],
});

module.exports = users;
