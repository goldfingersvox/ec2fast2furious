import { Tables } from "./supabase"

export type Ec2InstanceType = Tables<'ec2Instances'>;

export type Ec2InstanceKeyType = keyof Ec2InstanceType;

export type Ec2InstanceComparableKeyType =  Exclude<Ec2InstanceKeyType, "availability_zone" | "id" | "private_ips" | "public_ip" | "state" | "type">

export type Ec2InstanceSearchableKeyType = Exclude<Ec2InstanceKeyType, "created_at">;

export type ComparableColumnFilterOperator = 'greater' | 'lesser'

export type SearchableColumnFilterOperator = 'equals' | 'includes'

export type ColumnFilterOperator = ComparableColumnFilterOperator | SearchableColumnFilterOperator;


export type SortParamType = {
  sortColumn: Ec2InstanceKeyType;
  sortDirection: 'asc' | 'desc'
}

export type PageParamType = {
  page: number;
  itemsPerPage: number;
}

export type QueryParamType = {
  sort?: SortParamType, 
  paging?:  PageParamType
}

export type ColumnFilterConfigType<T extends Ec2InstanceKeyType> = Record<T,{filters: T extends Ec2InstanceComparableKeyType ?  ['equals', 'includes', 'greater', 'lesser'] : ['equals', 'includes'], sortable: boolean }>;
