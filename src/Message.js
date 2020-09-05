import React, { forwardRef } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
// BEM convention component__element here message__userCard
//forwardRef will keep track for messages (for animation). It is a higher order function
  return (
    <div ref={ref} className={`message ${isUser && "message__user"} `}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {/* If we use it dont show our name just show guest names */}
            {!isUser && `${message.username || 'Unknown User'}: `}{message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
})

export default Message;
