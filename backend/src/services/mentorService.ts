import MentorModel from "../models/mentor";
import { Mentor, NewMentor } from "../types";
import { v4 as uuidv4 } from "uuid";

const getAll = async (): Promise<Array<Mentor>> => {
  return await MentorModel.find({});
};

const addMentor = async (entry: NewMentor): Promise<Mentor> => {
  const newUserEntry = {
    id: uuidv4(),
    ...entry,
  };
  const mentor = new MentorModel(newUserEntry);
  await mentor.save();
  return mentor;
};

const getMentorById = async (id: string): Promise<Mentor | null> => {
  return await MentorModel.findOne({ id: id });
};

export default {
  getAll,
  addMentor,
  getMentorById,
};
