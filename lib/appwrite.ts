import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform : "com.areeb.fastfood",
    databaseId : '6873b8e300011ae10751',
    UserCollectionId : '6873b92900063dd67a31'
}

export const client = new Client(); // create a expo-aapwrite client

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const database = new Databases(client);

const avatars = new Avatars(client);
export const createUser = async({email,password,name}:CreateUserParams)=>{
    try {
       // Helper function to validate email
        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Sanitize email first
        const sanitizedEmail = email.trim().toLowerCase();
        
        // Validate email format
        if (!isValidEmail(sanitizedEmail)) {
            throw new Error("Invalid email address format");
        }
        const newAccount = await account.create(ID.unique() , sanitizedEmail , password , name)
        if(!newAccount) throw Error;

        await signIn({email: sanitizedEmail,password});  // this func sign user after account creation process .

        const avatarUrl = avatars.getInitialsURL(name); // generates an avatar image using user name 
        console.log(avatarUrl)

        // create user inside appwrite database after successfull signin 
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.UserCollectionId,
            ID.unique(),
            {  accountId :newAccount.$id , email: sanitizedEmail , name , avatar : avatarUrl}
        )
        return newUser
    } catch (e) {
       console.error("Error creating user:", e);
        throw new Error(e instanceof Error ? e.message : String(e));
    }
}
export const signIn =  async({email  ,password}:SignInParams)=>{
     try {
        const session = await account.createEmailPasswordSession(email,password)
     } catch (e) {
        throw new Error(e as string)
     }
} // this func sign user after account creation process .

export const getCurrnetUser = async()=>{  // get current login user from this function 
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser:any = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.UserCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser)throw Error
        return currentUser.documents[0]
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}