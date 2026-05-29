const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
    .then(()=>{
        console.log("connection successful");
    }).catch((err)=>console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
// }

async function main() {  //this is when learning middleware(Error handling)
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats=[
    {
        from:"Pramod",to:"Rohit",
        msg:"send me dsa sheet",created_at:new Date(),
    },
    {
        from:"Rohit",to:"Rakesh",
        msg:"send me notes",created_at:new Date(),
    },
    {
        from:"Virat",to:"Anushka",
        msg:"send me akay smily pic",created_at:new Date(),
    },
    {
        from:"Pandey",to:"V.Brother",
        msg:"send me syllabus",created_at:new Date(),
    }
];
Chat.insertMany(allChats);
