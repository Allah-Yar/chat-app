import { Box, Paper, Stack } from "@mui/material";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, userId }) => (
  <Paper elevation={3} sx={{ height: "400px", padding: 2, overflowY: "auto", borderRadius: 2 }}>
    {messages.map((msg, i) => (
      <MessageItem key={i} msg={msg} userId={userId} />
    ))}
  </Paper>
);

export default MessageList;
