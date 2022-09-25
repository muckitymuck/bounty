const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPosition", upload.single("file"), postsController.createPosition);

router.put("/getPostEdit/:id", postsController.editPosition);

router.get("/:id", ensureAuth, postsController.getPostEdit);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
