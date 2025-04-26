import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ChatHeader = ({ chatMode, room, setRoom, recipientId, setRecipientId, onlineUsers }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{chatMode === "room" ? "Chat Room" : "Select User"}</InputLabel>
      <Select
        value={chatMode === "room" ? room : recipientId}
        onChange={(e) => chatMode === "room" ? setRoom(e.target.value) : setRecipientId(e.target.value)}
        label={chatMode === "room" ? "Chat Room" : "Select User"}
      >
        {chatMode === "room" ? (
          ["general", "dev", "fun"].map((r) => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))
        ) : (
          onlineUsers.map((id) => (
            <MenuItem key={id} value={id}>{id}</MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default ChatHeader;
