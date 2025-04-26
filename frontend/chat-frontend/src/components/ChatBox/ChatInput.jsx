import { Box, Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({ input, handleInputChange, sendMessage, showEmojiPicker, setShowEmojiPicker, handleEmojiClick }) => (
  <Stack direction="row" spacing={1} position="relative">
    <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
      <EmojiEmotionsIcon />
    </IconButton>
    {showEmojiPicker && (
      <Box sx={{ position: "absolute", zIndex: 1000 }}>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Box>
    )}

    <TextField
      value={input}
      onChange={handleInputChange}
      placeholder="Type a message"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <AddCircleOutlineIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <Button variant="contained" onClick={sendMessage}>Send</Button>
  </Stack>
);

export default ChatInput;
