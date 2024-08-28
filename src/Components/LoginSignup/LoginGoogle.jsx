import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { axiosUser } from "../../utils/api/baseUrl";
 import { addUser } from "../../utils/Redux/Slice/userSlice"; 
import { toast } from 'react-toastify';

const LoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, picture } = decoded;

      const response = await axiosUser.post("/signingoogle", {
        token: credentialResponse.credential,
        name,
        email,
        image: picture
      }, { 
        withCredentials: true,
        headers: {
          "Content-Type": 'application/json'
        },
      });

      if (response.status === 200) {
        dispatch(addUser(response.data));
        localStorage.setItem("useraccessToken", response.data.accessToken);
        localStorage.setItem('userrefreshToken', response.data.refreshToken);
        navigate('/home');
        console.log('in google signin', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
      console.error('login failed', error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={(error) => {
          console.log("Login Failed",error);
        }}
      />
    </div>
  );
};

export default LoginGoogle;















// const LoginGoogle = () => {
//   const handleGoogleLogin =async(credentialResponse)=>{
//     try {
//       const decoded = jwtDecode(credentialResponse.credential)
//       console.log(decoded)
      
//       const {name,email,picture} =decoded

//       const response = await axiosUser.post("/signingoogle",{
//         token: credentialResponse.credential,
//         name,
//         email,
//         image:picture
//       });
//       console.log('name',name)
//       console.log('email',email)

//       console.log(response.data)

//     } catch (error) {
//       console.error('login failed',error);
//       throw error
      
//     }
//   }
//   return (
//     <div>
//       {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       {console.log('clinetid',import.meta.env.VITE_GOOGLE_CLIENT_ID)}
        
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             var decoded = jwtDecode(credentialResponse.credential)
//             console.log(decoded);
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
        
//       </GoogleOAuthProvider> */}
//       <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       {console.log('clinetid',import.meta.env.VITE_GOOGLE_CLIENT_ID)}
        
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
        
//       </GoogleOAuthProvider>
    
      
//     </div>
//   );
// };

//   const signin = useGoogleLogin({

//     onSuccess: async(credentialResponse)=>{
//       try {
//         console.log('credential',credentialResponse)

//         if(!credentialResponse.credential||typeof credentialResponse.credential !== 'string'){
//           throw new Error('invlaid credential received')
//         }

//         const decoded = jwtDecode(credentialResponse.credential)
//         console.log(decoded)
//         const {name,email,picture} =decoded

//         const response = await axiosUser.post("/signingoogle",{
//           token: credentialResponse.credential,
//           name,
//           email,
//           image:picture
//         },{ 
//           withCredentials:true,
//           headers:{
//             "Content-Type":'application/json'
//           },
//         })
//         if(response.status===200){
//           dispatch(addUser(response.data))
//           localStorage.setItem("useraccessToken",response.data.accessToken)
//           localStorage.setItem('userrefreshToken',response.data.refreshToken)
//           navigate('/home')
//           console.log('in google signin',response.data)
//         }
//       } catch (error) {
//         if(error.response&&error.response.status===400){
//           toast.error(error.response.data.message)
//         }else{
//           toast.error('an error occured')
//         }
//         console.error('login failed',error);
//       }
//     },
//     onError:(error)=>{
//       console.error('login failed',error);
//     }
//   });



