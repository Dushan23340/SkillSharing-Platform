import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { use } from 'react';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // get user id from local storage
        const userId = localStorage.getItem('userId');
        // if there is no userID , you can redirect to show an error
        if (!userId) {
            setError('No user found');
            setLoading(false);
            return;
        }
        // fetch user data from API
        axios.get(`http://localhost:8080/user/${userId}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching user data');
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center text-gray-400">Loading...</p>; // loading
    if (error) return <p className="text-center text-red-500">{error}</p>; // error

    return (
        <div className="min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center py-8 px-4">
            <h2 className="text-4xl font-bold text-[#009688] mb-6">User Profile</h2>
            {user ? (
                <div className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg w-full max-w-md">
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-[#009688]">Username:</p>
                        <p className="text-sm text-gray-300">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-[#009688]">Email:</p>
                        <p className="text-sm text-gray-300">{user.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-[#009688]">Password:</p>
                        <p className="text-sm text-gray-300">{user.password}</p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-300">No user found</p>
            )}
        </div>
    );
}

export default UserProfile;
