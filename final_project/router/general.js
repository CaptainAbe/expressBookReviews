const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  //let users = [];

  const isValid = (username)=>{
    let userswithsamename = users.filter((user)=>{
     return user.username === username
    });
    if(userswithsamename.length > 0){
        return true;
    } else {
        return false;
    }
  }
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register customer."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },3000)})
  myPromise.then((successMessage) => {
    res.send(JSON.stringify(books,null,4));
})
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },3000)})
  myPromise.then((successMessage) => {
  res.send(books[isbn])
})
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let numberofbooks = Object.keys(books);
  //let booksbyauthor = books.filter((books) => books.author === author);
  //for (let i = 1; i<numberofbooks.length; i++)
  var i = numberofbooks.length;
  let ownerData;
  while(i--) {
      if (books[i].author === author) {
        ownerData = books[i];
        break;
    }
  }
  const bookbyauthor = {
      isbn: i,
      title: books[i].title,
      reviews: books[i].reviews
  }
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },3000)})
  myPromise.then((successMessage) => {
  res.send(bookbyauthor)
  })
  //res.send(ownerData)
  //res.send(JSON.stringify(ownerData,null,4));
  //res.send(JSON.stringify(books[i],null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let numberofbooks = Object.keys(books);
  var j = numberofbooks.length;
  let ownerData;
  while(j--) {
      if (books[j].title === title) {
        ownerData = books[j];
        break;
    }
  }
  const bookbytitle = {
      isbn: j,
      author: books[j].author,
      reviews: books[j].reviews
  }
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },3000)})
  myPromise.then((successMessage) => {
  res.send(bookbytitle)
})
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
