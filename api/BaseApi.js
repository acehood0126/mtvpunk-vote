import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class BaseApi {
    constructor() {    
      this.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL : ''
      });

      this.instance.interceptors.request.use(
        (config) => {
          // Do something before request is sent
          const token = this.getToken()
          if(config.headers && token !== '')
            config.headers["Authorization"] = "bearer " + token;
          return config;
        },
        error => {
          Promise.reject(error);
        }
      );

      this.instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response.status === 401) {
                const refreshToken = localStorage.getItem('refreshToken');
                if(refreshToken != null) {
                    // const response = await this.refreshAuthToken(refreshToken);
            
                    // store.commit('login', response.data);
                    // this.setAuthToken(response.data.token);
                    // error.config.headers['Authorization'] = `bearer ${response.data.token}`;
                }
                else {
                    // store.commit('logout');
                }
                return axios(error.config);
            } else {
                return Promise.reject(error);
            }
        }
    );
    }

    getToken() {
      return localStorage.getItem('jwt');
    }
}