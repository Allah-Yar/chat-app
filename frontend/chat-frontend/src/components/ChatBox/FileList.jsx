// // import { Box, LinearProgress, Stack, Typography } from "@mui/material";

// // const FileList = ({ files, uploadingFiles }) => {
// //   if (!files.length) return null;

// //   return (
// //     <Box mt={2}>
// //       <Typography variant="h6">Files:</Typography>
// //       <Stack spacing={1}>
// //         {files.map((file, i) => (
// //           <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
// //             <Typography>{file.name}</Typography>
// //             {uploadingFiles.find((f) => f.file.name === file.name) && (
// //               <LinearProgress
// //                 variant="determinate"
// //                 value={uploadingFiles.find((f) => f.file.name === file.name)?.progress || 0}
// //               />
// //             )}
// //           </Box>
// //         ))}
// //       </Stack>
// //     </Box>
// //   );
// // };

// // export default FileList;

// import { Box, LinearProgress, Stack, Typography } from "@mui/material";

// const FileList = ({ files, uploadingFiles = [] }) => {
//   // If no files, show a message or return null
//   if (!files.length) {
//     return (
//       <Box mt={2}>
//         <Typography variant="h6">No files to display</Typography>
//       </Box>
//     );
//   }

//   // Create a map of uploading files for faster lookup
//   const uploadingFilesMap = uploadingFiles.reduce((acc, f) => {
//     acc[f.file.name] = f;
//     return acc;
//   }, {});

//   return (
//     <Box mt={2}>
//       <Typography variant="h6">Files:</Typography>
//       <Stack spacing={1}>
//         {files.map((file, i) => (
//           <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
//             <Typography>{file.name}</Typography>
//             {uploadingFilesMap[file.name] && (
//               <LinearProgress
//                 variant="determinate"
//                 value={uploadingFilesMap[file.name]?.progress || 0}
//               />
//             )}
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default FileList;
