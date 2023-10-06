require('dotenv').config()

import { Sequelize, DataTypes } from 'sequelize'
import { MeetingModel } from './meeting'
import { PresenceModel } from './presence'
import { sequelize } from '../db/sequelize.connection'

export const UserModel = sequelize.define('user', {
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

