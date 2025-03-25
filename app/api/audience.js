/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param endpoint
 * @param method
 * @param accessToken
 */

export const  call_api = async (endpoint, method, accessToken) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/${endpoint}`, {
            method: method,

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        // Kiểm tra xem phản hồi có thành công hay không
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        return await response.json(); // Dữ liệu trả về từ API
    } catch (error) {
        console.error('Có lỗi xảy ra:', error.message);
    }

}