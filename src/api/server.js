import axios from 'axios'
import {createError} from './utils'

const request = axios.create({
    baseURL: process.env.BASE_URL
})

const handleRequest = function (request) {
    return new Promise(function(resolve, reject){
        request.then(function(response){
            if (!response.data) {
                return reject(createError(400, 'no data'))
            }
            resolve(response);
        }).catch(function(error){
            const response = error.response
            if (response.status == 401) {
                reject(createError(401, 'need auth'))
            } else {
                reject(error)
            }
        });
    });
};

export default {
    
}