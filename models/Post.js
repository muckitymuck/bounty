const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companylink: {
    type: String,
    require: true,
  },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  joblink: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
