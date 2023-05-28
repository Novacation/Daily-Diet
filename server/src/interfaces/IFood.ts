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
    id: number,
    name: string,
    description: string,
    isHealthy: boolean,
    date: Date
  ): Promise<ServiceResponse<Food>>

  deleteFood(id: number): Promise<ServiceResponse<Food>>
}
