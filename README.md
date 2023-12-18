# Welcome to EC2Fast2Furious

A lightning fast EC2 console that allows you to easily view and share EC2Instance lists  
check out the live version [here](https://ec2fast2furious-goldfingersvoxs-projects.vercel.app/ )!   
![Ec2 Instance list UI](https://kcycykiximadrkttpcif.supabase.co/storage/v1/object/public/images/sc1.png?t=2023-12-18T13:48:09.869Z)

## How to set up your own  

It's super easy to set up your own version of EC2Fast2Furious

### Step I- set up Supabase  

**1. Create an account**  
You can do that [here](https://supabase.com/)!

**2. Set up a table called `ec2Instances`**  
This should be its schema:  
| Name              | Data Type                  | Format        |
|-------------------|----------------------------|---------------|
| id                | `uuid`                     | `uuid`        |  
| created_at        | `timestamp with time zone` | `timestamptz` |  
| type              | `text`                     | `text`        |  
| state             | `text`                     | `text`        |  
| availability_zone | `text`                     | `text`        |  
| public_ip         | `text`                     | `text`        |  
| private_ips       | `json`                     | `json`        |  
 
 **3. Create an authenticated account with a username and password**  
 Remember to also set up a RLS (Row Level Security) policy that allows any user to read from your db


### Step II- local Development  

In order to develop locally against your newly set up backend, add an `.env.local` to your root folder with these values (you can get them from your Supabase dashboard under "settings")  

VITE_SUPABASE_URL= [SUPABASE URL]  
VITE_SUPABASE_ANON_KEY= [SUPABASE ANON KEY]

### Step III Live Frontend  

You can use any of the many popular frontend deployment tools to deploy the frontend, I used Vercel.  

**1. Connect repo to project**  

**2. Don't forget to set up your environment variables otherwise the Supabase integration will fail to work.**  
