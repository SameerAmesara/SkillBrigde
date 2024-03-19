import UserModel from '../models/user'
import { User, NewUser } from '../types'
import { v4 as uuidv4 } from 'uuid';

const getAll = async (): Promise<Array<User>> => {
    return await UserModel.find({});
}

const addUser = async (entry: NewUser): Promise<User> => {
    const newUserEntry = {
        id: uuidv4(),
        ...entry
    };
    const user = new UserModel(newUserEntry)
    await user.save()
    return user;
};

export default {
    getAll,
    addUser
}