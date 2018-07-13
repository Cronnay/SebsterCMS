import passport from 'passport';
import { UserModel } from './../database';
import { comparePassword } from './bcrypt';
const localstrategy = require('passport-local').Strategy;

export default class PassportSetup {
	constructor() {
		passport.serializeUser((user, done) => {
			done(null, user.id);
		});
		
		passport.deserializeUser((userId, done) => {
			UserModel.findById(userId)
				.then(user => {
					done(null, user);
				});
		});
		
		
		passport.use(
			new localstrategy(
				(username, password, done) => {
					UserModel.findOne({
						where: {
							username
						}
					}).then(async user => {
						if (user) {
							const hashedPW = user.password;
							const samePassword = await comparePassword(hashedPW, password);
							if (samePassword) {
								return done(null, user);
							} else {
								return done(null, false);
							}
						} else {
							return done(null, false);
						}
					});
				}
			)
		)
	}
}