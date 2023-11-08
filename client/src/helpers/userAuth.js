import { useNavigate } from 'react-router-dom';

const userAuth = async () => {

    const token = localStorage.getItem('token');

    if (token) {

        try {

            const response = await fetch('/api/validateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (response.ok) {
                return true;
                // navigate('/');
            }
            else {
                localStorage.removeItem('token');
                return false;
            }

        } catch (error) {
            console.error('Error validating token:', error);
            localStorage.removeItem('token');
            return false;
        }

    }

    return false;

};

export default userAuth;