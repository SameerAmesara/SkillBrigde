import { Schema, model } from 'mongoose';
import { UserDetails } from '../types';

const userDetailsSchema = new Schema<UserDetails>({
    uid: { type: String },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String}, 
    dob: { type: Date},
    profession: { type: String}, 
    companyName: { type: String}
});

const UserDetailsModel = model<UserDetails>('UserDetails', userDetailsSchema);

export default UserDetailsModel;