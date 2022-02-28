const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");

routes.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const { originalname: name, size, key, location: url = "" } = req.file;
    const post = await Post.create({
      name,
      size,
      key,
      url,
    });
    if (!req.file) {
      return res.send("Please upload a file");
    } else {
      return res.json(post);
    }
  } catch (error) {
    console.log(error);
  }
});

routes.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = routes;
