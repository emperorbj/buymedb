import {Jobs} from '../models/job.model.js';
import { StatusCodes } from "http-status-codes"

export const addJobs = async (request, response) => {
    try {
        const jobs = await Jobs.create(request.body)
        return response.status(201).json({ success: true, message: 'job created successfully' , jobs })
    } catch (error) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}


export const getAllJobs = async (request, response) => {
    const { search, company, location, page = 1, limit = 3 } = request.query
    try {
        const queryObject = {}

        if (company) {
            queryObject.company = { $regex: company, $options: 'i' }
        }

        if (location) {
            queryObject.location = { $regex: location, $options: 'i' }
        }

        if (search) {
            queryObject.$or = [
                { company: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
              ];
        }

        
        const skip = (parseInt(page) - 1) * parseInt(limit)


        const jobs = await Jobs.find(queryObject).skip(skip).limit(parseInt(limit)).sort('createdAt');

        if (jobs.length === 0) {
            return response.status(404).json('job cannot be found')
        }

        const pages = parseInt(page)

        return response.status(200).json({ success: true, currentPage: pages, jobs: jobs })
    } catch (error) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}



export const getSingleJob = async (request, response) => {
    const id = request.params.id
    try {
        const job = await Jobs.findById(id)
        if (!job) {
            return response.status(404).json('job cannot be found or is not available again')
        }

        return response.status(200).json({ success: true, job })
    } catch (error) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}



export const updateJobs = async (request, response) => {
    const id = request.params.id
    try {
                const job = await Jobs.findByIdAndUpdate(id, { $set: request.body }, { new: true })
        
                if (!job) {
                    return response.status(404).json('job cannot be found')
                }
        
                // const updatedJob = await Jobs.findById(id)
                return response.status(200).json({ success: true, job })
        
            } catch (error) {
                response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
            }
}


export const deleteJob = async (request, response) => {
    const id = request.params.id
    try {
        const jobs = await Jobs.findByIdAndDelete(id)
        if (!jobs) {
            return response.status(404).json('unvailable for deletion')
        }
        return response.status(201).json('job deleted successfully')
    } catch (error) {
        response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}








