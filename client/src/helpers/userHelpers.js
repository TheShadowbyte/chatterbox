export const getCurrentUser = async (server_url, userJsonId) => {

    try {

        const response = await fetch(server_url + '/api/users/' + userJsonId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        return await response.json();

    } catch (error) {
        // If there's an error during fetch, handle it here (e.g., show an error message)
        console.error('Error during API call', error);
    }

};