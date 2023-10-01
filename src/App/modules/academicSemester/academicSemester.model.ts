import httpStatus from 'http-status'
import { Model, Schema, model } from 'mongoose'
import ErrorHandler from '../../../Errorhandler/errorHandler'
import { IAcademicSemester } from './academicSemester.interface'

//? Create a new Model type that knows about IUserMethods...
type AcademicSemesterModel = Model<IAcademicSemester, object>

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,

      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// if already exist then some validtion added
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ErrorHandler(
      `"${this.title}"- this semester is already created for this ${this.year}`,
      httpStatus.CONFLICT,
    )
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academic_Semester',
  academicSemesterSchema,
)
