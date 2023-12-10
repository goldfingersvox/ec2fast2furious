import { Session, SupabaseClient, Subscription, User } from "@supabase/supabase-js"
import { supabaseClient } from "./supabaseClient"

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface OnAuthEventsCallbackFnParams {
  session: Session | null;
}

interface SubscribeToAuthEventsParams {
  onAuthEventsCallbackFn: (params: OnAuthEventsCallbackFnParams) => void;
}


export class AuthClient {
  supabaseClient: SupabaseClient;
  session: Session | null = null;
  subscription?: Subscription;
  
  constructor(){
    this.supabaseClient = supabaseClient;
  }

  public async getSession(): Promise<Session | null>{
    if(this.session){
      return this.session
    }

    const { data: { session }, error } = await supabaseClient.auth.getSession();

    if (error){
      throw new Error(error.message);
    }

    this.session = session;
    return session
  }

  public subscribeToAuthEvents({ onAuthEventsCallbackFn }:SubscribeToAuthEventsParams): void {

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      onAuthEventsCallbackFn({session})
    }) 

    this.subscription = subscription;
  }

  public async loginUser({email, password}: LoginUserParams): Promise<{session: Session, user: User}>{
    const { data, data: { session }, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      throw new Error(error.message)
    }

    if(!session){
      throw new Error("no session found")
    }

    return data;
  }

  public dispose(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    this.session = null;
  }

  public async logoutUser(): Promise<void>{
    const { error } = await supabaseClient.auth.signOut()

    if(error){
      throw new Error(error.message)
    }

  }
}