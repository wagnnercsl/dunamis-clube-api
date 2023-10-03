require('dotenv').config()

import mysql from 'mysql2/promise'
const { DATABASE_URL, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env

const connection = async () => {
    // const connection = await mysql.createConnection(DATABASE_URL || '')
    try {
        console.warn([DB_NAME, DB_USER, DB_HOST, DB_PORT])

        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            database: DB_NAME,
            port: DB_PORT
        } || '')
        //console.warn(con)
        return connection
    } catch (err: any) {
        console.error('ERROR MESSAGE' + err.message)
    }
}

export default connection()
