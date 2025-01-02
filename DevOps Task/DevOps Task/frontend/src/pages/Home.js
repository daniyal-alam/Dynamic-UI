import React, { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";

function Home(props) {
  // Initialize state for user credentials
  const [data, setData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    address: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      if (
        !data.fullName ||
        !data.email ||
        !data.age ||
        !data.gender ||
        !data.address
      ) {
        props.handleAlert("Please fill in all fields.", "danger");
        return;
      }

      if (data.fullName.length < 3) {
        props.handleAlert("Name must be at least 3 characters long.", "danger");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.email)) {
        props.handleAlert("Please enter a valid email format.", "danger");
        return;
      }

      if (data.age < 18) {
        props.handleAlert("Age must be greater than or equal to 18.", "danger");
        return;
      }

      if (!["Male", "Female", "Other"].includes(data.gender)) {
        props.handleAlert("Gender must be Male, Female, or Other.", "danger");
        return;
      }

      if (data.address.length < 10) {
        props.handleAlert(
          "Address must be at least 10 characters long.",
          "danger"
        );
        return;
      }

      const response = await fetch("http://localhost:5000/users/addInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          age: data.age,
          gender: data.gender,
          address: data.address,
        }),
      });

      const jsonData = await response.json();
      if (jsonData) {
        console.log("Form submitted");
        props.handleAlert("User created successfully!", "success");
        setData({
          fullName: "",
          email: "",
          age: "",
          gender: "",
          address: "",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        props.handleAlert("Failed to create user.", "danger");
      }
    } catch (error) {
      props.handleAlert("An error occurred.", "danger");
    }
  };

  // Update credentials state on input change
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center text-center my-16 xsm:w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-3xl border-2 border-gold-400 relative"
      style={{
        boxShadow: "rgba(220, 180, 100, 0.35) 0px 5px 15px",
      }}
    >
      <div className="anim-border" />
      <Heading
        heading={"Welcome back! Please add info to Create User."}
        style={{ color: "#786C3B" }}
      />
      <Input
        id="fullName"
        name="fullName"
        label="Full Name"
        value={data.fullName}
        style={{ borderColor: "#786C3B" }}
        onChange={onChange}
      />
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        value={data.email}
        style={{ borderColor: "#786C3B" }}
        onChange={onChange}
      />
      <Input
        id="age"
        name="age"
        label="Age"
        value={data.age}
        style={{ borderColor: "#786C3B" }}
        onChange={onChange}
      />
      <div className="my-4 text-left">
        <label
          htmlFor="gender"
          className="text-start ml-10 text-sm font-semibold"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={data.gender}
          onChange={onChange}
          className="block w-[225px] xsm:w-[230px] md:w-[300px] mx-auto px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-gray-700"
          style={{
            borderColor: "#786C3B",
          }}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <Input
        id="address"
        name="address"
        label="Address"
        value={data.address}
        style={{ borderColor: "#786C3B" }}
        onChange={onChange}
      />
      <Button
        text={"Submit"}
        style={{
          backgroundColor: "#786C3B",
          color: "#F8E231",
        }}
        onClick={handleSubmit}
      />
    </div>
  );
}

export default Home;
