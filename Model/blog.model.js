const mongoose = require("mongoose");


const blogSchema = mongoose.Schema({
     userName: String,
     title: String,
     content: String,
     category: String,
     date: String,
     likes: Number
}, {
    versionKey: false
})


const blogModel = mongoose.model("blogs", blogSchema);


module.exports = {
    blogModel
}