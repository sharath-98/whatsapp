import { Avatar, IconButton, Popover } from '@material-ui/core'
import { AttachFile, EmojiEmotions, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'
import Picker from 'emoji-picker-react';
import EmojiPicker from 'emoji-picker-react';

function Chat() {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [{user}, dispatch] = useStateValue();
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {userId} = useParams();
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState([]);

    const [show, setShow] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setInput(input + emojiObject.emoji);
  };

  

    useEffect(()=>{
        if(userId){
            console.log(userId)
            db.collection("rooms").doc(userId).onSnapshot(snapshot => 
                setUserName(snapshot.data().name));
            
                db.collection("rooms").doc(userId).collection("messages").orderBy('timestamp','asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc=>doc.data()))
                ))
            setSeed(Math.floor(Math.random() * 50000));
            setInput("");
        }
    }, [userId]);

    const sendMessage = (e) =>{
       e.preventDefault();
       db.collection("rooms").doc(userId).collection("messages")
       .add({
         message:input,
         name:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
       setInput("");
    };


  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='user_info'>
                <h3>{userName}</h3>
                <p className='chat-room-last-seen'>
                        Last Seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
            </div>
            <div className='chat_header_right'>
                <IconButton><SearchOutlined/></IconButton>
                <IconButton><AttachFile/></IconButton>
                <IconButton><MoreVert/></IconButton>
            </div>
        </div>
        <div className='chat_body'>
            {
                messages.map(msg => (
                    <p  className={`message ${ msg.name === user.displayName && 'receiver'}`}>
                    <span className='message_user_name'>{msg.name}</span>
                    {msg.message}
                    <span className='message_time'>
                        {new Date(msg.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))
            }
        </div>
        <div className='chat_footer'>
                <EmojiEmotions onClick={()=>{setShow(!show)}}/>
                <form onSubmit={sendMessage}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit"> Send a Message</button>
                </form>
                <Mic/>
                
        </div>
        <div className='emoji'>
              {
                  show? <EmojiPicker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }}/> : null
              }
          </div>
        
    </div>
  )
}

export default Chat