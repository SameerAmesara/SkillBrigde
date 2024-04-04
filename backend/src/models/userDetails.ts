/*
This file creates backend models for UserDetails
Author: Drashti Navadiya
Date modified: 04-04-2024
*/
import { Schema, model } from "mongoose";
import { UserDetails } from "../types";

const userDetailsSchema = new Schema<UserDetails>({
  uid: { type: String },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, },
  image: { type: String },
  dob: { type: Date },
  profession: { type: String },
  companyName: { type: String },
  stripeCustomerId: { type: String },
});

const UserDetailsModel = model<UserDetails>("UserDetails", userDetailsSchema);

export default UserDetailsModel;
