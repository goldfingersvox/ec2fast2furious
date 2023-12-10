import { useQuery, QueryClient} from '@tanstack/react-query'
import { AuthClient } from '../api'

interface Props {
  queryClient?: QueryClient;
}

export function useGetAuthSession({ queryClient}: Props){
  const { isPending, isError, data: currentSession, error } = useQuery({
    queryKey: ['loginSession'],
    queryFn: async () => {
      const authClient = new AuthClient()
      const returnedSession = await authClient.getSession()

      authClient.dispose();

      return returnedSession
    },
  }, queryClient)

  return { isPending, isError, currentSession, error }

}