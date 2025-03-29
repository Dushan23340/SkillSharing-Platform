import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Animations
import { Dialog } from "@headlessui/react"; // Modal for Edit Profile

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("posts");
    const [isFollowing, setIsFollowing] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ username: "", bio: "", profilePicture: "", coverImage: "" });

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("No user found");
            setLoading(false);
            return;
        }
        axios.get(`http://localhost:8080/user/${userId}`)
            .then((response) => {
                setUser(response.data);
                setUpdatedProfile({
                    username: response.data.username,
                    bio: response.data.bio,
                    profilePicture: response.data.profilePicture || "",
                    coverImage: response.data.coverImage || ""
                });
                setIsFollowing(response.data.isFollowing || false);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching user data");
                setLoading(false);
            });
    }, []);

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
        axios.post(`http://localhost:8080/user/follow/${user.id}`, { follow: !isFollowing })
            .catch(() => setIsFollowing(!isFollowing)); // Revert if API fails
    };

    const handleEditProfile = () => {
        axios.put(`http://localhost:8080/user/${user.id}`, updatedProfile)
            .then((response) => {
                setUser(response.data);
                setEditModalOpen(false);
            })
            .catch(() => alert("Failed to update profile"));
    };

    if (loading) return <p className="text-center text-gray-400">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen w-screen bg-[#212121] text-white flex flex-col items-center py-10 px-6">
            {/* Profile Cover Image */}
            <motion.div 
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl relative mb-6"
            >
                <img 
                    src={user.coverImage || "https://via.placeholder.com/1500x400"} 
                    alt="Cover"
                    className="w-full h-60 object-cover rounded-lg"
                />
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                    <img 
                        src={user.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-[#009688]"
                    />
                </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl bg-[#1c1c1c] p-6 rounded-lg shadow-lg text-center"
            >
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-[#009688]">{user.username}</h2>
                    <p className="text-gray-300">{user.bio || "No bio available"}</p>

                    {/* Follow/Unfollow Button */}
                    <button 
                        onClick={handleFollowToggle}
                        className={`mt-4 px-6 py-2 rounded-md transition duration-300 ease-in-out hover:bg-[#00796b] ${isFollowing ? "bg-red-500" : "bg-[#009688]"} text-white`}
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </button>

                    {/* Edit Profile Button */}
                    <button 
                        onClick={() => setEditModalOpen(true)} 
                        className="mt-4 px-6 py-2 rounded-md bg-gray-600 text-white transition duration-300 ease-in-out hover:bg-gray-700"
                    >
                        Edit Profile
                    </button>
                </div>
            </motion.div>

            {/* Tabs for Navigation */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl mt-6"
            >
                <div className="flex justify-around bg-[#1c1c1c] p-3 rounded-lg shadow-lg">
                    {["posts", "learningPlans", "activity", "followers"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-lg px-4 py-2 rounded-md transition duration-300 ease-in-out hover:text-[#009688] ${activeTab === tab ? "bg-[#009688] text-white" : "text-gray-400"}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Edit Profile Modal */}
            <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-[#1c1c1c] p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h3 className="text-xl font-bold text-[#009688] mb-4">Edit Profile</h3>
                    <label className="block text-gray-300 mb-2">Username</label>
                    <input 
                        type="text"
                        value={updatedProfile.username}
                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, username: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    />
                    <label className="block text-gray-300 mb-2">Bio</label>
                    <textarea
                        value={updatedProfile.bio}
                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, bio: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    />
                    <label className="block text-gray-300 mb-2">Profile Picture URL</label>
                    <input 
                        type="text"
                        value={updatedProfile.profilePicture}
                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, profilePicture: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    />
                    <label className="block text-gray-300 mb-2">Cover Image URL</label>
                    <input 
                        type="text"
                        value={updatedProfile.coverImage}
                        onChange={(e) => setUpdatedProfile({ ...updatedProfile, coverImage: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    />
                    <div className="flex justify-between">
                        <button 
                            onClick={handleEditProfile} 
                            className="px-4 py-2 bg-[#009688] rounded text-white"
                        >
                            Save
                        </button>
                        <button 
                            onClick={() => setEditModalOpen(false)} 
                            className="px-4 py-2 bg-gray-600 rounded text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default UserProfile;