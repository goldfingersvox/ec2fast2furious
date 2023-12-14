import { Ec2InstanceKeyType } from "./supabase"

export type FilterParamType ={
  filterColumn: Ec2InstanceKeyType;
  filterOperator: 'equals' | 'includes' |'greater' | 'lesser';
  filterQuery: string;
}

export type SortParamType = {
  sortColumn: Ec2InstanceKeyType;
  sortDirection: 'asc' | 'desc'
}

export type PageParamType = {
  page: number;
  itemsPerPage: number;
}

export type QueryParamType = {
  filter: FilterParamType,  
  sort: SortParamType, 
  paging:  PageParamType
}