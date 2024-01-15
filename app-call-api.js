const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const secret = "secret-text";
const userdata = {
  user: "john",
  srl: 21000,
  qty: 125,
};
const app = express();
app.use(express.json()); // parse form data client
app.get("/callapi", (req, res) => {
  let token = jwt.sign(userdata, secret, {
    expiresIn: "12m",
  });
  axios
    .get("http://localhost:5001/getdata", { headers: { token } })
    .then((result) => {
      console.log(result.data);
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log("err");
      res.status(401).send("Unauthorized");
    });
});
var server = app.listen(5002, () => {
  console.log(`Call api service App listening at port 5002`, server.address());
});
