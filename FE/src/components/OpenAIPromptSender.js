// import React, { useState } from 'react';
// import { Button, TextField, Paper, ListItem, ListItemText } from '@material-ui/core';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//     apiKey: process.env.GROWTH_HUB_OPENAI_API_KEY, // Replace 'your_api_key' with your actual API key
    //    enableDangerous: "true"
// });

// const OpenAIPromptSender = () => {
//     console.log('API Key:', process.env.GROWTH_HUB_OPENAI_API_KEY);

//     const [prompt, setPrompt] = useState('');
//     const [response, setResponse] = useState('');

//     const handleSendPrompt = async () => {
//         try {
//             const completion = await openai.chat.completions.create({
//                 messages: [{ role: "user", content: prompt }],
//                 model: "gpt-3.5-turbo",
//             });
//             setResponse(completion.choices[0].message.content);
//         } catch (error) {
//             console.error('Error sending prompt to OpenAI:', error);
//             setResponse('Failed to fetch response.');
//         }
//     };

//     return (
//         <div>
//             <TextField
//                 fullWidth
//                 label="Enter your prompt"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 margin="normal"
//             />
//             <Button variant="contained" color="primary" onClick={handleSendPrompt} style={{ margin: '10px' }}>
//                 Send Prompt
//             </Button>
//             {response && (
//                 <Paper style={{ padding: '10px', marginTop: '20px' }}>
//                     <ListItem>
//                         <ListItemText primary="API Response" secondary={response} />
//                     </ListItem>
//                 </Paper>
//             )}
//         </div>
//     );
// };

// export default OpenAIPromptSender;
