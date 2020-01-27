var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/banner', function (req, res, next) {
	var bannerEL =Banner.find({});
	bannerEL.exec(function(err,data){
	if(err) throw err;
		console.log(data);
		res.render('banner', { title: 'Banner Records', BannerRecords:data });
		  });
	//return res.render('banner.ejs');
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
					res.send({"Success":"You are regestered,You can login now."});
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
	//console.log('login');
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
			res.send({"Success":"This Email Is not regestered!"});
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
			res.send({"Success":"This Email Is not regestered!"});
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
	return res.render('data.ejs');
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
							color: bannerConfig.banner_color,
							positionlft: bannerConfig.banner_position_lft,
			  			  	positionrht :  bannerConfig.banner_position_rht
						});

						newBanner.save(function(err, banner){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});

	console.log("profile");
	console.log();
	return res.render('data.ejs');
});

router.post('/admincon', function (req, res, next) {
	var users =User.find({});
	users.exec(function(err,data){
	if(err) throw err;
		res.render('admincon', { title: 'User Records', records:data });
		  });
	
});

//delete record  
router.get('/delete/:id', function(req, res){
	console.log("delete");
	User.remove({unique_id: req.params.id}, 
	   function(err){
		if(err) res.json(err);
		else    res.render('admincon.ejs', { title: 'User Records', records:data });
	});
});

module.exports = router;
