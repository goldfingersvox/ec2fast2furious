import { useQuery} from '@tanstack/react-query'
import { Ec2InstanceApiClient, columnFilterConfig } from '../api'
import { getQueryParams } from '../utils'

export function useFetchEc2Instances() {
  const { data, isLoading, error } = useQuery({queryKey: ['ec2Instances', location.search], queryFn: async () => {
  const parsedQueryParams = getQueryParams();

  if(!parsedQueryParams){
      //in case the query param string is malformed or if there isn't one, fetch with default parameters
    const ec2InstanceApiClient = new Ec2InstanceApiClient({})
    const { count, data } = await ec2InstanceApiClient.fetchEc2Instances()
    return {count, data, columnFilterConfig}
  }

  const { paging, sort } = parsedQueryParams

    const ec2InstanceApiClient = new Ec2InstanceApiClient({sortParams: sort, pageParams: paging})
    const { count, data } = await ec2InstanceApiClient.fetchEc2Instances()
    return {count, data, columnFilterConfig}
  }
  
})

  return { data, isLoading, error }

}