/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ErrorHandler from '../../../Errorhandler/errorHandler'
import { IGenericResponse } from '../../../interfaces/generic.response'
import { IPaginationOptions } from './../../../interfaces/paginationOptions'

import { SortOrder } from 'mongoose'
import { ConsoleLog } from '../../shared/consoleLogForDev'
import { paginationHelpers } from '../../shared/paginationHelper'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import {
  academicSemesterSearchableFields,
  asTitleCodeConstant,
} from './as.constant'

const createSemesterToDB = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (asTitleCodeConstant[payload.title] !== payload.code) {
    throw new ErrorHandler('Invalid Semester and Code', httpStatus.BAD_REQUEST)
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesterFromDB = async (
  queryOptions: IPaginationOptions,
  filters: IAcademicSemesterFilters,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const pipeline: any[] = []
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(queryOptions)

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  //? Search needs $or for searching in specified fields
  if (searchTerm) {
    // searchTerm = searchTerm?.replace(/\\/g, "");
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  ConsoleLog(andConditions)
  // ?filtering added
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  ConsoleLog(andConditions[0])

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  ConsoleLog(sortBy)
  ConsoleLog(typeof sortOrder)

  // ? dynamic sorting

  if (skip !== undefined) {
    pipeline.push({ $skip: skip })
  }

  if (limit !== undefined) {
    pipeline.push({ $limit: limit })
  }
  if (sortBy && sortOrder) {
    const keyValue: { [key: string]: SortOrder } = {}
    keyValue[sortBy] = sortOrder
    console.log(keyValue)
    pipeline.push({
      $sort: {
        [sortBy]: sortOrder === ('asc' || '-1') ? 1 : -1,
      },
    })
    // pipeline.push({ $sort: { sortBy: sortOrder } })
  }

  console.log(pipeline)
  const result = await AcademicSemester.aggregate(pipeline)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterServices = {
  createSemesterToDB,
  getAllSemesterFromDB,
}
