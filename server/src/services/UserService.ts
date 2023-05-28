import { IUser } from '../interfaces/IUser'
import { ServiceResponse } from '../model/ServiceResponse'
import { User } from '../database/dbmodels/User'
import { connection } from '../database/connection'
import { Food } from '../database/dbmodels/Food'

export class UserService implements IUser {
  public async createUser(name: string): Promise<ServiceResponse<User>> {
    const serviceResponse = new ServiceResponse<User>()

    try {
      serviceResponse.Data = await User.create({ name }, { raw: false })
    } catch (e) {
      console.error(e)

      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao criar usuário'
    }

    return serviceResponse
  }

  public async listUserFoods(userId: number): Promise<ServiceResponse<Food[]>> {
    const serviceResponse = new ServiceResponse<Food[]>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      serviceResponse.Data = await Food.findAll({
        where: { UserId: userId }
      })
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao retornar refeições'
    }

    return serviceResponse
  }

  public async getUserFood(
    userId: number,
    foodId: number
  ): Promise<ServiceResponse<Food>> {
    const serviceResponse = new ServiceResponse<Food>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      const foodByPk = await Food.findByPk(foodId)

      if (!foodByPk || foodByPk.getDataValue('UserId') !== userId)
        throw new Error()

      serviceResponse.Data = foodByPk
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao retornar refeições'
    }

    return serviceResponse
  }

  public async getUserFoodsQuantity(
    userId: number
  ): Promise<ServiceResponse<number>> {
    const serviceResponse = new ServiceResponse<number>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      serviceResponse.Data = (
        await Food.findAll({ where: { UserId: userId } })
      ).length
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao retornar refeições'
    }

    return serviceResponse
  }

  public async getUserHealthyFoodsQuantity(
    userId: number
  ): Promise<ServiceResponse<number>> {
    const serviceResponse = new ServiceResponse<number>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      serviceResponse.Data = (
        await Food.findAll({ where: { UserId: userId, isHealthy: true } })
      ).length
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao retornar refeições'
    }

    return serviceResponse
  }

  public async getUserUnhealthyFoodsQuantity(
    userId: number
  ): Promise<ServiceResponse<number>> {
    const serviceResponse = new ServiceResponse<number>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      serviceResponse.Data = (
        await Food.findAll({ where: { UserId: userId, isHealthy: false } })
      ).length
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao retornar refeições'
    }

    return serviceResponse
  }

  public async getDietBestStreak(
    userId: number
  ): Promise<ServiceResponse<number>> {
    const serviceResponse = new ServiceResponse<number>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      const foods: Food[] = await Food.findAll({
        where: { UserId: userId },
        order: [['createdAt', 'DESC']]
      })

      let bestStreak: number[] = [0, 0]

      foods.forEach((food: Food) => {
        if (food.getDataValue('isHealthy') === true) {
          ++bestStreak[1]
        } else {
          bestStreak[1] > bestStreak[0] ? (bestStreak[0] = bestStreak[1]) : ''
          bestStreak[1] = 0
        }
      })

      serviceResponse.Data =
        bestStreak[1] >= bestStreak[0] ? bestStreak[1] : bestStreak[0]
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao retornar refeições'
    }

    return serviceResponse
  }
}
