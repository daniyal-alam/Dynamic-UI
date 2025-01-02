import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa"; // For the delete icon
import { FaUser, FaMapMarkerAlt, FaGenderless } from "react-icons/fa"; // For icons
import "../App.css";

const UserCard = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/getInfo", {
          method: "GET",
        });

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, []);

  const handleDelete = async (userId) => {
    // Add your delete logic here
    try {
      const response = await fetch(
        `http://localhost:5000/users/delete/${userId}`,
        {
          method: "DELETE",
        }
      );

      const newUsers = users.filter((users) => users.userId !== userId);
      setUsers(newUsers);
      props.handleAlert("User deleted successfully.", "success");
    } catch (error) {
      props.handleAlert("Error deleting user.", "danger");
    }
  };

  return (
    <div className="border-t-4 border-blue-400 md:w-3/4 mx-auto justify-center items-center">
      <h1 className="text-center mt-5 font-bold text-xl">User Cards</h1>
      <div className="flex flex-wrap justify-center gap-6 mb-6 pt-6">
        {users.map((user) => (
          <div
            key={user.userId}
            className="mx-2 shadow-lg rounded-xl border border-gray-200 bg-white p-6 flex flex-col justify-between cursor-pointer w-80 card-border"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-500">Id: {user.userId}</p>
                <h2 className="text-lg font-bold text-gray-800">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user.userId)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center text-gray-700">
                <FaUser className="mr-2 text-blue-500" />
                <p className="text-sm">
                  Age: <span className="font-bold">{user.age}</span>
                </p>
              </div>
              <div className="flex items-center text-gray-700">
                <FaGenderless className="mr-2 text-pink-500" />
                <p className="text-sm">
                  Gender: <span className="font-bold">{user.gender}</span>
                </p>
              </div>
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                <p className="text-sm">
                  Address: <span className="font-bold">{user.address}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
