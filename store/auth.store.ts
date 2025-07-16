import { getCurrnetUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';
type AuthState = {
    isAuthenticated : boolean,
    user : User | null,
    isLoading : boolean,

    setisAuthenticated :(Value:boolean) =>void,
    setUser : (user:User|null)=>void,
    setLoading:(loading: boolean)=>void,

    fetchAuthenticateduser:()=> Promise<void>;
}
const useAuthStore = create<AuthState>((set) => ({
   isAuthenticated:false,
   user:null,
   isLoading:true,

   setisAuthenticated:(value)=>set({isAuthenticated:value}),
   setUser:(user)=>set({user}),
   setLoading:(value)=>set({isLoading:value}),

    fetchAuthenticateduser: async()=>{
    set({isLoading:true})
    try {
        const user = await getCurrnetUser() // form app write 
        if(user)set({isAuthenticated:true, user:user as User})
        else set({isAuthenticated:false , user:null})
    } catch (e) {
        console.log('fetchAuthenticated User error',e)
        set({isAuthenticated:false,user:null})
    }finally{
        set({isLoading:false})
    }
   }
}))

export default useAuthStore
