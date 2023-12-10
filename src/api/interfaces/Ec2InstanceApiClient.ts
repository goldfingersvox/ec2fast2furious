import { SortParamType, PageParamType, Ec2InstanceType } from '../types'
import { supabaseClient } from './supabaseClient'

export interface Ec2InstanceApiClientParams {
  sortParams?: SortParamType;
  pageParams?: PageParamType;
}

type Ec2InstancesResponse = {
  data: Ec2InstanceType[];
  count: number | null;
}

export const defaultSortParams = {sortColumn: 'id' as const, sortDirection: 'asc' as const};
export const defaultPageParams = { page: 0, itemsPerPage: 10 }

export class Ec2InstanceApiClient{
  private sortParams: SortParamType;
  private pageParams: PageParamType;

  constructor({
    sortParams = defaultSortParams, 
    pageParams = defaultPageParams, 
  }: Ec2InstanceApiClientParams){

    this.sortParams = sortParams;
    this.pageParams = pageParams;

  }

  public async fetchEc2Instances(): Promise<Ec2InstancesResponse>{
    const { sortColumn, sortDirection } = this.sortParams;
    const { page, itemsPerPage } = this.pageParams;

    const {count, data, error} = await supabaseClient
      .from('ec2Instances')
      .select('*', { count: 'estimated' })
      .order(sortColumn as string, { ascending: sortDirection === 'asc' })
      .range(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

    if(error){
      throw new Error(error.message);
    }

    return {count, data};
  }
}