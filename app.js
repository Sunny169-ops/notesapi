const express = require('express');
const app = express();
var PORT  = process.env.PORT || 4500;
const mongoose = require('mongoose');
const Notes = require('./models/notes');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
mongoose.connect('mongodb+srv://notesapi:7uQq2U8WHaTObSSJ@cluster0.klec8.mongodb.net/notesapi?retryWrites=true&w=majority',
 {
     useNewUrlParser: true,
     useUnifiedTopology:true
    
    }
).then(()=>{
    console.warn("db is connected")
})


// <------------------------------ API---------------------------->

app.get('/notes', async(req,res)=>{
    await Notes.find().then((data)=>{
        res.json(data)
    })
    
})

app.post('/note',jsonParser, async(req, res)=>{
  
    const data = new Notes({
        _id:new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    })
    await data.save().then((result)=>{
        res.status(201).json(result)
    }).catch((error)=>{
        res.status(500)
    })
})

app.delete('/note/:id', async(req,res)=>{
    await Notes.deleteOne({
        _id:req.params.id
    }).then((result)=>{
        res.status(200).json(result)
    }).catch((error)=>{
        res.status(500)
    })
})


app.put('/note/:id',jsonParser,async(req,res)=>{
     await Notes.updateOne({
        _id:req.params.id
    },
    {
        $set:{
            title:req.body.title,
            description:req.body.description
        }
    }
    ).then((result)=>{
        res.status(201).json(result)
    }).catch((error)=>{
        res.status(500)
    })
})

app.listen(PORT);
