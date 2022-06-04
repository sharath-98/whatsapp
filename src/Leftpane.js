import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@material-ui/core'
import { Chat, DonutLarge, ExitToAppOutlined, MoreVert, PersonAdd, SearchOutlined, Settings } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Chatlist from './Chatlist'
import db, { auth } from './firebase'
import './Leftpane.css'
import { useStateValue } from './StateProvider'
import {Fragment} from "react"
import { useNavigate } from 'react-router-dom'


function Leftpane() {
    const [{user}, dispatch] = useStateValue();
    const [rooms,setRooms] = useState([{id:1,data:{name:"room1"}}]);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    useEffect(()=>
    {
        db.collection("rooms").onSnapshot((snapshot)=>
        setRooms(
            snapshot.docs.map((doc) => ({
                id:doc.id,
                data:doc.data(),
            }))
        )
        );
    },[]);

    const signOut = () =>{
        if(user){
            auth.signOut().then(()=> {
            dispatch({
                type:"SET_USER",
                user:null
            });
        })
            navigate('/');
        }
    }

    const filterData = (e) =>{
        setSearchTerm(e.target.value);
    } 

  return (
    <div className='leftpane'>
        <div className='header'>
            <Avatar src={user?.photoURL}/>
            <div className='user_info'>
                <h5>{user?.displayName}</h5>
                <p>{user?.email}</p>
            </div>
            <div className='header_right'>
                <IconButton>
                    <DonutLarge/>
                </IconButton>
                <IconButton>
                    <Chat/>
                </IconButton>
                <Fragment>
                    <Tooltip title="Account settings">
                    <IconButton onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        <MoreVert/>
                    </IconButton>
                    </Tooltip>
                 <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
         
                    <MenuItem>
                    <Avatar src={user?.photoURL}/> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                    </MenuItem>
                    <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                    </MenuItem>
                    <MenuItem onClick={signOut}>
                    <ListItemIcon >
                        <ExitToAppOutlined fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>
                </Menu>
            </Fragment>
            </div>
        </div>
        <div className='search'>
            <div className='searchContainer'>
                <SearchOutlined/>
                <input placeholder='Search or start new chat' onChange={filterData} type='text'></input>
            </div>
        </div>
        <div className='chatList'>
            <Chatlist newChat={true}/>
            {
                rooms.filter((room) => {
                    if(searchTerm=="")
                    {
                        return room;
                    }
                    else if(room.data.name.toLowerCase().startsWith(searchTerm.toLowerCase())){
                        return room;
                    }
                }).map(room =>(
                    <Chatlist key={room.id} id={room.id} name={room.data.name}/>
                ))
            }
        </div>  
    </div>
  )
}

export default Leftpane