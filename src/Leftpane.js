import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import Chatlist from './Chatlist'
import './Leftpane.css'

function Leftpane() {
  return (
    <div className='leftpane'>
        <div className='header'>
            <Avatar/>
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
            <Chatlist/>
            <Chatlist/>
            <Chatlist/>

        </div>  
    </div>
  )
}

export default Leftpane