const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

exports.getSignin = (req, res, next) => {
  res.render('auth/signin', {
    path: '/signin',
    pageTitle: 'Login',
    errorMessage: '',
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: '',
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postSignin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('auth/signin',{
      path: '/signin',
      pageTitle: 'signin',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }
  User.findOne({ email: email })
  .then(user=>{
    if (!user) {
      return res.status(422).render('auth/signin', {
        path: '/signin',
        pageTitle: 'Login',
        errorMessage: 'Invalid email or password.',
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: []
      });
    }
    bcrypt
    .compare(password, user.password)
    .then(isMatched=>{
      if(isMatched){
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.iaAdmin = false;
        if(req.body.email == 'admin@abc.com'){
          req.session.isAdmin = true;
        }
        return req.session.save(err => {
          if(err)
            console.log(err);
          res.redirect('/');
        });
      }
      return res.status(422).render('auth/signin', {
        path: '/signin',
        pageTitle: 'Login',
        errorMessage: 'Invalid email or password.',
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: []
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/auth/signin');
    })
  })
  .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/auth/signin');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req,res,next)=>{
  req.session.destroy(err => {
    if(err)
      console.log(err);
    res.redirect('/');
  });
};