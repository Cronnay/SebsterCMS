import Sequelize from 'sequelize';
import { Config } from './../config';
const { dbName, dbUser, dbPass } = Config;

const seq = new Sequelize(dbName, dbUser, dbPass, {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});


export const Usermodel = seq.define('User', {
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	name: {
		allowNull: true,
		defaultValue: null,
		type: Sequelize.STRING
	},
	role: {
		type: Sequelize.STRING,
		defaultValue: 'superuser',
	},
});