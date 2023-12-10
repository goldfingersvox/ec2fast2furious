import { FormEvent, useState } from 'react';
import { styled } from '@stitches/react';
import { useQuery } from '@tanstack/react-query';
import { Card, TextField, Button, Text } from '@radix-ui/themes';
import { Heading } from '../components';
import { AuthClient } from '../api';
import { Layout } from './Styles';

const LoginLayout = styled(Layout, {
  backgroundImage: 'url("https://kcycykiximadrkttpcif.supabase.co/storage/v1/object/public/images/iStock-1365178013.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
})

const LoginCardContent = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  padding: '1rem',

  '@media (max-width: 1024px)': {
    padding: '1rem'
  },

  '@media (max-width: 820px)': {
    flexDirection: 'column',
    gap: '2rem',
  },

  '@media (max-width: 480px)': {
    padding: '0.5rem'
  }
})

const StyledForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '17rem',
})

const StyledInput = styled(TextField.Input, {
  width: '100%',
})

const StyledSubmitInput = styled('input', {
  backgroundColor: '#8d4ec6',
  borderStyle: 'none',
})

const StyledHero = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})


export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { refetch, isPending, } = useQuery({
    queryKey: ['loginSession'], 
    enabled: false, 
    queryFn: async () => {
      const authClient = new AuthClient()
    
      if(!email || !password){
        return null;
      }

      const { session } = await authClient.loginUser({email, password})

      return session

  }})

  function onLoginClick(e: FormEvent){
    e.preventDefault()
    refetch();
  }
  

  return (
    <LoginLayout>
      <Card asChild style={{width: '100%'}}>
        <main>
          <LoginCardContent>
            <StyledHero>
              <Heading level={1}>EC2Fast2Furious</Heading>
              <Text>The fastest EC2 Dashboard on the market</Text>
            </StyledHero>
            <StyledForm onSubmit={onLoginClick}>
              <StyledInput name="email" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
              <StyledInput name="password" type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              <Button asChild><StyledSubmitInput disabled={isPending} type='submit' value="Log in"></StyledSubmitInput></Button>
            </StyledForm>
          </LoginCardContent>
        </main>
      </Card>
    </LoginLayout>
  )
}
