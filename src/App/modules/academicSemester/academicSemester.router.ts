import express from 'express'
import validateRequest from '../../Middleware/validateRequest'
import { academicSemesterController } from './academicSemester.controller'
import { academicSemesterValidation } from './academicSemister.validation'

const router = express.Router()

router
  .route('/create-academic-semester')
  .post(
    validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
    academicSemesterController.academicSemesterCreate,
  )
router
  .route('/get-all-academic-semester')
  .get(academicSemesterController.getAllSemester)

export const academicSemesterRouter = router
