import { SortParamType, PageParamType } from '../types'
import { FilterProvider } from './FilterProvider'
import { supabaseClient } from './supabaseClient'

interface Ec2InstanceApiClientParams {
  sortParams: SortParamType,
  pageParams: PageParamType,
  filterProvider?: FilterProvider,
}

export class Ec2InstanceApiClient{
  sortParams: SortParamType;
  pageParams: PageParamType;
  filterProvider?: FilterProvider;

  constructor({sortParams, pageParams, filterProvider}: Ec2InstanceApiClientParams){
    this.sortParams = sortParams;
    this.pageParams = pageParams;

    if(filterProvider){
      this.filterProvider = filterProvider;
    }
  }

  public async fetchEc2Instances(){
    const queryBase = supabaseClient.from('ec2Instances').select('*')
    const query = this.filterProvider ? this.filterProvider.getFilter(queryBase) : queryBase;
    const { sortColumn, sortDirection } = this.sortParams;
    const { page, itemsPerPage } = this.pageParams;

    const { data, error } = await query
      .order(sortColumn, { ascending: sortDirection === 'asc' })
      .range(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

    if(error){
      throw new Error(error.message);
    }

    return data;
  }
}