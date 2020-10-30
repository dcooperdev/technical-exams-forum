import { fetchData } from './';
import { POSTS } from '../constants/routes';

export const createPosts = (data, success, fail) => {
    const {title, body, image} = data;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            title,
            body,
            image
        })
    };

    fetchData(POSTS, success, fail, requestOptions)
        .then(response => success(response))
        .catch(error => fail(error));
}