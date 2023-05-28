import { Request, Response, Router } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
  private _router = Router()
  private _userService: UserService = new UserService()

  constructor() {
    this.initRoutes()
  }

  private initRoutes(): void {
    this._router.post('/create', async (req: Request, res: Response) => {
      const { name } = req.body

      const { Success, ResponseObject } = await this._userService.createUser(
        name
      )

      res.status(Success ? 200 : 404).json(ResponseObject)
    })

    this._router.get('/foods/:userId', async (req: Request, res: Response) => {
      const { userId } = req.params

      const { Success, ResponseObject } = await this._userService.listUserFoods(
        parseInt(userId)
      )

      res.status(Success ? 200 : 404).json(ResponseObject)
    })

    this._router.get(
      '/:userId/food/:foodId',
      async (req: Request, res: Response) => {
        const { userId, foodId } = req.params

        const { Success, ResponseObject } = await this._userService.getUserFood(
          parseInt(userId),
          parseInt(foodId)
        )

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )

    this._router.get(
      '/:userId/foods-quantity',
      async (req: Request, res: Response) => {
        const { userId } = req.params

        const { Success, ResponseObject } =
          await this._userService.getUserFoodsQuantity(parseInt(userId))

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )

    this._router.get(
      '/:userId/healthy-foods-quantity',
      async (req: Request, res: Response) => {
        const { userId } = req.params

        const { Success, ResponseObject } =
          await this._userService.getUserHealthyFoodsQuantity(parseInt(userId))

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )

    this._router.get(
      '/:userId/unhealthy-foods-quantity',
      async (req: Request, res: Response) => {
        const { userId } = req.params

        const { Success, ResponseObject } =
          await this._userService.getUserUnhealthyFoodsQuantity(
            parseInt(userId)
          )

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )

    this._router.get(
      '/:userId/diet-best-streak',
      async (req: Request, res: Response) => {
        const { userId } = req.params

        const { Success, ResponseObject } =
          await this._userService.getDietBestStreak(parseInt(userId))

        res.status(Success ? 200 : 404).json(ResponseObject)
      }
    )
  }

  public getRouter(): Router {
    return this._router
  }
}
