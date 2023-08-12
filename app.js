const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/wikiDb');
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})
const Article = mongoose.model("Article", articleSchema)
const port = 9000;

app.route("/articles")
    .get((req, res) => {
        Article.find().then((articles) => {
            res.send(articles);
        })
    })
    .post((req, res) => {
        console.log(req.body);
        const article = new Article({ title: req.body.title, content: req.body.content })
        article.save().then((val) => {
            res.send(val)
        })
    })
    .delete((req, res) => {
        Article.deleteMany().then((val) => {
            res.send(val)
        })
    })

app.route("/articles/:name")
    .get((req, res) => {
        const name = req.params.name;
        Article.findOne({ title: name }).then((val) => {
            res.send(val);
        })
    })
    .put((req, res) => {
        const name = req.params.name;
        Article.update(
            { title: name },
            { title: req.body.title, content: req.body.content }
        ).then((val) => {
            res.send(val)
        })

    })
    .patch((req, res) => {
        const name = req.params.name;
        Article.updateOne({title : name },{$set :req.body}).then((val)=>{
            res.send(val)
        })
    })
    .delete((req, res) => {
        const name = req.params.name;
        Article.deleteOne({ title: name }).then((val) => {
            res.send(val);
        })
    })


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})



// [{ "title" : "REST","content" : "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."},{title : "API",content : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."},{title : "Bootstrap",content : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"},{title : "DOM",content : "The Document Object Model is like an API for interacting with our HTML"},{ title : "Jack Bauer",content : "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",}]