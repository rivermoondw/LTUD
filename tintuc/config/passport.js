var LocalStrategy = require('passport-local').Strategy;
var user = require('../app/models/admin/m_user.js');
var md5 = require('md5');

module.exports = function(passport) {
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		user.getUserId(id, function(err, user){
			done(err, user);
		});
	});
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		user.getUser(username, function(err, user){
			if (err) return done(err);
			if (!user.length){
				return done(null, false, req.flash('loginMessage', 'Tài khoản không tồn tại!'));
			}
			var comparePassword = md5(md5(user[0].salt)+md5(md5(password)));
			if (comparePassword != user[0].password){
				return done(null, false, req.flash('loginMessage', 'Sai tài khoản hoặc mật khẩu'));
			}
			return done(null, user[0]);
		});
	}
	));
}
