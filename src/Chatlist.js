import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chatlist.css'

function Chatlist({newChat}) {
    const [seed, setSeed] = useState('');
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*50000));
    }, []);

    const createChat = () =>{
        const chatName = prompt("Please enter the name of the chat");
        if(chatName)
        {
            //do somthing in the db here...
        }
    };
  
    return !newChat ? (
    <div className='chatlist'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='chatInfo'>
            <h2>Room name</h2>
            <p>Last message ...</p>
        </div>
    </div>
  ):(
      <div onClick={createChat} className='chatlist'>
          <h2>Add new chat</h2>
      </div>
  )
}

export default Chatlist