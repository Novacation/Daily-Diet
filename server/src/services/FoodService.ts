import { IFood } from '../interfaces/IFood'
import { ServiceResponse } from '../model/ServiceResponse'
import { Food } from '../database/dbmodels/Food'
import { User } from '../database/dbmodels/User'

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
    id: number,
    name: string,
    description: string,
    isHealthy: boolean,
    date: Date
  ): Promise<ServiceResponse<Food>> {
    const serviceResponse = new ServiceResponse<Food>()

    try {
      const hasFood = await Food.findByPk(id)
      if (!hasFood) throw new Error()

      hasFood.setDataValue('name', name ?? hasFood.getDataValue('name'))
      hasFood.setDataValue(
        'description',
        description ?? hasFood.getDataValue('description')
      )
      hasFood.setDataValue(
        'isHealthy',
        isHealthy ?? hasFood.getDataValue('isHealthy')
      )

      if (typeof date === typeof Date) {
        hasFood.setDataValue('date', date ?? hasFood.getDataValue('date'))
      }

      await hasFood.save()

      serviceResponse.Data = hasFood
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao atualizar refeição'
    }

    return serviceResponse
  }

  public async deleteFood(id: number): Promise<ServiceResponse<Food>> {
    const serviceResponse = new ServiceResponse<Food>()

    try {
      const foodByPk = await Food.findByPk(id)

      if (!foodByPk) throw new Error()

      serviceResponse.Data = foodByPk

      await foodByPk.destroy({ force: true })
    } catch (e) {
      console.error(e)
      serviceResponse.Success = false
      serviceResponse.Message = 'Falha ao deletar refeição'
    }

    return serviceResponse
  }
}
