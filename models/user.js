var mongoose = require('mongoose');
var Schema = mongoose.Schema;


userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	status :{type :Number, default :0 } , 	
}),
User = mongoose.model('User', userSchema);

//banner Schema
bannerSchema = new Schema( {
	
	unique_id: Number,
	name : String,
	content : String,
	author: String,
	timestamp: { type: Date, default: Date.now}
	// positionlft : String,
	// positionrht : String,
		
}),
Banner = mongoose.model('banner', bannerSchema);

module.exports = Banner;
module.exports = User;