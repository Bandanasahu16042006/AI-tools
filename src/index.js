// const express = require("express");
// const path = require("path");
// const LogInCollection = require("./mongo");
// const fetch = require('node-fetch'); // Import node-fetch
// const { GoogleGenerativeAI } = require('@google/generative-ai'); // Import the class
import express from "express";
import path from "path";
import LogInCollection from "./mongo.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import fetch , { Headers } from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

globalThis.fetch = fetch;
globalThis.Headers = Headers;

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Load API key securely
const app = express();


//const LogInCollection = require("./mongo");
const port = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Paths for templates and public files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, '../tempelates');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', templatePath);

// Serve static files from the "public" directory
app.use(express.static(publicPath));

// Routes
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});
app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});
app.post('/signup', async (req, res) => {
    try {
        const { name, password, mobile } = req.body;

        // Basic validation for mobile number
        if (!/^[0-9]{10}$/.test(mobile)) {
            return res.status(400).send("Invalid mobile number");
        }

        const existingUser = await LogInCollection.findOne({ name });

        if (existingUser && existingUser.password === password) {
            res.send("User details already exist");
        } else {
            const newUser = new LogInCollection({ name, password, mobile });
            await newUser.save();
            res.status(201).render("home", { naming: name });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await LogInCollection.findOne({ name });

        if (user) {
            if (user.password === password) {
                res.status(201).render("home", { naming: name });
            } else {
                res.send("Incorrect password");
            }
        } else {
            res.send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.post('/ask-gemini', async (req, res) => {
    try {
      const question = req.body.question; 
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });


      // watch the youtube video to give the proper input and output formate
      
      const result = await model.generateContent(question);
      const text = await result.response.text();
      res.json({ answer: text }); // Send the answer back as JSON

    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error processing request.');
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    //console.log("Your API Key:", process.env.API_KEY);

});
