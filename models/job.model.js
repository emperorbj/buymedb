import mongoose from "mongoose";


const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'company name is required']
    },
    position: {
        type: String,
        required: [true, 'position is required']
    },
    salary: {
        type: String,
        required: [true, 'salary required']
    },
    jobType: {
        type: String,
        enum: {
            values: ['full-time', 'remote', 'hybrid', 'onsite'],
            message: '{VALUE} is not a valid job type'
        }
    },
    requiredSkills: {
        type: [String]
    },
    responsibilities: {
        type: [String]
    },
    whatWeOffer: {
        type: [String]
    },
    yesNoQuestion: [
        {
            question: { type: String },
            answer: {
                type: String, 
                enum: {
                    values: ['yes', 'no', null],
                    message: '{VALUE} is not a valid type'
                }
            }
        }
    ],
    standardQuestions: [
        {
            question: { type: String },
            answer: { type: String }
        }
    ],
    location: {
        type: String
    },
    experienceLevel: {
        type: String,
        enum: {
            values: ['entry-level', 'mid-level', 'senior-level'],
            message: '{VALUE} is not a good type'
        }
    },
    applicationDeadline: {
        type: Date,
        required: [true, 'application deadline is required']
    }
}, { timestamps: true })
export const Jobs = mongoose.model("Jobs", JobSchema)