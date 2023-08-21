const jwt = require("jsonwebtoken");

//ccreating middleware
//middleware is a fucntion with 3 argument
//request,response,next

const jwtMiddleWare = (req, res, next) => {
  //try -catch
  //evide accesstoken ellenkil runtime error verum
  //run time error solve cheyyan venditt use cheyunnan try-catch
  //error veraan chance ella code try block akath kodukkaa
  //athava eerror venal nth chyynam ennanu catch akath kodukndath
  //try akath error vannal aanu catch work aakullu

  try {
    //evide namukk dot vechittum /square bracket vechittum data access cheyyan pattum
    const token = req.headers["access_token"];
    //validate thee token using jwt verify method()
    jwt.verify(token, "secretkey123"); //true/false aanu veraa
    //ethokke verified aanenkil bakki karyagal continue aavanm for that we are using "next()" function

    next();
  } catch (error) {
    //athava error vannnal catch block work cheyyanm
    res.status(404).json("please login");
  }
};

module.exports = jwtMiddleWare;
