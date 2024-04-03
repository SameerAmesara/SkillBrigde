import UserDetailsModel from "../models/userDetails";
import { UserDetails, NewUser } from "../types";
import { createStripeCustomer } from "../utils/stripe";

const getAllUsers = async (): Promise<UserDetails[]> => {
    try {
        return await UserDetailsModel.find({});
    } catch (error: unknown) {
        throw new Error("Unable to fetch users");
    }
};

const getUserByUid = async (uid: string): Promise<UserDetails | null> => {
    try {
        const response = await UserDetailsModel.findOne({ uid });
        return response;
    } catch (error: unknown) {
        throw new Error("Unable to fetch user");
    }
};

const addUser = async (uid: string, newUser: NewUser): Promise<UserDetails> => {
    try {
        const existingUserByEmail = await UserDetailsModel.findOne({
            email: newUser.email,
        });
        if (existingUserByEmail) {
            throw new Error("User with this email already exists");
        }
        const userDetailsWithUid = {
            ...newUser,
            uid: uid,
        };
        const userDetails = new UserDetailsModel(userDetailsWithUid);
        await userDetails.validate();
        await userDetails.save();

        return userDetails;
    } catch (error: unknown) {
        if (error instanceof Error && error.name === "ValidationError") {
            throw new Error("Invalid user data");
        } else {
            throw new Error("Unable to add user");
        }
    }
};

const updateUser = async (
    uid: string,
    updatedUserData: Partial<UserDetails>
): Promise<UserDetails | null> => {
    try {
        if (!updatedUserData.email && !updatedUserData.uid) {
            throw new Error("Either 'email' or 'uid' must be provided");
        }

        const existingUser = await UserDetailsModel.findOne({ uid: uid });
        if (!existingUser) {
            throw new Error("User not found");
        }

        Object.assign(existingUser, updatedUserData);

        await existingUser.validate();

        const updatedUser = await existingUser.save();

        return updatedUser;
    } catch (error) {
        console.error(error);
        if (error instanceof Error && error.name === "ValidationError") {
            throw new Error("Invalid user data");
        } else {
            throw new Error("Unable to update user due to internal server error");
        }
    }
};

const deleteUserById = async (_id: string): Promise<void> => {
    try {
        const existingUser = await UserDetailsModel.findOneAndDelete({ _id });
        if (!existingUser) {
            throw new Error("User not found");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const getUserByEmail = async (email: string): Promise<UserDetails | null> => {
    try {
        return await UserDetailsModel.findOne({ email });
    } catch (error: unknown) {
        throw new Error("Unable to fetch user");
    }
};

const fetchUserStripeCustomerId = async (
    uid: string
): Promise<String | null> => {
    try {
        const user = await UserDetailsModel.findOne({ uid });
        if (user?.stripeCustomerId) {
            return user.stripeCustomerId;
        } else {
            if (user) {
                return await createStripeCustomer(user?.email, user?.firstName)
                    .then(async (customer) => {
                        const updatedUser = {
                            uid: user.uid,
                            email: user.email,
                            stripeCustomerId: customer.id,
                        };
                        await updateUser(uid, updatedUser);
                        return customer.id;
                    })
                    .catch(() => {
                        return null;
                    });
            } else {
                return null;
            }
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default {
    getAllUsers,
    getUserByUid,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUserById,
    fetchUserStripeCustomerId,
};
