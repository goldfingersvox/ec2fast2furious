import { Box, Button } from '@radix-ui/themes'
import { styled } from '@stitches/react'
import { useQuery } from '@tanstack/react-query'
import { Heading } from '../components'
import { AuthClient } from '../api'

const NavbarContainer = styled('nav', {
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'min-content auto max-content',
  gridTemplateAreas: '"logo . actions"',
  padding: '1rem',
  backgroundColor: 'var(--purple-surface)',
  boxSizing: 'border-box'
})

const HeadingContainer = styled(Box, {
  gridArea: 'logo'
})

const ActionContainer = styled(Box, {
  gridArea: 'actions'
})

export function Navbar(){
  const authClient = new AuthClient();

  const { data: session } = useQuery({
    queryKey: ['loginSession'],
    queryFn: async () => {
      return await authClient.getSession();
    }
  })

  const query = useQuery({
    queryKey: ['loginSession'],
    enabled: false,
    queryFn: async () => {

      authClient.logoutUser()

      return null
    }
  })


  return (
    <NavbarContainer>
      <HeadingContainer asChild>
        <Heading level={3}>EC2Fast2Furious</Heading>
      </HeadingContainer>
      <ActionContainer>
        {session && <Button onClick={() => query.refetch()}>Log out</Button>}
      </ActionContainer>
    </NavbarContainer>
  )
}