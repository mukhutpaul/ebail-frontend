
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import Cookies from "js-cookie";
import api from "./api";

 interface User {
  email: string;
  username: string;
  noms: string;
  photo_url: string;
}

 interface AuthTokens {
  access: string;
  refresh: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  password2: string
  noms: string;
  username: string;
 
}

interface RegisterResponse {
    email:string;
    user_id:string;
    message:string;
}

interface VerifyEmailResponse {
  message: string;
  refresh:string;
  access:string;
  user:User;
}

const baseURL = '/auth'

export const AuthService = {
  register: async(userData:RegisterData)=> {
    //console.log(userData)
    try {
        const res = await api.post<RegisterResponse>(`${baseURL}/register/`, userData);
        console.log(res)
        return res.data
         
    } catch (error) {
        console.log("Error in AuthService.register:", error);
      
    }
  },

  login: async (email: string, password: string) => {
    try {
    const res = await api.post<LoginResponse>(`${baseURL}/login/`, {
        email,
        password
    });
     if (res.status === 200) {
        const { access, refresh} = res.data;

        const cookieOptions = {
            expires: 1,
            secure:process.env.NODE_ENV === 'production',
        }
        Cookies.set(ACCESS_TOKEN, access,cookieOptions);
        Cookies.set(REFRESH_TOKEN, refresh,{
            ...cookieOptions,
            expires: 7 // Refresh token expires in 7 days
        });
        return res.data
     } 
    } catch (error) {
        console.log("Error in AuthService.login: ", error);
    }
  },
  verifyEmail:async (token:string)=> {
     try {
         const res = await api.get(`${baseURL}/verify-email/${token}/`);
         if (res.status === 200) {
            const {  access, refresh} = res.data;

            // Set new tokens in cookies
            const cookieOptions = {
                expires: 1,
                secure: process.env.NODE_ENV === 'production',
            };
            Cookies.set(ACCESS_TOKEN, access, cookieOptions);
            Cookies.set(REFRESH_TOKEN, refresh, {
                ...cookieOptions,
                expires: 7 // Refresh token expires in 7 days
            });

            return res.data
         }
     } catch (error) {
         console.log("Error in AuthService.sendVerificationEmail:", error);
        return {
            error: error instanceof Error ? error.message : "An error occurred while verifying email"
        }
       
     }
  },
  resendVerificationEmail:async (email:string) => {
     try {
         const res = await api.post<{message:string}>(`${baseURL}/resend-verification-email/`, {
            email});
         if (res.status === 200) {
            return res.data;
         }
     } catch (error) {
        console.log("Error in AuthService.resendVerificationEmail:", error);
     }
  },
  getUserProfile:async () => {
    try {
        const res = await api.get<User>(`${baseURL}/profile/`);
        return res.data;
    } catch (error) {
        console.log("Error in AuthService.getUserProfile:", error);
    }
  },
  logout:async () => {
     try {
         const res = await api.post<{message:string}>(`${baseURL}/logout/`,{
            refresh_token:Cookies.get(REFRESH_TOKEN)
         });
         Cookies.remove(ACCESS_TOKEN);
         Cookies.remove(REFRESH_TOKEN);
         return res.data
     } catch (error) {
        console.log("Error in AuthService.logout:", error);
         //Remove the access token and refresh token regardless
          Cookies.remove(ACCESS_TOKEN);
         Cookies.remove(REFRESH_TOKEN);
     }
  }
};