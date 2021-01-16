//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

// app.get("/generated", function(req, res){
//   res.sendFile(__dirname + "/nameGen.html");
// });


app.post("/", function(req, res){

  var surName = req.body.surName ;
  var givenName = req.body.givenName ;
  var genderChoice = req.body.genderChoice ;

  const APINameParserKey = "72335a38bbd591fba0e9bb9f434e74fc" ;
  const urlNameGenAPI = "https://api.parser.name/?api_key=" + APINameParserKey + "&endpoint=generate&country_code=MY&gender=" + genderChoice ;
  const options = {
    method: "POST",
    auth: "ezekiel:72335a38bbd591fba0e9bb9f434e74fc"
  };

  const request = https.request(urlNameGenAPI, options, function(response){

    response.on("data", function(data){

      var dataName = JSON.parse(data) ;

      try {var genName = dataName.data[0].name.firstname.name ;}
      catch(e) { reject(e); }

      var WHOLEFILE = '<!DOCTYPE html> <html lang="en" dir="ltr"> <head> <meta charset="utf-8"> <title>Name Generator</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"> <link rel="stylesheet" href="css/main.css"> </head> <body> <div class="row m-5 gy-5"> </div><div class="row m-5 gy-5"> </div><div class="container d-flex align-items-center m-5" id="headContain"> <div class="row justify-content-center m-5 gy-5"> <div class="col-4"> <h1 class="text-white fw-bold"> Generate an English Name </h1><p class="mt-2 mb-3 text-muted">© EzeA</p></div></div><form class="row justify-content-center g-3 m-5" action="/" method="post"> <div class="col-md-4"> <label for="surname" class="form-label text-white">Surname</label> <input type="text" name="surName" class="form-control" id="surname"> </div><div class="col-md-4"> <label for="givenname" class="form-label text-white">Given Name</label> <input type="text" name="givenName" class="form-control" id="givenname"> </div><div class="col-md-4"> <label for="inputState" class="form-label text-white">Gender</label> <select name="genderChoice" id="inputState" class="form-select">  <option selected value="m">Male</option> <option value="f">Female</option> </select> </div><div class="d-grid gap-2 col-6 mx-auto mt-5"> <button type="submit" name="submit" class="btn btn-lg btn-primary">Generate</button> </div></form> </div><div class="container ml-5"> <div class="row justify-content-center m-5 gy-5"> <div class="col-12 text-center"> <h1 class="text-white fw-bold text-center" id="GeneratedName"> Watch This Space </h1> </div></div></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script> '
      ;

      var closeHTML = '</body></html>' ;
      res.send(WHOLEFILE + '<script type="text/javascript">document.getElementById("GeneratedName").innerText = "You have been given the name:' +  ' ' + genName + '"' + ';</script>'  + closeHTML);

    });




  });

  request.write(urlNameGenAPI);

  request.end();


});


//processenvPORT is for Heroku
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
