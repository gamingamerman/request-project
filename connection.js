const {MongoClient} = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const { json } = require("body-parser");
const movie = require("./modelMovie")

const app = express()

app.use(express.json())

async function main() {
    
    const uri = "mongodb+srv://dbUser1:Mq8BTFPz7QpTRW2T@movies.uxfxv.mongodb.net/Movies?retryWrites=true&w=majority";

    const client = MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const {schema} = mongoose


    app.get("/get-request", async(req, res) => {
        MongoClient.connect(uri, function(err, db) {
            let dbo = db.db("Movies")
            dbo.collection("Movies").find({}).toArray(function(err, result) {
                res.json(result)
                console.log(result)
                db.close()  
            })
        })
    })

    app.post("/post-request", async(req, res) => {

        MongoClient.connect(uri, async(err, db) => {

            const para = new movie({
                title: req.body.title,
                year: req.body.year,
                actors: req.body.actors,
                ranking: req.body.ranking
            })

            let dbo = db.db("Movies");
            


            try{
                dbo.collection("Movies").insertOne(para, (err, result) => {
                    console.log("Successfully inserted one Document")
                })
            }catch(err){
                res.send("there was an error")
            }
    
        })

    })

    app.put("/put-request/:id", async(req, res) => {

        MongoClient.connect(uri, async(err, db) => {

            let queries = req.body

            let dbo = db.db("Movies");

            let title_movie = req.params.id

            const myquery = {
                title: title_movie
            }

            dbo.collection("Movies").update(myquery, queries, function(err, res) {
                console.log("Document Updated");
                db.close()
            })

        })
    })

    app.delete("/delete-request", async(req, res) => {

        MongoClient.connect(uri, async(err, db) => {

            let dbo = db.db("Movies");

            let whatToDelete = {title: req.body.title}

            dbo.collection("Movies").deleteOne(whatToDelete, function(err, obj) {
                console.log("Document Deleted");
                db.close();
            })

        })
    })

    ////////////////////////////////////////////////////

    //This is for to test the db contents ONLY

    // client.connect(err => {
    //     const collection = client.db("Movies").collection("Movies");
    //     console.log(collection)
    // })

    ////////////////////////////////////////////////////

    app.listen(4000, function() {
        console.log("Currently Listening to Port 4000")
    })

}

main()