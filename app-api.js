const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json()); // parse form data client
const data={item:"itemdata",success:true}
const secret="secret-text"
app.get("/getdata", (req,res)=>{
    const token = req.headers["token"];    
    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
    }
    jwt.verify(token, secret, (err, reqparam) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        console.log(reqparam)
        if(reqparam.user!=="john") {
            return res.status(401).send({
              message: "Unauthorized!"
            });
          }
        res.status(200).send(data); 
    });   
});
var server = app.listen(5001, () => {
    console.log(`Api App listening at port 5001`, server.address());
});
