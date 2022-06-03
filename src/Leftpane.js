import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Chatlist from './Chatlist'
import db from './firebase'
import './Leftpane.css'
import { useStateValue } from './StateProvider'


function Leftpane() {
    const [{user}, dispatch] = useStateValue();
    const [rooms,setRooms] = useState([{id:1,data:{name:"room1"}}]);
    
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
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className='search'>
            <div className='searchContainer'>
                <SearchOutlined/>
                <input placeholder='Search or start new chat' type='text'></input>
            </div>
        </div>
        <div className='chatList'>
            <Chatlist newChat={true}/>
            {
                rooms.map(room =>(
                    <Chatlist key={room.id} id={room.id} name={room.data.name}/>
                ))
            }
        </div>  
    </div>
  )
}

export default Leftpane