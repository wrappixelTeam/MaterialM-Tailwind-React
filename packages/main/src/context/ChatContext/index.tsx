
import  { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { ChatsType, MessageType } from '../../types/apps/chat';
import React from "react";
import useSWR, { mutate } from 'swr';
import { getFetcher, postFetcher } from 'src/api/globalFetcher';
import useSWRMutation from 'swr/mutation';
import { http, HttpResponse } from 'msw';
import ChatData from 'src/api/chat/Chatdata';
import { uniqueId } from 'lodash';

// All Mocked Apis
export const Chathandlers = [

    //  Api endpoint to get chats
    http.get('/api/data/chat/ChatData',() => {
      return HttpResponse.json([200, ChatData])
    }),
  
    //  Api endpoint to add message
    http.post('/api/sendMessage', async ({request}) => {
       try{
        const { chatId, message } = await request.json() as {chatId:number , message:string};
        if (!chatId || !message) {
          return HttpResponse.json([400, { error: 'Invalid request. Missing parameters.' }]);
        }
    
        // Simulate creating a new message
        const newMessage :any = {
          id: Math.random(), // Use a random ID for simplicity
          senderId: uniqueId(), // Generate a new senderId
          msg: message,
          createdAt: new Date().toISOString(),
          type: 'text', // Assuming the message type is text for simplicity
          attachment: [], // No attachment initially
        };
    
        // Find the chat by chatId and push the new message
        const chat = ChatData.find((chat) => chat.id === chatId);
        if (chat) {
          chat.messages.push(newMessage);
        } else {
          return HttpResponse.json([404, { error: 'Chat not found.' }]);
        }
    
        return HttpResponse.json([201, newMessage]);
       }catch(error){
        return HttpResponse.json([400, { error: 'Invalid JSON data format.' }])
       }
    })
  ]

// Define context props interface
export interface ChatContextProps {
    chatData: ChatsType[];
    chatContent: any[];
    chatSearch: string;
    selectedChat: ChatsType | null;
    loading: boolean;
    error:string;
    activeChatId: number | null;
    setChatContent: Dispatch<SetStateAction<any[]>>;
    setChatSearch: Dispatch<SetStateAction<string>>;
    setSelectedChat: Dispatch<SetStateAction<ChatsType | null>>;
    setActiveChatId: Dispatch<SetStateAction<number | null>>;
    sendMessage: (chatId: number | string, message: MessageType) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string>>;
}

// Create the context
export const ChatContext = createContext<ChatContextProps>({
    chatData: [],
    chatContent: [],
    chatSearch: '',
    selectedChat: null,
    loading: true,
    error:'',
    activeChatId: null,
    setChatContent: () => { },
    setChatSearch: () => { },
    setSelectedChat: () => { },
    setActiveChatId: () => { },
    sendMessage: () => { },
    setLoading: () => { },
    setError: () => { },
});

// Create the provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chatData, setChatData] = useState<ChatsType[]>([]);
    const [chatContent, setChatContent] = useState<any[]>([]);
    const [chatSearch, setChatSearch] = useState<string>('');
    const [selectedChat, setSelectedChat] = useState<ChatsType | null>(null);
    const [activeChatId, setActiveChatId] = useState<number | null>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const {data:ChatsData,isLoading:isChatsLoading,error:Chatserror} = useSWR('/api/data/chat/ChatData', getFetcher);

    // Fetch chat data from the API
    useEffect(() => {
        if(ChatsData){
            setLoading(isChatsLoading);
            let chatsData = ChatsData[1];
            setChatData(chatsData);
            if (ChatsData.length > 0) {
                let specificChat = chatsData[0];
                setSelectedChat(specificChat);
            }
        }else{
            setLoading(isChatsLoading);
            console.log("Failed to fetch the data")
        }
        if(Chatserror){
            setError(Chatserror)
        }
    }, [ChatsData]);

    // Function to send a message to a chat identified by `chatId` using an API call.
    const {trigger:sendMessageTrigger} = useSWRMutation(`/api/sendMessage` , postFetcher);

    const sendMessage = async (chatId: number | string, message: MessageType) => {
        try {
            // Send message via API
            const response = await sendMessageTrigger({
                chatId,
                message,
            });

            let status = response[0];

            if (status === 201) {
                // Update local state if API call succeeds
                const newMessage: MessageType = response[1];
                setSelectedChat((prevChat) => {
                    return ({
                    ...prevChat!,
                    messages: [...prevChat!.messages, newMessage],
                })});
                setChatData((prevChats) =>
                    prevChats.map((chat) =>
                        chat.id === chatId
                            ? { ...chat, messages: [...chat.messages, newMessage] }
                            : chat
                    )
                );
            } else {
                console.error('Failed to send message: dada',response);
            }
            mutate('/api/data/chat/ChatData');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const value: ChatContextProps = {
        chatData,
        chatContent,
        chatSearch,
        selectedChat,
        loading,
        error,
        activeChatId,
        setChatContent,
        setChatSearch,
        setSelectedChat,
        setActiveChatId,
        sendMessage,
        setError,
        setLoading,
    };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export type { ChatsType };

