'use client';

import { Box, Button, Stack, TextField, CircularProgress, IconButton } from '@mui/material';
import { Send as SendIcon, SupportAgent as SupportAgentIcon, Person as PersonIcon } from '@mui/icons-material';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages
    setIsLoading(true);
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#282c34"
      p={3}
    >
      <Stack
        direction="column"
        width="500px"
        height="700px"
        borderRadius={8}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        bgcolor="white"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          p={1}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              {message.role === 'assistant' ? (
                <SupportAgentIcon sx={{ color: 'primary.main', mr: 1 }} />
              ) : (
                <PersonIcon sx={{ color: 'secondary.main', mr: 1 }} />
              )}
              <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="75%"
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Type your message..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              style: {
                color: '#333', // Set text color
              },
            }}
            InputLabelProps={{
              style: {
                color: 'gray', // Set label color
              },
            }}
            variant="outlined"
            sx={{
              bgcolor: 'white',
              borderRadius: '8px',
            }}
          />
          <IconButton color="primary" onClick={sendMessage} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
