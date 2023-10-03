require('dotenv').config()

import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL || '', { dialect: 'mysql' })

export const MeetingModel = sequelize.define('meeting', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    meetingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comments: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { tableName: 'meeting' })
