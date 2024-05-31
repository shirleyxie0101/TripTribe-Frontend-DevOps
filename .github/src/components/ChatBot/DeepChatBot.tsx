'use client';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { DeepChat as DeepChatCore } from 'deep-chat';
import { RequestDetails } from 'deep-chat/dist/types/interceptors';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';

import { LogoImage } from '@/icons/logo-image';
import { themePalette } from '@/styles/theme';

// TODO: enable prettier to format this file: single quotes

interface DeepChatBotProps {
  options: {
    isStreamingMode: boolean;
  };
}

const baseURL = process.env.NEXT_PUBLIC_REST_API_URL;

export default function DeepChatBot({ options }: DeepChatBotProps) {
  // hooks --------------------------------------------------------------------------------------------
  // Need to import the component dynamically as it uses the 'window' property.
  // If you have found a better way of adding the component in next, please create a new issue ticket so we can update the example!
  const DeepChat = dynamic(() => import('deep-chat-react').then((mod) => mod.DeepChat), {
    ssr: false,
  });

  const chatbotTriggerRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // handlers -----------------------------------------------------------------------------------------

  const toggleChatBoxVisibility = () => {
    if (chatBoxRef.current && chatbotTriggerRef.current) {
      // Toggle the display style between 'none' and 'block'
      chatBoxRef.current.style.display =
        chatBoxRef.current.style.display === 'none' ? 'block' : 'none';
      chatbotTriggerRef.current.style.display =
        chatBoxRef.current.style.display === 'none' ? 'block' : 'none';
    }
  };

  // jsx ----------------------------------------------------------------------------------------------
  const deepChatHeader = (
    <div className="flex flex-row justify-between items-center p-2  rounded-tl rounded-tr bg-primary-light">
      <div className="flex flex-row gap-2 items-center">
        <div className="w-10">
          <LogoImage />
        </div>
        <span className="text-white font-bold">TripTribe Bot</span>
      </div>

      <IconButton
        onClick={toggleChatBoxVisibility}
        aria-label="chatbot-window-close"
      >
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </div>
  );

  const deepChatBox = options.isStreamingMode ? (
    <DeepChat
      chatStyle={{ border: 'none', borderRadius: '10px' }}
      messageStyles={{
        default: {
          ai: { bubble: { backgroundColor: themePalette.primary.light, color: 'white' } },
        },
      }}
      introMessage={{ text: 'Send a streamed chat message to an example server.' }}
      // request={{ url: '/api/custom/chat-stream' }}
      request={{ url: `${baseURL}/chatbot/chat-stream` }}
      stream={true}
    />
  ) : (
    <DeepChat
      chatStyle={{ border: 'none', borderRadius: '10px' }}
      messageStyles={{
        default: {
          ai: { bubble: { backgroundColor: themePalette.primary.light, color: 'white' } },
        },
      }}
      introMessage={{ text: 'Send a chat message to an example server.' }}
      // request={{ url: '/api/custom/chat' }}
      request={{ url: `${baseURL}/chatbot/chat` }}
      requestBodyLimits={{ maxMessages: -1 }}
      requestInterceptor={(details: RequestDetails) => {
        console.log(details);
        return details;
      }}
      responseInterceptor={(response: any) => {
        console.log(response);
        return response;
      }}
    />
  );

  return (
    <div className="flex flex-col items-center justify-between p-24">
      {/* chatbot trigger */}
      <div
        ref={chatbotTriggerRef}
        style={{ display: 'block' }}
        className="fixed right-5 bottom-12 z-1000 w-26"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="relative bg-primary-light rounded-lg p-2">
            <span className="text-white font-bold triangle-pointer">talk to me!</span>
          </div>

          <button
            className="bg-primary-light rounded-full w-20 h-20 hover:bg-primary hover:cursor-pointer"
            aria-label="chatbot-trigger"
            onClick={toggleChatBoxVisibility}
          >
            <LogoImage />
          </button>
        </div>
      </div>

      {/* chat window */}
      <div
        className="fixed right-5 bottom-12 z-[10000] bg-white rounded"
        ref={chatBoxRef}
        style={{ display: 'none', boxShadow: '0 2px 4px #0003' }}
        role="dialog"
        aria-label="chatbot-window"
      >
        {deepChatHeader}
        {deepChatBox}
      </div>
    </div>
  );
}
