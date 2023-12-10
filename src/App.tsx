import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'
import { Home, Login } from './pages'
import { Navbar } from './components'
import { AuthClient, OnAuthEventsCallbackFnParams } from './api'
import { useGetAuthSession } from './hooks'
import './App.css'
import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient()


function onAuthEventsCallback({session}: OnAuthEventsCallbackFnParams){
  queryClient.setQueryData(['loginSession'], session)
}

function App() {
  const { currentSession } = useGetAuthSession({ queryClient })

  useEffect(() => {
    const authClient = new AuthClient();

    authClient.subscribeToAuthEvents({onAuthEventsCallbackFn: onAuthEventsCallback})

    return () => authClient.dispose();
  }, [])



  if(!currentSession){
    return (
      <QueryClientProvider client={queryClient}>
      <Theme style={{height: '100%'}} appearance='dark' accentColor='purple'>
        <Navbar/>
        <Login/>
      </Theme>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Theme style={{height: '100%'}} appearance='dark' accentColor='purple'>
        <Navbar />
        <Home/> 
      </Theme>
    </QueryClientProvider>
  )
}

export default App
