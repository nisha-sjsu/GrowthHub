import { isEmpty } from "lodash";


export const setLocalStorage = (response) => {

    localStorage.setItem('userToken', response.data.userTokens.AuthenticationResult.AccessToken);
    // localStorage.setItem('user', JSON.stringify(response.data.user));
};

export function isUserSignedIn() {
    return !isEmpty(localStorage.getItem('userToken'));
}

export function getToken() {
    return localStorage.getItem('userToken');
} 
