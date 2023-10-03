
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL || '', { dialect: 'mysql' })

export const PresenceModel = sequelize.define('meeting_user', {
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
}, { tableName: 'meeting_user' })
