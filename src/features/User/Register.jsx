import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from "./userSlice"
import { selectLoading, selectUserInfo, selectError, selectSuccess } from "./userSlice"
import { Box, CircularProgress } from "@mui/material"
import TextField from "@mui/material/TextField"

function Register() {
    const loading = useSelector(selectLoading);
    const userInfo = useSelector(selectUserInfo);
    const error = useSelector(selectError);
    const success = useSelector(selectSuccess);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/user-profile')
    }, [navigate, userInfo, success])

    const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert('Password mismatch')
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase()
        dispatch(registerUser(data), [])
    }

    return (
        <>
        <Box sx={{ flexGrow: 1 }} component="form" onSubmit={submitForm}>
            <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="Username"
                variant="standard"
            />
            <TextField
                required
                id="standard-disabled"
                label="Required"
                defaultValue="Email"
                variant="standard"
            />
            <TextField
                id="standard-password-input"
                label="Required"
                type="password"
                autoComplete="current-password"
                defaultValue="Password"
                variant="standard"
            />
            <TextField
                id="standard-password-input"
                label="Required"
                type="password"
                autoComplete="current-password"
                defaultValue="Confirm Password"
                variant="standard"
            />
            <button type='submit' className='button' disabled={loading}>
                {loading ? <CircularProgress color="secondary" /> : 'Register'}
            </button>
        </Box>


        </>
    )
}

export default Register