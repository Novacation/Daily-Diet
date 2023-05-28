import { Sequelize, QueryTypes } from 'sequelize'
import { config } from './config'

const sequelize: Sequelize = new Sequelize(config)

export { sequelize as connection, QueryTypes as types }
