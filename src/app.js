const express = require("express");
const path = require("path");
const app = express();
require("../src/db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const port = process.env.PORT || 4000; 
const async = require("hbs/lib/async");
//setting path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");
//routing
app.get("/",(req,res)=>{res.render("index")});
app.use(express.urlencoded({extended:true}))
app.post("/contact",async(req,res)=>{   
        //console.dir(req.body);
        const userData = new User(req.body);
    try{
        //console.log(userData);
         userData.save();
        
        res.status(201).render("index");
    }
    catch(error){
        res.status(500).send(error);
    }
});
//middleware
app.use(express.json());

app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.set("views",templatepath);
hbs.registerPartials(partialpath);
app.set("view engine","hbs");

//server
app.listen(port, () =>{
    console.log("listening at ${port}");
})
//app.listen(4000,()=> console.log("server is running on port 4000"));
