var express = require('express');
var router = express.Router();
var User = require('../models/user');
const JSON = require('circular-json');
const session = require('express-session');
var jwt = require('jsonwebtoken');
var config = require('./config.js');
let cookieParser = require('cookie-parser'); 

// var token = jwt.sign({ id: user._id, role:user.role }, config.secret, {
// 	expiresIn: 86400});
// 	module.exports = {
// 		'secret': 'supersecret'
// 	  };
	// expires in 24 hours
// router.get('/banner', function (req, res, next) {
// 	var bannerEL =Banner.find({});
// 	bannerEL.exec(function(err,data){
// 		//user details
// 		var users =User.find({});
// 		users.exec(function(err,userdata){
// 	  //  res.render('admincon', { title: 'User Records', records:userdata });
// 		  console.log(data);
// 		res.render('banner', { title: 'Banner Records', BannerRecords:data, UserRecords:userdata  });
// 	});
// 		  });
// 	//return res.render('banner.ejs');
// });
// var INIsession = req.session;

router.get('/banner', function (req, res, next) {
	var users =User.find({status:1});
	users.exec(function(err,userdata){
		console.log(userdata);
		var Mapuser = [];
		userdata.map(val =>{
			Mapuser.push({author : val.username})
		})
	console.log(Mapuser);	
	var bannerEL =Banner.find({ $or : Mapuser}).sort('-timestamp');
	bannerEL.exec(function(err,data){
	res.render('banner', { title: 'Banner Records', BannerRecords:data });
	});
  });
});
router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});



router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});
//login
router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
}); 

router.post('/login', function (req, res, next) {
		
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
					
				  

		if(data){
			
			if(data.password==req.body.password){
				console.log("Done Login");
				
				req.session.userId = data.unique_id;
				console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
			console.log("data:" );
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
		console.log("data:" );
	});
	
});


//ADMIN 
router.get('/admin', function (req, res, next) {
	console.log("admin");
	return res.render('admin.ejs');
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log( "devesh:"+ data);
		if(!data){
			res.send({"Success":"This Email Is not registered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Banner){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched!"});
		}
		}
	});
	
});

router.get('/profile', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			console.log("found");
			return res.render('data.ejs');
		}
	});
	
});

router.post('/profile', function (req, res, next) {
	var bannerConfig = req.body;
	res.send();
	var c;
					Banner.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newBanner = new Banner({
							name : bannerConfig.banner_name,
					    	content: bannerConfig.banner_content,
							author: bannerConfig.author_name,
							
						});

						newBanner.save(function(err, banner){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});

	console.log("profile");
	//console.log();
	return res.render('data.ejs');
});

router.post('/admincon', function (req, res, next) {
	var users =User.find({});
	users.exec(function(err,data){
	if(err) throw err;
		res.render('admincon', { title: 'User Records', records:data });
		  });
	
});

router.get('/delete/:id', function(req, res){
	console.log("delete");
	User.remove({unique_id: req.params.id}, 
	   function(err){
		if(err) res.json(err);
		else   {
			
				var users =User.find({});
				users.exec(function(err,data){
				if(err) throw err;
				res.render('admincon', { title: 'User Records', records:data });
			  });
			
		}
	});
	
});

//delete record  
router.post('/delete', function(req, res){
	console.log("delete");
	console.log(req.body.val);
	User.remove({unique_id: req.body.val}, 
	   function(err){
		if(err) res.json(err);
		else   {
			
				var users =User.find({});
				users.exec(function(err,data){
				if(err) throw err;
				res.render('admincon', { title: 'User Records', records:data });
			  });
			
		}
	});
	
});

//active status of record using post
router.post('/active', function(req, res){
	console.log("active");
	//console.log(JSON.stringify(req.body));
	console.log(req.body.val);
	User.updateOne({unique_id: req.body.val},{	status: 1},
	   function(err,data){
		   console.log(data);
		if(err) res.json(err);
		else 
		{
			var users =User.find({});
			users.exec(function(err,data){
			if(err) throw err;
			res.render('admincon', { title: 'User Records', records:data });
		//	res.redirect('/admincon');

		  });
		}  // res.render('admincon.ejs', { title: 'User Records', records:data });

	});
});
//inactive status of record using post
router.post('/inactive', function(req, res){
	console.log("inactive");
	User.updateOne({unique_id: req.body.val},{	status: 0},
	   function(err,data){
		   console.log(data);
		if(err) res.json(err);
		else 
		{
			var users =User.find({});
			users.exec(function(err,data){
			if(err) throw err;
			res.render('admincon', { title: 'User Records', records:data });
		  //	res.redirect(req.get('referer'));
			
		  });
		}  // res.render('admincon.ejs', { title: 'User Records', records:data });

	});
	
});

module.exports = router;
