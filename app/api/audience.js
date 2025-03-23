/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param endpoint
 * @param method
 * @param accessToken
 */
export async function call_api(endpoint, method, accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: method,
        headers: headers
    };

    return fetch(endpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}