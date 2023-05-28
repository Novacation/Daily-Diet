import { Options } from 'sequelize'
import path from 'path'

export const config: Options = {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'dietDB.sqlite')
}