//here we write the logic of the file
//import jwt
const jwt = require("jsonwebtoken");

//import model
const users = require("../models/model");

//user indo nokanam
//accno, useram,passwor
//using find one
//object und
//logic for register
const register = (req, res) => {
  //body={acno:123,uname="ashiq",psw:"abc1123"}
  //eee oru formatil aakum namuk data vera FE ninn
  const acno = req.body.acno;
  const uname = req.body.uname;
  const psw = req.body.psw;
  console.log(req);

  //check acno is present in users collection
  //findOne() asynchronous method aayond we are using "promise" method here
  users.findOne({ acno }).then((user) => {
    //if user undenkilll if block work aaakanm
    if (user) {
      res.status(401).send("user already exist");
    } else {
      //registering the new user-create a new object for the user
      let newUser = new users({
        acno,
        uname,
        psw,
        balance: 0,
        transaction: [],
      });
      //the kayijttt namukk save cheyyanam ennit venam data send cheyyan
      newUser.save();
      //sending responsse:athin nammuk send method use aaka but send use aakumpo nammale data jsonilott convert aakanm .so athin vendi "json()" paraja mthod use aaka
      //json():convert js data into json type and send the data.ee method use aakiya jsonileott convertum aaakum data send cheyyukayum cheyyum

      res.status(200).json(newUser);
    }
  });
};

//login function

const login = (req, res) => {
  // const acno = req.body.acno;
  // const psw = req.body.psw;

  //destructuring method
  const { acno, psw } = req.body;
  //oru findOne akthrandum check cheyyan
  users.findOne({ acno, psw }).then((user) => {
    if (user) {
      //generating tocken
      //evide nammal payload kodukkanm ie aa userkk unique aayitulla oru data kodukanm
      //evide nammal acno aanu kodukkunnath
      //pinna enthenkilum secret key kodukkanm

      let token = jwt.sign({ acno }, "secretkey123");

      //ani nammmal user enna objectilekk tocken kooode aadd aakanm for that

      //nammal json akath nammale user detail ayach
      res.status(200).json({
        acno: user.acno,
        uname: user.uname,
        token,
      });
    } else {
      res.status(404).json("incorrect acno or password");
    }
  });
};

//logic to get profile data
const getProfileDetails = (req, res) => {
  //without destructuring method
  //const acno=req.params.acno

  //we are destructuring account number here
  const { acno } = req.params;

  //ani ee accno database indo nokannam
  users.findOne({ acno }).then((user) => {
    //athava ee user indenkil we need to send some data
    console.log(user);
    if (user) {
      res.status(200).json({
        acno: user.acno,
        uname: user.uname,
      });
    } else {
      //404 for not found
      res.status(404).json("user not exist");
    }
  });
};

//get balanceenquery
const getBalanceDetails = (req, res) => {
  //we are destructuring account number here
  const { acno } = req.params;
  users.findOne({ acno }).then((user) => {
    console.log(user);
    if (user) {
      res.status(200).json({
        acno: user.acno,
        uname: user.uname,
        balance: user.balance,
      });
    } else {
      //404 for not found
      res.status(404).json("user not exist");
    }
  });
};

//money transfer
const moneyTransfer = (req, res) => {
  const { fromAcno, toAcno, psw, amount, date } = req.body;

  //convert string in to number
  //amount string aayit aanu vera so calulations okke cheyyan vendi we need to convert it in to number
  let amt = parseInt(amount);

  //acno(key)=fromacno equal aanenn nokanm agne aanenkil touser indonn nokanam
  //check fromUser Account number exist in db
  users.findOne({ acno: fromAcno, psw }).then((fromUser) => {
    if (fromAcno) {
      //agene from user indenkil we need to check toUser present in the database or not
      //for that we can use "findOne()"" again
      users.findOne({ acno: toAcno }).then((toUser) => {
        if (toUser) {
          //to userum indenkil we need to check balance of "fromUser" .from userin fromUser objectin kittum
          //nammmal enter cheytha amount ee from useril indo nokkanm
          if (amt <= fromUser.balance) {
            //undenkil nammal enter cheytha amount from user balancinn kurakkanm
            fromUser.balance = fromUser.balance - amt;

            //enitt aa transaction report transaction arraylekk push cheyyanm
            fromUser.transaction.push({
              type: "DEBIT",
              amount: amt,
              date,
              user: toUser.uname,
            });
            fromUser.save();

            toUser.balance = toUser.balance + amt;
            toUser.transaction.push({
              type: "CREDIT",
              amount: amt,
              date,
              user: fromUser.uname,
            });
            //data basil store aavan
            toUser.save();
            res.status(200).json({ message: "transaction success" });
          } else {
            //ellenkil we need to send
            res.status(401).json({ message: "insufficient balance" });
          }
        } else {
          res.status(404).json({ message: "invalid credit credential " });
        }
      });
    } else {
      res.status(404).json({ message: "invalid debit credential" });
    }
  });
};

//logic for transaction history
const history = (req, res) => {
  //namukk params ninn acno edukkknmmm

  const { acno } = req.params;
  users.findOne({ acno }).then((user) => {
    if (user) {
      res.status(200).json(user.transaction);
    } else {
      res.status(404).json("user not exist");
    }
  });
};

//logic for deleteing account

const deleteAccount = (req, res) => {
  const { acno } = req.params;
  //oru usere delete cheyaan vendi deleteOne use aakanm
  //nammal evide acno vechittan delete aakunne because acount number unique aanu
  //evide output delte count aanu kitta,
  //delete aaya "1 " kittum ellenkil "0" kittum
  users.deleteOne({ acno }).then((user) => {
    if (user) {
      res.status(200).json("Account deleted successfully");
    } else {
      res.status(401).json("user not exist");
    }
  });
};

module.exports = {
  register,
  login,
  getProfileDetails,
  getBalanceDetails,
  moneyTransfer,
  history,
  deleteAccount,
};
