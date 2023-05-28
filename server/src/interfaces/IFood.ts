import { ServiceResponse } from '../model/ServiceResponse'
import { Food } from '../database/dbmodels/Food'

export interface IFood {
  createFood(
    userId: number,
    name: string,
    description: string,
    isHealthy: boolean
  ): Promise<ServiceResponse<Food>>

  updateFood(
    userId: number,
    foodByPk: Food,
    name: string,
    description: string,
    isHealthy: boolean,
    date: Date
  ): Promise<ServiceResponse<Food>>

  deleteFood(userId: number, foodByPk: Food): Promise<ServiceResponse<Food>>
}
