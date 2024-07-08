import getChatbotResponse from '@/utils/geminiChat';
import React, { useState, useRef, useEffect } from 'react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?', sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const newMessages = [...messages, { text: inputValue, sender: 'user' }];
      setMessages(newMessages);
      setInputValue('');

      // setTimeout(() => {
      //   generateBotResponse(inputValue, newMessages);
      // }, 500); // Simulate delay for bot response


     let Response= await getChatbotResponse(inputValue)
     generateBotResponse (Response,newMessages)

    }
  };

  const generateBotResponse = (botResponse: string, updatedMessages: { text: string, sender: string }[]) => {
    // let botResponse = 'I\'m not sure how to respond to that.';

    // if (userMessage.toLowerCase().includes('hello')) {
    //   botResponse = 'Hello! How can I assist you today?';
    // } else if (userMessage.toLowerCase().includes('help')) {
    //   botResponse = 'Sure, what do you need help with?';
    // } else if (userMessage.toLowerCase().includes('bye')) {
    //   botResponse = 'Goodbye! Have a great day!';
    // }

    setMessages([...updatedMessages, { text: botResponse, sender: 'bot' }]);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      <div
        className="fixed bottom-6 right-6 w-12 h-11 cursor-pointer"
        onClick={toggleChat}
      >
        <img src="/travel-bot.png" alt="Chat Bot" className="w-full h-full" />
      </div>
      {isOpen && (
        <div className="text-xs fixed bottom-24 right-6 max-sm:w-[70%] max-sm:h-[325px] w-80 h-96 bg-white shadow-lg flex flex-col rounded-lg bg-opacity-0 backdrop-blur-2xl">
          <div className="flex justify-between items-center p-4 bg-purple-500 text-white rounded-t-lg">
            <span>Chat with us!</span>
            <button onClick={toggleChat} className="text-white">X</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-2 py-1 rounded-lg ${message.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-lg"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button 
              className="mt-2 w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-500"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
