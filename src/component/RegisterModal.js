import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Stack } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:'100vw',md:400},
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    gap: '20px'
};

export default function Register({ open, setOpen }) {

    const handleClose = () => setOpen(false);
    const [type,setType] = React.useState(true)
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                {type ?
                <Stack sx={style}>
                    <Typography sx={{fontWeight:'bold',fontSize:{xs:'1rem',md:'1.25rem'},textAlign:'center'}}>
                        Login
                    </Typography>
                    <TextField id="outlined-basic" label="Email" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="password" variant="outlined" size="small" type="password"/>
                    <Button variant="contained" style={{ width: 'fit-content', alignSelf: 'center' }}>Login</Button>
                    <Typography sx={{fontWeight:'bold',fontSize:"0.75rem",textAlign:'center'}} >
                        Do not have an account? <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={()=>setType(false)}>Register</span>
                    </Typography>
                </Stack>
                :
                <Stack sx={style}>
                    <Typography sx={{fontWeight:'bold',fontSize:{xs:'1rem',md:'1.25rem'},textAlign:'center'}}>
                        Register
                    </Typography>
                    <TextField id="outlined-basic" label="Email" variant="outlined" size="small" />
                    <TextField id="outlined-basic" label="password" variant="outlined" size="small" type="password"/>
                    <Button variant="contained" style={{ width: 'fit-content', alignSelf: 'center' }}>Register</Button>
                    <Typography sx={{fontSize:"0.75rem",textAlign:'center',color:'primary',cursor:'pointer'}} >
                        Already have an account? <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={()=>setType(true)}>Login</span>
                    </Typography>
                </Stack>
            }
            </Modal>
        </div>
    );
}