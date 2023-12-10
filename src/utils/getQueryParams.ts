import { queryParamsSchema } from "../schemas";

export function getQueryParams(){
  const queryString = location.search.slice(1)
  const params = queryString ? JSON.parse(decodeURIComponent(queryString)) : {};

  const result = queryParamsSchema.safeParse(params)

  if(!result.success){
    return null;
  }

  return result.data;
}