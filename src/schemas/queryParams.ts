import { z } from 'zod';
import { defaultPageParams, defaultSortParams } from '../api';

export const searchableColumnNameEnum = z.enum(["availability_zone", "id", "private_ips", "public_ip", "state", "type"])
export const compareableColumnNameEnum = z.enum(["created_at"])

export const searchableFilterOperators = z.enum(["equals", "includes"])
export const comparableFilterOperators = z.enum(["greater", "lesser"])

export const pageParamSchema = z.object({
  page: z.number(),
  itemsPerPage: z.number()
})

export const sortParamSchema = z.object({
  sortColumn: z.union([searchableColumnNameEnum, compareableColumnNameEnum]),
  sortDirection: z.enum(['asc', 'desc'])
})

export const searchableFilterParamSchema = z.object({
  filterColumn: searchableColumnNameEnum,
  filterOperator: searchableFilterOperators,
  filterQuery: z.string(),
})

export const comparableFilterSchema = z.object({
  filterColumn: compareableColumnNameEnum,
  filterOperator: z.union([searchableFilterOperators, comparableFilterOperators]),
  filterQuery: z.string(),
})


export const queryParamsSchema = z.object({
  paging: pageParamSchema.catch(defaultPageParams),
  sort: sortParamSchema.catch(defaultSortParams),
})
