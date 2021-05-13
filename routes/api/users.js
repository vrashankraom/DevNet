const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const User = require('../../models/User');
//const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config =require('config');
const jsdom = require("jsdom");
const jwt = require('jsonwebtoken');


router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('username', 'Please include your instagram username').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],   
    async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    console.log(req.body);
    

    const { name,username, email, password } = req.body;
    try{
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
    }
    catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
    }

      /*const avatar =gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
       */
      const url = "https://api.github.com/users/"+`${username}`;
      var avatar;
      //const myusername=username;
      //const url ="https://www.instagram.com/"+`${myusername}`+"/?__a=1";
      UrlExists(url);
      function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status == 404){
    return res
    .status(400)
    .json({ errors: [{ msg: 'Instagram User does not exists!' }] });
    }
} 
      const { JSDOM } = jsdom;
     const { window } = new JSDOM();
     const { document } = (new JSDOM('')).window;
      global.document = document;
      var $ = jQuery = require('jquery')(window);
      $.getJSON(url,async function(data){
        console.log(data);
        
      try{
        
      //avatar = await data.graphql.user.profile_pic_url;
      avatar = await data.avatar_url;
      
      user = new User({
        name,
        email,
        avatar,
        password
      });
    
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id 
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSECRET'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    
  }
    catch(err){
      console.log(err.message);
        res.status(500).send('Server Error');
    }
      });
      
     
});


module.exports =router;