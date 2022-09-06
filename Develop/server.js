const express = require('express');
const path=require('path');

const notes=require('./db/db.json');

const PORT=8080;

const app=express();