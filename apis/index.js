import axios from 'axios';
import  {ROOT_URL} from '../environment'




export default class ApiUser {
    static async signUp(action){
        const url = `${ROOT_URL}/generic/addNewUser`;
        const request =  await axios.post(url,action.payload);
        return request;
    }
    static async fetchUser(action) {
        // console.log("action in api call",action.payload)
        const url = `${ROOT_URL}/generic/validateUser`;
        const request = await axios.post(url,action.payload);
        
        return request;
    }
    static async fetchLevels(action) {
        // console.log("level action call")
        const url = `${ROOT_URL}/adminSecure/getAllLevels`;
        const request = await axios.post(url, action.payload);
        // console.log("level data",request)
        return request;
    }
    static async fetchLevelContents(action) {
        // console.log(action.payload)
        const url = `${ROOT_URL}/adminSecure/getAllContent`;
        const request = await axios.post(url,action.payload);
        return request;
    }
    static async updateUserProgress(action) {
        // console.log("in user progress request")
        const url = `${ROOT_URL}/userProgress/updateLearnProg`;

        const request = await axios.post(url, action.payload)
        // console.log("progress",request)    
        return request;
    }  

    static async getQizz(action) {
        const url = `${ROOT_URL}/lgmQuiz/getQuizTillLevel`;

        const request = await axios.post(url, action.payload);

        return request;
    }
    static async getLevelAssesment(action) {
        // console.log("level assesment api call",action.payload)
        const url = `${ROOT_URL}/lgmQuiz/getLevelAssesment`;
        const request = await axios.post(url, action.payload);
        // console.log(request)
        return request;
    }
}
