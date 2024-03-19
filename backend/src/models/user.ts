import { Schema, model } from 'mongoose'
import { User } from '../types'

const userSchema = new Schema<User>({
    id: { type: String, required: true },
    name: { type: String, required: true },
});

const UserModel = model<User>('User', userSchema)

export default UserModel