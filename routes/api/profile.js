const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const config =require('config');
const request =require('request');
const puppeteer = require('puppeteer');
const axios = require('axios');

const { check, validationResult } = require('express-validator');
//const checkObjectId = require('../../middleware/checkObjectId');

//To get my own Profile
router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
  
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  //To store data into my Profile
  router.post(
    '/',
    [
      auth,
      [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        company,
        location,
        website,
        bio,
        skills,
        status,
        githubusername,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook
      } = req.body;
     //profile object
     const profileFields ={};
     profileFields.user =req.user.id;
     if(company) profileFields.company =company;
     if(website) profileFields.website=website;
     if(location) profileFields.location=location;
     if(status) profileFields.status=status;
     if(bio)profileFields.bio=bio;
     if(githubusername)profileFields.githubusername=githubusername;
     if(skills){
        profileFields.skills = skills.split(',').map(skills=>skills.trim());
     }
     //console.log(profileFields.skills);
     profileFields.social ={};
     if(youtube)profileFields.social.youtube=youtube;
     if(twitter)profileFields.social.twitter=twitter;
     if(linkedin)profileFields.social.linkedin=linkedin;
     if(facebook)profileFields.social.facebook=facebook;
     if(instagram)profileFields.social.instagram=instagram;
     
     try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new:true,upsert: true,setDefaultsOnInsert: true }
        );
        
        var username="";
        username = profileFields.githubusername;
        //console.log(typeof username==="undefined");
        if(typeof username==="undefined"){
          await User.findOneAndUpdate(
            { _id:req.user.id },
            { $set :{avatar:"https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",status:profileFields.status,company:profileFields.company}},
            { new:true,upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile);
        }
        else {
        var emailurl = "https://github.com/"+`${username}`;
        
        scrapeImage(emailurl);
        async function scrapeImage(emailurl){
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(emailurl);
        
          const [element] = await page.$x('//*[@id="js-pjax-container"]/div[2]/div/div[1]/div/div[2]/div[1]/a/img');
          try{
            
          let srcImg = await element.getProperty('src');
        
          var src = await srcImg.jsonValue();
          
          await User.findOneAndUpdate(
            { _id:req.user.id },
            { $set :{avatar:src,status:profileFields.status,company:profileFields.company}},
            { new:true, upsert: true, setDefaultsOnInsert: true }
          );
          
          browser.close();
          }
          catch{
            await User.findOneAndUpdate(
              { _id:req.user.id },
              { $set :{avatar:"https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",status:profileFields.status,company:profileFields.company}},
              { new:true,upsert: true, setDefaultsOnInsert: true }
            );
          }
        }
        return res.json(profile);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  //To get everyone's Profile
  router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  //To get a Specific Profile using params
  router.get(
    '/user/:user_id',
    async (req, res) => {
      try {
        const profile = await Profile.findOne({
          user: req.params.user_id
        }).populate('user', ['name', 'avatar']);
  
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });
  
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );
  //Delete Profile and User
  router.delete('/', auth, async (req, res) => {
    try {
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
    // Add an Experience
    router.put(
      '/experience',
      [
        auth,
        [
          check('title', 'Title is required').not().isEmpty(),
          check('company', 'Company/organisation is required').not().isEmpty(),
          check('from', 'From date is required and needs to be from the past')
            .not()
            .isEmpty()
        ]
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const {
          title,
          company,
          location,
          from,
          to,
          current,
          description
        } = req.body;
    
        const newExp = {
          title,
          company,
          location,
          from,
          to,
          current,
          description
        };
    
        try {
          const profile = await Profile.findOne({ user: req.user.id });
    
          profile.experience.unshift(newExp);
    
          await profile.save();
    
          res.json(profile);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    );
    // Delete Experience
    router.delete('/experience/:exp_id', auth, async (req, res) => {
      try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        const removeIndex = profile.experience.map(items=>items.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        return res.status(200).json(profile);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
      }
    });
   // Add Education details
    router.put(
      '/education',
      [
        auth,
        [
          check('school', 'School is required').not().isEmpty(),
          check('degree', 'Degree is required').not().isEmpty(),
          check('fieldofstudy', 'Field of study is required').not().isEmpty(),
          check('from', 'From date is required and needs to be from the past')
            .not()
            .isEmpty()        ]
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        } = req.body;
    
        const newEdu = {
          school,
          degree,
          fieldofstudy,
          from,
          to,
          current,
          description
        };
    
        try {
          const profile = await Profile.findOne({ user: req.user.id });
    
          profile.education.unshift(newEdu);
    
          await profile.save();
    
          res.json(profile);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    );
    
 
    //Delete education
    router.delete('/education/:edu_id', auth, async (req, res) => {
      try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(items=>items.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        return res.status(200).json(profile);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
      }
    });

   //To get the Repos of users

    router.get('/github/:username', async (req, res) => {
      try {
        const uri = encodeURI(
          `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
        );
        const headers = {
          'user-agent': 'node.js',
          Authorization: `token ${config.get('githubToken')}`
        };
    
        const gitHubResponse = await axios.get(uri, { headers });
        
        return res.json(gitHubResponse.data);
        
      } catch (err) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
    });
    
module.exports =router;