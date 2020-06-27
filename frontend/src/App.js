import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(3),
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 960,
    marginTop: "auto",
  },
  formInputs: {
    display: "flex",
  },
  messages: {
    overflow: "auto",
    float: "bottom",
  },
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

const Messages = ({ messages, className }) => {
  const classes = useStyles();
  return (
    <List className={className}>
      <div className={classes.messagesBox}>
        {messages.map((message, i) => (
          <ListItem key={i}>
            <Message message={message} />
          </ListItem>
        ))}
      </div>
    </List>
  );
};

const Message = ({ message }) => (
  <div>
    <ListItemText
      secondary={
        <div>
          {message.userId}:&nbsp;
          <Typography
            component="span"
            variant="body2"
            display="inline"
            color="textPrimary"
          >
            {message.text}
          </Typography>
        </div>
      }
    />
  </div>
);

const socket = socketIOClient("/");

const App = () => {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("NEW_MESSAGE", (message) => {
      setMessages((messages) => [message].concat(messages));
    });
    return () => socket.off("NEW_MESSAGE");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("NEW_MESSAGE", messageInput);
    setMessageInput("");
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Messages className={classes.messages} messages={messages} />

      <form className={classes.form} onSubmit={handleSendMessage}>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginBottom: 2 }}
        >
          <Grid item xs={12}>
            <div className={classes.formInputs}>
              <TextField
                fullWidth
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button type="submit">send</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default App;
