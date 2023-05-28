import { NextFunction, Request, Response } from 'express'
import { ServiceResponse } from '../model/ServiceResponse'
import { Food } from '../database/dbmodels/Food'

export const FoodCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const serviceResponse = new ServiceResponse<null>()
  const { foodId } = req.body
  try {
    const foodByPk = await Food.findByPk(parseInt(foodId))

    if (!foodByPk) throw new Error()

    res.locals.foodByPk = foodByPk

    next()
  } catch (e) {
    console.error(e)
    serviceResponse.Success = false
    serviceResponse.Message = `Falha ao encontrar refeição com id: ${foodId}`
    res.status(404).json(serviceResponse.ResponseObject)
  }
}
