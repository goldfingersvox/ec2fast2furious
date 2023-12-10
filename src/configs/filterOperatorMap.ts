import { ColumnFilterOperator } from "../api"

export const filterOperatorMap: Record<ColumnFilterOperator, '>' | '<' | '=' | ':'> = {
  greater: '>',
  lesser: '<',
  equals: '=',
  includes: ':',
}