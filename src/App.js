import React, { useState , useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import db from "./firebase";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    //onSnapshot is like snapshot anytime when there is some change in db it will pull all out in variable snapshot below

    //snapshot.map get all docs loop through them and give each document data and it would be object

    //orderby timestamp recent things will come at top
    
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id , message: doc.data()})))
    });
  },[])


  useEffect(() => {
    setUsername(prompt('Please enter name: '))
  },[])
  
  const sendMessage = (event) => {
    event.preventDefault(); //will not refresh
    db.collection('messages').add({
      message: input,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
      //serverTimezone which location we selected to host our database
    })
    setInput("");
  };


  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100" />
      <h1>Messenger Clone <span role="img" aria-label={'rocket'}>🚀</span></h1>
      {/* if enter is not working wrap inside form tag and add type="submit" in button but it refreshes screen so add prevent Defualt*/}

      <form className="app__form">
        <FormControl className="app__formControl">
            
            <Input
              className="app__input"
              placeholder="Enter a message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />


            <IconButton className="app__iconButton" disabled={!input}
              onClick={sendMessage} type="submit" color="primary" variant="contained">
                <SendIcon />
              </IconButton>

            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon></SendIcon>}
              type="submit"
              disabled={!input}
              onClick={sendMessage}
            >
            </Button> */}

        </FormControl>
      </form>

      <FlipMove>
      {messages.map(({id,message}) => (
        <Message key={id} username={username} message={message} />
      ))}
      </FlipMove>

    </div>
  );
}

export default App;
