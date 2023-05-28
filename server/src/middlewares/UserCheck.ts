import { NextFunction, Request, Response } from 'express'
import { ServiceResponse } from '../model/ServiceResponse'
import { User } from '../database/dbmodels/User'

export const UserCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const serviceResponse = new ServiceResponse<null>()
  const { userId } = req.body

  try {
    const userByPk = await User.findByPk(parseInt(userId))

    if (!userByPk) throw new Error()

    next()
  } catch (e) {
    console.error(e)
    serviceResponse.Success = false
    serviceResponse.Message = `Falha ao encontrar usuário com id: ${userId}`
    res.status(404).json(serviceResponse.ResponseObject)
  }
}
