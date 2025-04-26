import { Avatar, Stack, Typography } from "@mui/material";

const TypingIndicator = ({ typingUsers, userId }) => (
  <>
    {Object.keys(typingUsers).map(
      (id) => typingUsers[id] && (
        <Stack key={id} direction="row" spacing={1} justifyContent={id === userId ? "flex-start" : "flex-end"} alignItems="center">
          <Avatar sx={{ width: 24, height: 24 }}>...</Avatar>
          <Typography variant="body2">Typing...</Typography>
        </Stack>
      )
    )}
  </>
);

export default TypingIndicator;
