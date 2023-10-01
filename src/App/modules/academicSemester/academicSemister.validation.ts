import { z } from 'zod'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required!!',
    }),
    year: z.string({
      required_error: 'year is Required!!',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required and must follow the enum value ',
    }),
    startMonth: z.string({
      required_error: 'startMonth is Required!!',
    }),
    endMonth: z.string({
      required_error: 'endMonth is Required!!',
    }),
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
}
