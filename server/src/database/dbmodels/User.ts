import { connection, types } from '../connection'
import { DataTypes, Model } from 'sequelize'

export class User extends Model {}

User.init(
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
    }
  },
  {
    sequelize: connection,
    modelName: 'User',
    createdAt: true,
    updatedAt: false
  }
)
