require('dotenv').config()

import { Sequelize, DataTypes } from 'sequelize'
import { MeetingModel } from './meeting'
import { PresenceModel } from './meetingUser'

const sequelize = new Sequelize(process.env.DATABASE_URL || '', { dialect: 'mysql' })

export const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'user' })

