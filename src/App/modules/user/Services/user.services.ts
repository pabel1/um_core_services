import config from '../../../../config'
import { IUser } from '../Interface/user.interface'
import { UserModel } from '../Model/user.model'
import { generateUserID } from '../utils/user.utils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.defaultPass as string
  }

  // generate userID --for first need to get last userID
  const lastUserID = await UserModel.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 1 },
  ])

  const userID = generateUserID(lastUserID[0]?.id)
  console.log(userID)
  const newUser = await UserModel.create({
    id: userID,
    role: user.role,
    password: user.password,
  })

  if (!newUser) {
    // return next('user Create Failed!!')
    throw new Error('user create Failed!!')
  }

  return newUser
}
