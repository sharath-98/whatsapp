import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Chatlist.css'
import db from './firebase';
import firebase from "firebase"

function Chatlist({newChat, id, name}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);
    /*
       useEffect(() => {
            if(id){
                db.collection('rooms').doc(id).collection('messages').get()
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
                })
            }
        }, [id]);
        */
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*50000));
    }, []);

    const createChat = async () =>{
        const newChatName = prompt("Please enter the name of the chat");
        if(newChatName!="")
        {
            const doc_ref = await db.collection("rooms").add({
                name:newChatName
            });

            db.collection("rooms").doc(doc_ref.id).collection("messages")
            .add({
                message:"This is an auto-generated message, a new Chat Room is created. Happy chatting!",
                name:"System",
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                })
        }
    };
  
    return !newChat ? (
    <Link to={`/users/${id}`} key={id}>
        <div className='chatlist'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chatInfo'>
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
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