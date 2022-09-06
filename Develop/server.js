const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');
const path=require('path');

let rawData=fs.readFileSync('./db/db.json');

const notes=JSON.parse(rawData);

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
    console.log(notes.length);
})

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/public/index.html'));
})

app.get('/notes',function(req,res){
    res.sendFile(path.join(__dirname,'/public/notes.html'));
})

app.get('/api/notes',function(req,res){
    res.json(notes);
})

app.post('/api/notes',function(req,res){

    const note = {
        id: notes.length+1,
        title: req.body.title,
        text: req.body.text,
    }
    
    notes.push(note);
    fs.writeFileSync('./db/db.json',JSON.stringify(notes));
    res.send(notes);
    
}) 