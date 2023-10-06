
import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../db/sequelize.connection'

export const PresenceModel = sequelize.define('presence', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    meetingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'meeting',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { tableName: 'presence' })
