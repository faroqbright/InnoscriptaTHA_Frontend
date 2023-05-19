import { Link } from "react-router-dom";
import { Button, Box, Typography, Stack, NativeSelect } from '@mui/material'
import Register from "./RegisterModal";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AuthContext } from "./contextHook";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [age, setAge] = React.useState('');
  const {source,setSource,logout} = React.useContext(AuthContext)
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NewsZilla
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Box
            className="collapse navbar-collapse"
            style={{ display: { xs: "block", md: 'flex' }, justifyContent: 'space-between' }}
            id="navbarSupportedContent"
          >
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/general"
                  >
                    Home
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/business">
                    Business
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/general">
                    General
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">
                    Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">
                    Sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">
                    Technology
                  </Link>
                </li> */}
              </ul>
            </div>
            <Stack sx={{ color: 'white', flexDirection:{xs:"column",md:"row"},gap:"10px"}}>
              {/* <Stack sx={{flexDirection:'row',gap:'5px'}}> */}
              {/* <span style={{opacity: '0.8' }}>Api: </span>
              <select name="apis" id="api" value={source} onChange={(e)=>setSource(e.target.value)}>
                <option value="volvo">newsapi</option>
                <option value="saab">guardian</option>
                <option value="mercedes">nyt</option>
              </select> */}
              {/* </Stack> */}
              <Typography sx={{color:'white',cursor:'pointer',opacity:'0.4','&:hover':{opacity:"0.8"},transition:'0.5s opacity'}} onClick={()=>logout()}>Logout</Typography>
              {/* <Register open={open} setOpen={setOpen} /> */}
              {/* <Box sx={{ minWidth: 120,color:'white' }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{color:'red'}}>
                    API
                  </InputLabel>
                  <NativeSelect
                    value={source}
                    sx={{color:'white'}}
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                    onChange={e=>setSource(e.target.value)}
                  >
                    <option value={'newsapi'}>Newsapi</option>
                    <option value={'guardian'}>Guardian</option>
                    <option value={"nyt"}>Nyt</option>
                  </NativeSelect>
                </FormControl>
              </Box> */}
            </Stack>
          </Box>
        </div>
      </nav>
    </div>
  );

}
export default NavBar