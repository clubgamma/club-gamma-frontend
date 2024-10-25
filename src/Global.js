import axios from "axios";

const serverUrl = "http://localhost:3006" + '/api'  // This should point to your backend API in production

export default class Global {
    static user;

    static axios = axios.create({
        baseURL: serverUrl,
        withCredentials: true,  // Ensure cookies/credentials are sent
    });

    static async getUser() {
        try {
            const res = await this.httpGet("/auth/me");
            this.user = res.user;
            return res.user;
        } catch (err) {
            throw new Error("User not found");
        }
    }

    static async logout() {
        try {
            localStorage.removeItem("token");
            this.user = null;
            window.location.reload();
        } catch (err) {
            throw new Error("Error logging out");
        }
    }

    static async httpGet(endPoint, params = {}) {
        try {
            const token = localStorage.getItem('token');  // Get token from localStorage
            console.log(this.axios.defaults.baseURL)
            const res = await this.axios.get(endPoint, {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`  // Add token to headers
                },
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            throw new Error("Error fetching data");
        }
    }

    static async httpPost(endPoint, body) {
        try {
            const token = localStorage.getItem('token');  // Get token from localStorage
            const res = await this.axios.post(endPoint, body, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Add token to headers
                },
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static async getStats(){
        try{
            const stats = await this.httpGet("/stats")
            return stats;
        }catch (error){
            throw new Error("Error Fetching Stats");
        }
    }
}
