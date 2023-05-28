import { IFood } from '../interfaces/IFood'
import { ServiceResponse } from '../model/ServiceResponse'
import { Food } from '../database/dbmodels/Food'
import { User } from '../database/dbmodels/User'
import { IsFoodOwner } from '../helper/IsFoodOwner'

export class FoodService implements IFood {
  public async createFood(
    userId: number,
    name: string,
    description: string,
    isHealthy: boolean
  ): Promise<ServiceResponse<Food>> {
    const serviceResponse = new ServiceResponse<Food>()

    try {
      const userByPk = await User.findByPk(userId)

      if (!userByPk) throw new Error()

      serviceResponse.Data = await Food.create({
        UserId: userId,
        name,
        description,
        isHealthy,
        date: new Date()
      })
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao registrar refeição'
    }

    return serviceResponse
  }

  public async updateFood(
    userId: number,
    foodByPk: Food,
    name: string,
    description: string,
    isHealthy: boolean,
    date: Date
  ): Promise<ServiceResponse<Food>> {
    const serviceResponse = new ServiceResponse<Food>()

    try {
      const result = await IsFoodOwner(userId, foodByPk.getDataValue('id'))

      if (!result) throw new Error()

      foodByPk.setDataValue('name', name ?? foodByPk.getDataValue('name'))

      foodByPk.setDataValue(
        'description',
        description ?? foodByPk.getDataValue('description')
      )

      foodByPk.setDataValue(
        'isHealthy',
        isHealthy ?? foodByPk.getDataValue('isHealthy')
      )

      if (typeof date === typeof Date) {
        foodByPk.setDataValue('date', date ?? foodByPk.getDataValue('date'))
      }

      await foodByPk.save()

      serviceResponse.Data = foodByPk
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = `Falha ao atualizar: refeição não registrada pelo usuário: ${userId}`
    }

    return serviceResponse
  }

  public async deleteFood(
    userId: number,
    foodByPk: Food
  ): Promise<ServiceResponse<Food>> {
    const serviceResponse = new ServiceResponse<Food>()

    try {
      const result = await IsFoodOwner(userId, foodByPk.getDataValue('id'))

      if (!result) throw new Error()

      serviceResponse.Data = foodByPk

      await foodByPk.destroy({ force: true })
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message =
        'Falha ao deletar: refeição não registrada pelo usuário'
    }

    return serviceResponse
  }
}
