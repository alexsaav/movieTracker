import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

export const registerUser = createAsyncThunk(
    "user/register",
    async ({ username, email, password }) => {
        const response = await fetch(`${backendURL}/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                username,
            })
        });

        if(response.ok) {
            const newUser = await response.json();
            return newUser;
        }
    }
); 

//SLICE
export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {}, // for user object
        userToken: null, // for storing the JWT
        error: null,
        success: false, // for monitoring the registration process.
    },

    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false
        },
        [registerUser.fulfilled]: (state, action) => {
            state.users = action.payload;
        }
    }
});

//SELECTORS
export const selectLoading = state => state.loading;
export const selectUserInfo = state => state.userInfo;
export const selectuserToken = state => state.userToken;
export const selectError = state => state.error;
export const selectSuccess = state => state.success;

//REDUCER
export default userSlice.reducer;