import express from 'express';
import { addJobs, deleteJob, getAllJobs, getSingleJob, updateJobs } from '../controller/jobController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();


router.post('/',verifyToken,addJobs)
router.get('/',getAllJobs)
router.get('/:id',getSingleJob)
router.put('/:id',updateJobs)
router.delete('/:id',deleteJob)

export default router;