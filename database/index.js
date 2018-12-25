const db = require('mongoose');
const {username, password} = process.env || require('../config.js');

db.connect(`mongodb://${username}:${password}@ds157712.mlab.com:57712/reddis-clone`, {useNewUrlParser: true, useCreateIndex: true});

var Schema = db.Schema;

var usersSchema = new Schema({
  username: {
    type: String,
    unique: true
  }
}, {timestamps: true});

var postsSchema = new Schema({
  postId: String,
  message: String,
  parent: String,
  user: String,
  title: String
}, {timestamps: true});

const Users = db.model('users', usersSchema);
const Posts = db.model('posts', postsSchema);

module.exports = {Users, Posts};