import { fetchData } from './';
import { SIGNUP } from '../constants/routes';

export const signupUser = (data, success, fail) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username_email: data.username,
            password: data.password,
            complete_name: data.name
        })
    };

    fetchData(SIGNUP, success, fail, requestOptions)
        .then(response => success(response))
        .catch(error => fail(error));
}