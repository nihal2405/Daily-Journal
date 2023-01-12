//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Journaling daily is the most potent and powerful keystone habit you can acquire. If done correctly, you will show up better in every area of your life — every area! Without question, journaling has by far been the number one factor to everything I’ve done well in my life. As part of your morning creative burst, use your journal to review and hone your daily to-do list. Review and hone your life vision and big-picture goals.As you read and re-write your goals daily, they’ll become forged into your subconscious mind. Eventually, your dreams and vision will consume your inner world and quickly become your physical reality. By using this website, you can create your Daily Journal-go to /compose to write";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];
app.get("/",function(req,res){
  res.render("home", {startingContent: homeStartingContent,
  posts: posts });

});

app.get("/about",function(req,res){
  res.render("about",{aboutt: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactt: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


app.post("/compose",function(req,res){
  const post = {
    title: req.body.ppp,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  });
});














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
