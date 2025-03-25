import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [chattingWith, setChattingWith] = useState('Seller123');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // Add a ref for the messages container

    const initialMessages = [
        { id: 1, sender: 'Seller123', text: 'Hello! I saw you were interested in the Premium Skin Bundle?', time: '10:30 AM', isReceived: true },
        { id: 2, sender: 'You', text: 'Yes, I wanted to ask about the delivery time', time: '10:32 AM', isReceived: false },
        { id: 3, sender: 'Seller123', text: 'It\'s instant delivery after payment confirmation!', time: '10:33 AM', isReceived: true },
    ];

    useEffect(() => {
        setMessages(initialMessages);
        const mockSocket = {
            send: (data) => {
                console.log('Message sent via WebSocket:', data);
                setTimeout(() => {
                    const mockResponse = {
                        id: messages.length + 2,
                        sender: 'Seller123',
                        text: 'Thanks for your message! Can I help with anything else?',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isReceived: true
                    };
                    setMessages(prev => [...prev, mockResponse]);
                }, 1000);
            },
            close: () => console.log('WebSocket connection closed')
        };
        setSocket(mockSocket);
        setIsConnected(true);

        return () => {
            if (socket && socket.close) socket.close();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'You',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isReceived: false
        };

        setMessages(prev => [...prev, newMsg]);

        if (socket) {
            socket.send(JSON.stringify({
                message: newMessage,
                recipient: chattingWith,
                timestamp: new Date().toISOString()
            }));
        }

        setNewMessage('');
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0f172a] text-white relative overflow-hidden">
            {/* Background Effects */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3), transparent 70%)",
                    opacity: 0.4,
                }}
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
                    opacity: 0.3,
                }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            />
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`hex-chat-${i}`}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${20 + Math.random() * 40}px`,
                            height: `${20 + Math.random() * 40}px`,
                            opacity: 0.1 + Math.random() * 0.2,
                            background: i % 2 === 0 ? '#6366f1' : '#a855f7',
                            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                        }}
                        animate={{
                            opacity: [0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.2, 0.1 + Math.random() * 0.2],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>

            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.div
                    className="max-w-5xl mx-auto bg-gray-900/80 rounded-2xl overflow-hidden border border-[#6366f1]/30 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-gradient-to-r from-[#1e293b] to-[#1e1e3a] p-4 border-b border-[#6366f1]/30 flex items-center justify-between">
                        <div className="flex items-center">
                            <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold"
                                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)" }}
                            >
                                {chattingWith.charAt(0)}
                            </motion.div>
                            <div className="ml-3">
                                <h3 className="font-bold text-white">{chattingWith}</h3>
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                                    <span className="text-xs text-gray-400">{isConnected ? 'Online' : 'Offline'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <motion.button className="text-gray-400 hover:text-white p-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg>
                            </motion.button>
                            <motion.button className="text-gray-400 hover:text-white p-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 0 0 0 13 6.5 6.5 0 0 0 0-13zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
                                </svg>
                            </motion.button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div ref={messagesContainerRef} className="h-[60vh] overflow-y-auto p-6 bg-[#0f172a]/90">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                className={`mb-4 flex ${message.isReceived ? 'justify-start' : 'justify-end'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`max-w-[80%] ${message.isReceived ? 'order-2' : 'order-1'}`}>
                                    {message.isReceived && (
                                        <div className="text-xs text-gray-400 mb-1 ml-2">{message.sender}</div>
                                    )}
                                    <motion.div
                                        className={`rounded-2xl px-4 py-3 ${
                                            message.isReceived 
                                                ? 'bg-gray-700 text-gray-100'
                                                : 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <p>{message.text}</p>
                                        <div className={`text-xs mt-1 ${message.isReceived ? 'text-gray-400' : 'text-indigo-200'} text-right`}>
                                            {message.time}
                                        </div>
                                    </motion.div>
                                </div>
                                {message.isReceived && (
                                    <motion.div
                                        className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white text-xs font-bold mr-2 order-1"
                                        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)" }}
                                    >
                                        {message.sender.charAt(0)}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="bg-[#1e293b] p-4 border-t border-[#6366f1]/30">
                        <div className="flex items-center">
                            <motion.button type="button" className="flex-shrink-0 text-gray-400 hover:text-[#a855f7] mr-3" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                </svg>
                            </motion.button>
                            <motion.button type="button" className="flex-shrink-0 text-gray-400 hover:text-[#a855f7] mr-3" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                </svg>
                            </motion.button>
                            <input
                                type="text"
                                className="flex-grow bg-gray-800 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <motion.button
                                type="submit"
                                className="flex-shrink-0 ml-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full w-10 h-10 flex items-center justify-center"
                                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)" }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!newMessage.trim()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                </svg>
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                <motion.div
                    className="max-w-5xl mx-auto mt-8 bg-gray-900/80 rounded-xl p-6 border border-[#6366f1]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-xl font-bold text-white mb-4">About this Chat</h3>
                    <p className="text-gray-400 mb-4">
                        This chat is secured with end-to-end encryption. Only you and the person you're chatting with can read the messages.
                    </p>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">Connection Status</h4>
                        <div className="flex items-center text-sm">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                            <span>{isConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}</span>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Chat;