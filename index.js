const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Chat=require("./models/chat.js");
let methodOverride = require('method-override');

const ExpressError=require("./ExpressError");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
    .then(()=>{
        console.log("connection successful");
    }).catch((err)=>console.log(err));

// async function main() {  //this is when learning mongo
//     await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
// }

async function main() {  //this is when learning middleware(Error handling)
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

//index Route
app.get("/chats",asyncWrap(async (req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
}));

//Index route
app.get("/",(req,res)=>{
    res.send("working root");
});

//New route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Ceate route
app.post("/chats",asyncWrap(async(req,res,next)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
}));

function asyncWrap(fn){
    return function (req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}

//NEW - Show Route (when learning middleware(ERROR handling))
// app.get("/chats/:id",async(req,res,next)=>{
//     try{                                      //we can use asyncWrap fn as callback and pass all content from  async to remove try-catch
//         let {id}=req.params;
//         let chat=await Chat.findById(id);
//         // if(!chat){
//         //     throw new ExpressError(404,"Chat not found"); //handle like it or use try-catch
//         // }
//         res.render("edit.ejs",{chat});
//     }catch(err){ 
//         next(err);
//     }
// });
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{  //same for all(remove try-catch use asyncWrap)
        let {id}=req.params;
        let chat=await Chat.findById(id);
        if(!chat){
           throw new ExpressError(404,"Chat not found"); 
        }
        res.render("edit.ejs",{chat});
    })
);

app.get("/chats/:id/edit",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
   
}));

app.put("/chats/:id",asyncWrap(async(req,res)=>{
        let{id}=req.params;
        let {msg:newMsg}=req.body;
        let updatedChat=await Chat.findByIdAndUpdate(
            id,{msg:newMsg,created_at:new Date()},{runValidators:true,new:true});
        //console.log(updatedChat);
        res.redirect("/chats");
}));
app.delete("/chats/:id",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    let delChat=await Chat.findByIdAndDelete(id);
    console.log(delChat); 
    res.redirect("/chats");
}));

const handleValidationErr=(err)=>{
    console.log("Validation error occurred");
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==="ValidationError"){
        err=handleValidationErr(err);
    }
    next(err);
});

//Error Handling Middleware 
app.use((err,req,res,next)=>{
    let {status=500,message="Some error occurred"}=err;
    res.status(status).send(message);
});

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
});