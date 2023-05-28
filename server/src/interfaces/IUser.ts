import { ServiceResponse } from '../model/ServiceResponse'
import { User } from '../database/dbmodels/User'
import { Food } from '../database/dbmodels/Food'

export interface IUser {
  createUser(name: string): Promise<ServiceResponse<User>>

  listUserFoods(userId: number): Promise<ServiceResponse<Food[]>>

  getUserFood(userId: number, foodId: number): Promise<ServiceResponse<Food>>

  getUserFoodsQuantity(userId: number): Promise<ServiceResponse<number>>

  getUserHealthyFoodsQuantity(userId: number): Promise<ServiceResponse<number>>

  getUserUnhealthyFoodsQuantity(
    userId: number
  ): Promise<ServiceResponse<number>>

  getDietBestStreak(userId: number): Promise<ServiceResponse<number>>
}
