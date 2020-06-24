const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const text = require(__dirname + "/text");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const blogPosts = [];
blogPosts.push(text.story1);
blogPosts.push(text.story2);
blogPosts.push(text.story3);

app.get("/", function (req, res) {
  res.render("home", { home: text.homeContent, blogPosts: blogPosts });
});

app.get("/about", function (req, res) {
  res.render("about", { content: text.aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: text.contactContent });
});

app.get("/create", function (req, res) {
  res.render("create");
});

app.post("/create", function (req, res) {
  const post = {
    title: req.body.title,
    body: req.body.text,
    author: req.body.author,
  };
  blogPosts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const redirectPost = _.lowerCase(req.params.postName);

  blogPosts.forEach(function (post) {
    const titleName = _.lowerCase(post.title);

    if (titleName === redirectPost) {
      res.render("post", {
        title: post.title,
        body: post.body,
        author: post.author,
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
