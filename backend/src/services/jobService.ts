import  JobModel  from '../models/job'
import { Job, NewJobData } from '../types'
import { v4 as uuidv4 } from 'uuid';

const getAll = async (): Promise<Array<Job>> => {
    return await JobModel.find({});
}

const getJob = async (jobId: string): Promise<Job | null> => {
    return await JobModel.findOne({id: jobId}).exec()
}

const addJob = async (entry: NewJobData): Promise<Job> => {
    const newUserEntry = {
        id: uuidv4(),
        ...entry
    };
    const user = new JobModel(newUserEntry)
    await user.save()
    return user
};

export default {
    getAll,
    getJob,
    addJob
}
