//evide aaanu nammal route (ie the ppath ) set aakukkka

const express = require("express");
const logic = require("../controllers/logic");
const jwtMiddleWare = require("../middleware/routerMiddleware");

//create an object for router clss in express
//nammal eppolum object create cheyumpo new use aakum

const router = new express.Router();
//register(signup) cheyyan ullla url
router.post("/bankuser/userregister", logic.register);

//login request
router.post("/bankuser/userlogin", logic.login);

//user-profile
//:acno frontendl ninn vernne
router.get(
  "/bankuser/userprofile/:acno",
  jwtMiddleWare,
  logic.getProfileDetails
);

//get balance enquiry details
router.get(
  "/bankuser/userbalance/:acno",
  jwtMiddleWare,
  logic.getBalanceDetails
);

//money transfer
router.post("/bankuser/moneytransfer", jwtMiddleWare, logic.moneyTransfer);

//transaction history api
router.get("/bankuser/userhistory/:acno",jwtMiddleWare, logic.history);

//deleteing an acount api
router.delete("/bankuser/userdelete/:acno", jwtMiddleWare, logic.deleteAccount);

//export router
//namukk eth index.js file use aaakan vendi
module.exports = router;
