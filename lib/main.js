import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookie from 'cookie-session';
import * as path from 'path';

import { router as AuthRoutes } from './routes/auth';
import { router as PageRoutes } from './routes/pages';

import PassportSetup from './config/passport';
new PassportSetup();

class App {
	constructor() {
		this.app = express();
		this.initializeApp();
	}

	initializeApp () {
		this.app.use(cors());
		this.app.use(bodyParser.json()); 
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(morgan('tiny'));

		this.app.use(cookie({
			name: 'session',
			maxAge: 30 * 24 * 60 * 60 * 1000,
			keys: ['secretsecretsecret']
		}));

		this.app.use(passport.initialize());
		this.app.use(passport.session());

		this.setRoutes();
	}

	setRoutes() {
		this.app.use('/media', express.static(path.join(__dirname, 'images')));
		this.app.use('/auth', AuthRoutes);
		this.app.use('/page', PageRoutes);
	}

	listen (port = 3000){
		this.app.listen(port, _ => {
			console.log("Server started");
		});
	}
}

export default App;