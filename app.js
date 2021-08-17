const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) =>{
res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",(req, res) =>{

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/8c89681c61";

    const options = {
        method: "POST",
        auth:"amarjot:d5d62c9b807be733cb840b24a4c53ddb-us5"
    }

    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) =>{

        console.log(JSON.parse(data));


        })

    })
    request.write(jsonData);
    request.end();

     
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("listening at 3000");
});  

// d5d62c9b807be733cb840b24a4c53ddb-us5

// 8c89681c61