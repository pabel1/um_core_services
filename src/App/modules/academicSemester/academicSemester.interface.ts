export type IAcademicSemester = {
  title: string
  year: string
  code: '01' | '02' | '03'
  startMonth: string
  endMonth: string
}

export type IAcademicSemesterFilters = {
  searchTerm?: string
}
