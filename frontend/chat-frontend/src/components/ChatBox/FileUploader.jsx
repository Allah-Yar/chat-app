// import { Box, Typography } from "@mui/material";

// const FileUploader = ({ getRootProps, getInputProps }) => (
//   <Box {...getRootProps()} sx={{ border: "2px dashed", padding: 2, borderRadius: 2 }}>
//     <input {...getInputProps()} />
//     <Typography variant="body2">Drag and drop files here, or click to select</Typography>
//   </Box>
// );

// export default FileUploader;

import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";  // Import useDropzone hook

const FileUploader = () => {
  const { getRootProps, getInputProps } = useDropzone();  // Call the hook here

  return (
    <Box {...getRootProps()} sx={{ border: "2px dashed", padding: 2, borderRadius: 2 }}>
      <input {...getInputProps()} />
      <Typography variant="body2">Drag and drop files here, or click to select</Typography>
    </Box>
  );
};

export default FileUploader;
