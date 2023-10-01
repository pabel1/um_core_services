import express from 'express'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.router'

const router = express.Router()

const allRoutes = [
  {
    path: '/academic-semister',
    route: academicSemesterRouter,
  },
]

// use all routes dynamically
allRoutes.forEach(route => router.use(route.path, route.route))
export default router
