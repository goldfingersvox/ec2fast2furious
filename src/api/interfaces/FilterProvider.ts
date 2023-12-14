import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { FilterParamType } from '../types'

interface FilterProviderParams {
  filterParams: FilterParamType;
}
 
export class FilterProvider{
  filterParams: FilterParamType;

  constructor({ filterParams }: FilterProviderParams){
    this.filterParams = filterParams;
  }

  //TODO: figure out how to properly type this without any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getFilter(query: PostgrestFilterBuilder<any, any, any[], unknown, unknown>){
    const { filterColumn, filterQuery, filterOperator } = this.filterParams;

    //TODO: rewrite this to object literal notation
    switch (filterOperator) {
      case 'equals':
        return query.eq(filterColumn, filterQuery)
        
      case 'includes':
        return query.like(filterColumn, filterQuery)

      case 'greater':
        return query.gt(filterColumn, filterQuery)

      case 'lesser':
        return query.lt(filterColumn, filterQuery)
    }
    
  }
  
}
