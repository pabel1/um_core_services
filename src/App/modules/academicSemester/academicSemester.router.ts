import express from 'express'

const router = express.Router()

// router
//   .route('/create-academic-semester')
//   .post(
//     validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
//     academicSemesterController.academicSemesterCreate,
//   )
// router
//   .route('/get-all-academic-semester')
//   .get(academicSemesterController.getAllSemester)

export const academicSemesterRouter = router
