require('dotenv').config()

import { Sequelize } from 'sequelize'

const { DATABASE_URL, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env

export const sequelize = new Sequelize(DB_NAME, DB_USER, '', {
    username: DB_USER,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
})

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database!');
    } catch (error) {
        console.error('Fail to connect to database', error);
    }
}

//export default connection()