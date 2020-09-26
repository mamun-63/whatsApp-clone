import { Avatar, IconButton } from '@material-ui/core'
import { Mic, AttachFile, InsertEmoticon, InsertEmoticonOutlined, MoreVert, SearchOutlined } from '@material-ui/icons'
import userEvent from '@testing-library/user-event'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import db from './firebase'
import firebase from 'firebase'
import { useStateValue } from './StateProvider'

function Chat() {
  const [input, setInput] = useState("")
  const [seed, setSeed] = useState("")
  // useParams is used in which components we try to upgrade
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState("")
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()

  
  useEffect(() => {
    // grabbing the roomName based upon clicking on chat roomId
    if (roomId) {
      db.collection("rooms").doc(roomId).onSnapshot((snapshot) => (
        setRoomName(snapshot.data().name)
      ))

      // grabbing the messages collection from database
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => 
        setMessages(snapshot.docs.map(doc => doc.data())
      ))
    }
  }, [roomId])

  
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  },[roomId])

  // grabing the input field value
  const sendMessage = (e) => {
    e.preventDefault()  
    console.log("You typed >> ", input)
    

    // push the input field message into database
    db.collection('rooms').doc(roomId).collection('messages').add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("")  // clearing the input to grab another value

  }


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {''} {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() }</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(message => (
          // its okay to use name to compare, but two may have same name, so production level its better to use id, but we're good now for demo purposes
          <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`} >
            <span className="chat__name">{message.name}</span>  
            {message.message}
            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonOutlined />
        <form action="">  
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
