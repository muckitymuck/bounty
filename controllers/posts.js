const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("position.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getHitList: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("hitlist.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPostEdit: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id,);
      res.render("positionEdit.ejs", { post: post, user: req.user });

    } catch (err) {
      console.log(err);
    }
  },
  createPosition: async (req, res) => {
    try {
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        companylink: req.body.companylink,
        joblink: req.body.joblink,
        contacts: req.body.contacts,
        status: 1,
        notes: req.body.notes,
        //cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/position");
    } catch (err) {
      console.log(err);
    }
  },
  editPosition: async (req, res) => {
    try {


      await Post.findOneAndUpdate({ _id: req.params.id},
        {
          $inc: 
            {title: req.body.title,
            companylink: req.body.companylink,
            joblink: req.body.joblink,
            contacts: req.body.contacts,
            status: req.body.status,
            notes: req.body.notes,
            //cloudinaryId: result.public_id,
            //user: req.user.id,
            },
      });
      console.log("Post has been updated!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/hitlist");
    } catch (err) {
      res.redirect("/hitlist");
    }
  },
};
