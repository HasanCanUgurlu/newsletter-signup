
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req,res){

  const name = req.body.name;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : name
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/45a753ba7e";

  const options = {
    method: "POST",
    body: data,
    auth: "hasan:7c7d2f72ecd6817dd79e5c019287f8ec-us10"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
});




app.listen(process.env.PORT || 3000, function(){
  console.log("server is running");
});

// LIST KEY

//45a753ba7e

// API KEY FOR MAILCHIMP

// 7c7d2f72ecd6817dd79e5c019287f8ec-us10
