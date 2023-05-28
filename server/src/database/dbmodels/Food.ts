import { connection, types } from '../connection'
import { DataTypes, Model } from 'sequelize'
import { User } from './User'

export class Food extends Model {}

Food.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date()
    },

    isHealthy: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize: connection,
    modelName: 'Food'
  }
)

Food.belongsTo(User, { foreignKey: 'UserId' })
