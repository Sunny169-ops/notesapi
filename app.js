const express = require('express');
const app = express();
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

app.get('/notes', (req,res)=>{
    Notes.find().then((data)=>{
        res.json(data)
    })
    
})

app.post('/note',jsonParser, (req, res)=>{
  
    const data = new Notes({
        _id:new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    })
    data.save().then((result)=>{
        res.status(201).json(result)
    }).catch((error)=>{
        console.warn(error)
    })
})

app.delete('/note/:id', (req,res)=>{
    Notes.deleteOne({
        _id:req.params.id
    }).then((result)=>{
        res.status(200).json(result)
    }).catch((error)=>{
        console.warn(error)
    })
})


app.put('/note/:id',jsonParser,(req,res)=>{
    Notes.updateOne({
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
        console.warn(error)
    })
})

app.listen(4500);
