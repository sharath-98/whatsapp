import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Chatlist.css'
import db from './firebase';

function Chatlist({newChat, id, name}) {
    const [seed, setSeed] = useState('');
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*50000));
    }, []);

    const createChat = () =>{
        const newChatName = prompt("Please enter the name of the chat");
        if(newChatName)
        {
            db.collection("rooms").add({
                name:newChatName
            });
        }
    };
  
    return !newChat ? (
    <Link to={`/users/${id}`}>
        <div className='chatlist'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chatInfo'>
                <h2>{name}</h2>
                <p>Last message ...</p>
            </div>
        </div>
    </Link>
  ):(
      <div onClick={createChat} className='chatlist'>
          <h2>Add new chat</h2>
      </div>
  )
}

export default Chatlist