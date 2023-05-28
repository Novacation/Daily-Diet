import express, { Express } from 'express'
import { json, urlencoded } from 'body-parser'
import { connection } from './database/connection'
import { UserController } from './controllers/UserController'
import { FoodController } from './controllers/FoodController'
import { User } from './database/dbmodels/User'

const app: Express = express()

app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/users', new UserController().getRouter())
app.use('/food', new FoodController().getRouter())

const port: number = 8000

connection
  .authenticate()
  .then(async () => {
    app.listen(port, async (): Promise<void> => {
      await connection.sync()
    })
  })
  .catch((error): void => {
    console.log(error)
  })
