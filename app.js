const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");



const homeStartingContent = "HelloLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id aliquet lectus proin nibh nisl condimentum id venenatis. Varius morbi enim nunc faucibus a. Elementum curabitur vitae nunc sed velit. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Quis risus sed vulputate odio ut enim blandit volutpat. Massa massa ultricies mi quis hendrerit dolor magna eget. Eget arcu dictum varius duis. Neque gravida in fermentum et sollicitudin ac orci phasellus. Lorem sed risus ultricies tristique nulla aliquet enim. Bibendum ut tristique et egestas quis ipsum. A scelerisque purus semper eget duis at tellus at. Elementum curabitur vitae nunc sed. Consectetur purus ut faucibus pulvinar. Facilisi cras fermentum odio eu. Auctor urna nunc id cursus metus aliquam eleifend mi. Mauris vitae ultricies leo integer malesuada nunc vel risus. In iaculis nunc sed augue lacus viverra vitae.";



const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://Harsh:harsh1234@cluster0.bkld1.mongodb.net/nodeswc?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology: true});

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/public' , express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




const blogSchema = {
  title: String,
  content: String
};

const Blog = mongoose.model("Post", blogSchema);

app.get("/", function(req, res){

  Blog.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
    const post = new Blog({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  
  
    post.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });
  });
  

app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
    Blog.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
        title: post.title,
        content: post.content
    });
  });
    
});


    

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});
app.get('/:postId',function(req,res){
  const requestedPostId = req.params.postId;
  Blog.findOneAndDelete({_id: requestedPostId}, function(err){
    if (!err){
      res.redirect("/");
  }
    
  })
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started successfully");
});