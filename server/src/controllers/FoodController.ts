import { Request, Response, Router } from 'express'
import { FoodService } from '../services/FoodService'

export class FoodController {
  private _router: Router = Router()
  private _foodService: FoodService = new FoodService()

  constructor() {
    this.initRoutes()
  }

  private initRoutes(): void {
    this._router.post('/create', async (req: Request, res: Response) => {
      const { userId, name, description, isHealthy } = req.body

      const { Success, ResponseObject } = await this._foodService.createFood(
        parseInt(userId),
        name,
        description,
        isHealthy
      )

      res.status(Success ? 200 : 404).json(ResponseObject)
    })

    this._router.patch('/update/:id', async (req: Request, res: Response) => {
      const { id } = req.params
      const { name, description, isHealthy, date } = req.body

      const { Success, ResponseObject } = await this._foodService.updateFood(
        parseInt(id),
        name,
        description,
        isHealthy,
        date
      )

      res.status(Success ? 200 : 404).json(ResponseObject)
    })

    this._router.delete('/delete/:id', async (req: Request, res: Response) => {
      const { id } = req.params

      const { Success, ResponseObject } = await this._foodService.deleteFood(
        parseInt(id)
      )

      res.status(Success ? 200 : 404).json(ResponseObject)
    })
  }

  public getRouter() {
    return this._router
  }
}
