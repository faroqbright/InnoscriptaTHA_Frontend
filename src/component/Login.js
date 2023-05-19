import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Stack, Paper, CircularProgress } from "@mui/material"
import { AuthContext } from './contextHook';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100vw', md: 400 },
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    gap: '20px'
};
const Login = () => {
    const {isLoading,setIsLoading} = React.useContext(AuthContext)
    const { baseURL,login } = React.useContext(AuthContext)
    const [type, setType] = React.useState(true)
    const [error, setError] = React.useState([])
    const [errorType, setErrorType] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [first_name, setFirstName] = React.useState('')
    const [last_name, setLastName] = React.useState('')
    const [confirm_password, setConfirmPassword] = React.useState('')
    const [password, setPassword] = React.useState('')
    const Register = async () => {
        
        try {
            setIsLoading(true)
            const formdata = {
                first_name, last_name, email, password, confirm_password
            }
            const res = await axios.post(`${baseURL}/register`, formdata)
            if (res.status === 200) {
                setType(true)
                setErrorType(false)
                setError([res.data.message])
                setIsLoading(false)

            }
        } catch (error) {
            // console.log(error.response.data.errors)
            // setError(error.response.data.errors)
            setErrorType(true)
            setError([])
            Object.keys(error.response.data.errors).forEach((key, index) => { setError((state)=>[...state,(error.response.data.errors[key][0])]) })
            setIsLoading(false)
        }

    }
    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const formdata = {
                email, password
            }
            const res = await axios.post(`${baseURL}/login`, formdata)
            if (res.status === 200) {
                console.log(res.data)
                localStorage.setItem('token',res.data.token)
                setErrorType(false)
                setError([res.data.message])
                setIsLoading(false)
                login()
            }
        } catch (error) {
            // console.log(error.response.data.errors)
            // setError(error.response.data.errors)
            console.log(error)
            setErrorType(true)
            setError([])
            if(error.response.data.errors){
            Object.keys(error.response.data.errors).forEach((key, index) => { setError((state)=>[...state,(error.response.data.errors[key][0])]) })
            } else {
                setError([error.response.data.message])
            }
            setIsLoading(false)
        }
    }
    return (
        <>
            {type ?
                <Stack sx={style}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' }, textAlign: 'center' }}>
                        Login
                    </Typography>
                    {error.length>0 && 
                    <Stack>
                        {error.map((item)=>
                        <Typography sx={{color:errorType? 'red': 'green',}}>
                        *{item}
                        </Typography>
                        )}
                        </Stack>
                    }
                    <TextField id="outlined-basic" label="Email" variant="outlined" size="small" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField id="outlined-basic" label="password" variant="outlined" size="small" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button variant="contained" style={{ width: 'fit-content', alignSelf: 'center' }} onClick={handleLogin}>Login</Button>
                    <Typography sx={{ fontWeight: 'bold', fontSize: "0.75rem", textAlign: 'center' }} >
                        Do not have an account? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setType(false)}>Register</span>
                    </Typography>
                </Stack>
                :
                <Stack sx={style}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' }, textAlign: 'center' }}>
                        Register
                    </Typography>
                    {error.length>0 && 
                    <Stack>
                        {error.map((item)=>
                        <Typography sx={{color:errorType? 'red': 'green',}}>
                        *{item}
                        </Typography>
                        )}
                        </Stack>
                    }
                    <TextField id="outlined-basic" label="First name" variant="outlined" size="small" value={first_name} onChange={e => setFirstName(e.target.value)} />
                    <TextField id="outlined-basic" label="last name" variant="outlined" size="small" value={last_name} onChange={e => setLastName(e.target.value)} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" size="small" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <TextField id="outlined-basic" label="Confirm password" variant="outlined" size="small" type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)} />
                    <Button variant="contained" style={{ width: 'fit-content', alignSelf: 'center' }} onClick={Register}>
                       {!isLoading ? <Typography>Register</Typography> : <CircularProgress sx={{'&.MuiCircularProgress-root':{color:'white !important',maxWidth:'22px !important',maxHeight:'22px !important'},'& .MuiCircularProgress-svg':{color:'white !important',width:'22px !important',maxheight:'22px !important'}}}/> }
                    </Button>
                    <Typography sx={{ fontSize: "0.75rem", textAlign: 'center', color: 'primary', cursor: 'pointer' }} >
                        Already have an account? <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setType(true)}>Login</span>
                    </Typography>

                </Stack>
            }

        </>
    );
}

export default Login;