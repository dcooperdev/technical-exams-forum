import { fetchData } from './';
import { COMMENT } from '../constants/routes';

export const comment = (data, success, fail) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            fullname: data.fullname,
            publication: data.publication,
            comment: data.comment
        })
    };

    fetchData(COMMENT, success, fail, requestOptions)
        .then(response => success(response))
        .catch(error => fail(error));
}