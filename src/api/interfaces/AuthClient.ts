import { Session, SupabaseClient, Subscription } from "@supabase/supabase-js"
import { supabaseClient } from "./supabaseClient"

interface OnAuthEventsCallbackFnParams {
  session: Session | null;
}

interface SubscribeToAuthEventsParams {
  onAuthEventsCallbackFn: (params: OnAuthEventsCallbackFnParams) => void;
}


export class AuthClient {
  supabaseClient: SupabaseClient;
  subscription?: Subscription;
  session: Session | null = null;
  
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

  public async subscribeToAuthEvents({ onAuthEventsCallbackFn }:SubscribeToAuthEventsParams): Promise<void> {

    if(!this.session){
      throw new Error("no session ")
    }

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      onAuthEventsCallbackFn({session})
    }) 

    this.subscription = subscription;
  }

  public dispose(){
    this.subscription?.unsubscribe();
  }
}