import axios from 'axios';
import { useNavigate } from 'react-router';
const API_BASE_URL = "http://localhost:8000"

class AuthService{
    constructor(){
        this.token=localStorage.getItem('access_token');
        this.user = JSON.parse(localStorage.getItem('user')||null)
        this.api = axios.create({
            baseURL:API_BASE_URL,
            headers:{
                'Accept': 'application/json',
                ...(this.token ? {"Authorization" : `Bearer ${this.token}`} : {})
            }
        })
    }
    async login(email,password){
        try{
            const response = await this.api.post('/api/login', { email, password });
            const data = response.data
            this.token = data.token
            this.user = data.user
            this.api.defaults.headers['Authorization'] = `Bearer ${this.token}`
            localStorage.setItem('access_token',data.token);
            localStorage.setItem('user',JSON.stringify(data.user));
            console.log(data)
            return {success:true,data}
        }catch(error){
            const message = error.response?.data?.message || 'Login failed';
            const formErrors = error.response?.data.errors
            console.error(error)
            return { success: false, error: message , formErrors : formErrors ||null };
        }
    }
    async register({username,email,password,password_confirmation}){
        try{
            const response = await this.api.post('/api/register',{
                username,email,password,password_confirmation,
            });
            const data = response.data;
            this.token = data.token;
            this.user = data.user;
            this.api.defaults.headers['Authorization'] = `Bearer ${this.token}`;
            localStorage.setItem('access_token',data.token);
            localStorage.setItem('user',JSON.stringify(data.user))
            return {success : true,data}
        }catch(error){
            const message = error.response?.data?.message || 'Registration failed';
            console.error(error)
            return { success: false, error: error };
        }
    }
    
    async logout(navigate){
        if(!this.token) return;
        try{
            await this.api.post('/api/logout');
        }catch(error){
            console.error('Logout error:', error);
        }finally{
            navigate('/')
            this.token = null
            this.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            delete this.api.defaults.headers['Authorization'];
        }
    }
    // async getProfile(){
    //     try{
    //         const response = await this.api.get('/api/getProfile');
    //         this.user = response.data.user
    //         localStorage.setItem('user',JSON.stringify(this.user))
    //         return this.user
    //     }catch(e){            
    //              console.error("Failed to fetch profile:", e);
    //             return null;            
    //     }
    // }
    
     isAuthenticated(){
        return !!this.token
    }
    getToken(){
        return this.token;
    }
    getUser(){
        return this.user
    }
    
        async authenticatedRequest(url,options={}){
            
            const token = localStorage.getItem("access_token")
            try{
                const response = await this.api({
                    url,
                    method: options.method || "GET",
                    data:options.body || null,
                    params:options.params || {},
                    headers:{
                        "Authorization" : `Bearer ${token}`,
                        "Accept":"application/json",
                        ...options.headers,
                    }
                })
                console.log("main",response)  
                return response                   
            }catch(error){                
                throw error
            }
        }
}

export default new AuthService();