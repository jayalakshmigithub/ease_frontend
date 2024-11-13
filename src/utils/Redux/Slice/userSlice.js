// import { createSlice } from '@reduxjs/toolkit';

// const userInfoString = localStorage.getItem('userInfo');
// const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         userInfo: userInfo,
//         isAuthenticated: !!userInfo,
       
       
//     },
//     reducers: {
//         addUser: (state, action) => {
//             state.userInfo = action.payload;
//             state.isAuthenticated = true;
//             localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
//         },
//         clearUser: (state) => {
//             state.userInfo = {};
//             state.isAuthenticated = false;
//             localStorage.removeItem('userInfo');
//         },
       
//     },
// });

// export const { addUser, clearUser } = userSlice.actions;
// export const userName = userSlice.name;
// export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

// Safely get userInfo from localStorage
const userInfoString = localStorage.getItem('userInfo');
let userInfo = null;

try {
  // Only parse if the string is not null or empty
  if (userInfoString) {
    userInfo = JSON.parse(userInfoString);
  }
} catch (error) {
  console.error("Failed to parse userInfo from localStorage:", error);
  // If there's an error parsing, reset userInfo to null
  userInfo = null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfo,
    isAuthenticated: !!userInfo,
  },
  reducers: {
    addUser: (state, action) => {
      // Only store valid user data
      if (action.payload) {
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        // Safely store the userInfo in localStorage
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      }
    },
    clearUser: (state) => {
      state.userInfo = {};
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;
export const userName = userSlice.name;
export default userSlice.reducer;
