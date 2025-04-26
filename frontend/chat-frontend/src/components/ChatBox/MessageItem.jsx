import { Avatar, Box, Stack, Typography } from "@mui/material";

const MessageItem = ({ msg, userId }) => {
  const isMe = msg.userId === userId;

  return (
    <Box mb={2}>
      <Stack direction="row" spacing={1} justifyContent={isMe ? "flex-start" : "flex-end"} alignItems="center">
        {isMe && <Avatar>Me</Avatar>}
        <Box sx={{ backgroundColor: isMe ? "primary.light" : "success.light", padding: 1.5, borderRadius: 2, maxWidth: "70%" }}>
          <Typography>{msg.text}</Typography>
          {msg.files && msg.files.map((file, idx) => (
            <Box key={idx} mt={1}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
            </Box>
          ))}
          <Typography variant="caption" color="text.secondary">
            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        </Box>
        {!isMe && <Avatar>O</Avatar>}
      </Stack>
    </Box>
  );
};

export default MessageItem;
