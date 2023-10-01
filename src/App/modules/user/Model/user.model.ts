import { Model, Schema, model } from 'mongoose'
import { IUser } from '../Interface/user.interface'

//! Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const User = model<IUser, UserModel>('User', userSchema)
