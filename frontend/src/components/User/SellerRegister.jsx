// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Typography, Link, Avatar, FormControlLabel, RadioGroup, Radio } from '@mui/material'; // Import Material UI components
// import 'tailwindcss/tailwind.css'; // Import Tailwind CSS for utility classes
// import BackdropLoader from '../Layouts/BackdropLoader';
// import MetaData from '../Layouts/MetaData';
// import FormSidebar from './FormSidebar';
// import Loading from '../Admin/Loading';
// import { useSelector } from 'react-redux';


// const SellerRegister = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         gender:'',
//         password: ''
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/v1/seller/register', formData);
//             console.log(response.data); // Handle success message or redirect
//         } catch (error) {
//             console.error('Registration failed', error.response.data);
//             // Handle error message display
//         }
//     };
   
//     const [avatar, setAvatar] = useState();
//     const [avatarPreview, setAvatarPreview] = useState("preview.png");

  
 

//     return (
//         <>
//             <MetaData title="Register | Newcart" />

            
//             <main className="w-full mt-12 sm:pt-20 sm:mt-0">

//                 {/* <!-- row --> */}
//                 <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

//                     <FormSidebar
//                         title="Looks like you're new here!"
//                         tag="Sign up with your mobile number to get started"
//                     />

//                     {/* <!-- signup column --> */}
//                     <div className="flex-1 overflow-hidden">

//                         {/* <!-- personal info procedure container --> */}
//                         <form
//                             onSubmit={handleSubmit}
//                             encType="multipart/form-data"
//                             className="p-5 sm:p-10"
//                         >
//                             <div className="flex flex-col gap-4 items-start">

//                                 {/* <!-- input container column --> */}
//                                 <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
//                                     <TextField
//                                         fullWidth
//                                         id="full-name"
//                                         label="Full Name"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         id="email"
//                                         label="Email"
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 {/* <!-- input container column --> */}

//                                 {/* <!-- gender input --> */}
//                                 <div className="flex gap-4 items-center">
//                                     <h2 className="text-md">Your Gender :</h2>
//                                     <div className="flex items-center gap-6" id="radioInput">
//                                         <RadioGroup
//                                             row
//                                             aria-labelledby="radio-buttons-group-label"
//                                             name="radio-buttons-group"
//                                         >
//                                             <FormControlLabel name="gender" value="male" onChange={handleChange} control={<Radio required />} label="Male" />
//                                             <FormControlLabel name="gender" value="female" onChange={handleChange} control={<Radio required />} label="Female" />
//                                         </RadioGroup>
//                                     </div>
//                                 </div>
//                                 {/* <!-- gender input --> */}

//                                 {/* <!-- input container column --> */}
//                                 <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
//                                     <TextField
//                                         id="password"
//                                         label="Password"
//                                         type="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <TextField
//                                         id="confirm-password"
//                                         label="Confirm Password"
//                                         type="password"
//                                         name="password"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 {/* <!-- input container column --> */}

//                                 <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
//                                     <Avatar
//                                         alt="Avatar Preview"
//                                         src={avatarPreview}
//                                         sx={{ width: 56, height: 56 }}
//                                     />
//                                     <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
//                                         <input
//                                             type="file"
//                                             name="avatar"
//                                             accept="image/*"
//                                             onChange={handleChange}
//                                             className="hidden"
//                                         />
//                                         Choose File
//                                     </label>
//                                 </div>
//                                 <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
//                                 <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
//                                 <Link to="/seller-register" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Create a Seller Account</Link>
//                             </div>

//                         </form>
//                         {/* <!-- personal info procedure container --> */}

//                     </div>
//                     {/* <!-- signup column --> */}
//                 </div>
//                 {/* <!-- row --> */}

//             </main>
//         </>
//     );
// };

// export default SellerRegister;
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const SellerRegisterForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    gender: '', // Add gender field
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setUserData({ ...userData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('avatar', userData.avatar);
    formData.append('gender', userData.gender); // Add gender to form data

    try {
      await axios.post('/api/v1/registerseller', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Seller registered successfully');
    } catch (error) {
      console.error('Error registering seller', error);
      alert('Error registering seller');
    }
  };

  return (
    <Container maxWidth="sm" className="bg-white p-8 rounded shadow-md mt-12">
      <Typography variant="h4" component="h1" gutterBottom className="text-center">
        Seller Registration
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          label="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="block w-full text-sm text-gray-500"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default SellerRegisterForm;
