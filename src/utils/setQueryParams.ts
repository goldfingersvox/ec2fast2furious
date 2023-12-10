import { QueryParamType } from "../api";
import { getQueryParams } from ".";

export function setQueryParams(updateObj: Partial<QueryParamType>){

  const parsedQueryParams = getQueryParams();

  if(!parsedQueryParams){
    window.location.search = encodeURIComponent(JSON.stringify(updateObj))
  }

  window.location.search = encodeURIComponent(JSON.stringify({...parsedQueryParams, ...updateObj}))
}