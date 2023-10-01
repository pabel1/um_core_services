// paginationOptions.ts
export type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc' | -1 | 1
}
