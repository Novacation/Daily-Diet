import { Food } from '../database/dbmodels/Food'

export const IsFoodOwner = async (
  userId: number,
  foodId: number
): Promise<boolean> => {
  let result: boolean = false
  try {
    const foodByUserId = await Food.findOne({
      where: {
        id: foodId,
        UserId: userId
      }
    })

    result = !!foodByUserId
  } catch (e) {
    console.log(e)
  }
  return result
}
