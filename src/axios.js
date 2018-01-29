import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-5f83c.firebaseio.com/'
})

export default instance;