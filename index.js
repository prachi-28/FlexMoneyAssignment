var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/YogaDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/signup", (req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phno=req.body.phno;
    var age=req.body.age;
    var e = req.body.selectSlot;
	
    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "age": age,
        "slotTime":e
    }

    db.collection('users').insertOne(data,(err, collection)=>{
        if(err)
        {
            throw err;
        }

        console.log("Record inserted successfully");
    });

    return res.redirect('signupSuccess.html');
})

app.get("/", (req, res)=>{
    res.set({
        "Allow-access-Aloow-orgin": '*'
    })

    return res.redirect('index.html');
}).listen(3000);

console.log("listening on port 3000")