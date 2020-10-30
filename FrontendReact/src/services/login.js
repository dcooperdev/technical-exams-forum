import { fetchData } from './';
import { LOGIN } from '../constants/routes';

export const loginUser = (data, success, fail) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username_email: data.email,
            password: data.password
        })
    };

    fetchData(LOGIN, success, fail, requestOptions)
        .then(response => success(response))
        .catch(error => fail(error));
}