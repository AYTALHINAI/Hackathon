import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "./Sidebar";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "السلام عليكم, كيف تساعدني انته ؟",
      sender: "user",
      timestamp: "12:44pm"
    },
    {
      id: 2,
      text: "هل تريد أن أكتبها لك أيضًا بشكل رسمي أكثر لتكون مناسبة كإيميل دعوة؟",
      sender: "bot",
      timestamp: "12:44pm"
    },
    {
      id: 3,
      text: "الأداء والتطوير هو القسم المسؤول عن متابعة وتقييم أداء الموظفين بشكل دوري، وتحديد نقاط القوة وفرص التحسين، والعمل على وضع خطط وبرامج تدريبية لتطوير مهاراتهم وقدراتهم بما يحقق أهداف المؤسسة ويرفع من كفاءتها واستدامة نجاحها.",
      sender: "bot",
      timestamp: "12:44pm"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "شكراً لك على رسالتك. سأقوم بالرد عليك في أقرب وقت ممكن.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col"
        >
                 {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.6 }}
           className="mb-8"
         >
           <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
             الاستفسارات الرد التفاعلي
           </h1>
           <p className="text-gray-600 dark:text-gray-400 text-lg">
             الرد على استفسارات الموظفين بسرعة وفعالية لضمان تجربة تواصل سلسة.
           </p>
         </motion.div>

         {/* Chat Container */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className={`flex-1 rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800`}
         >
                     {/* Messages Area */}
           <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative group ${
                      message.sender === "user"
                        ? `${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-700'} text-white`
                        : `${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`
                    }`}
                  >
                    {/* Message Icon */}
                    <div className={`absolute -top-2 ${message.sender === "user" ? "-left-2" : "-right-2"} w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-blue-500" 
                        : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      {message.sender === "user" ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-gray-600" />
                      )}
                    </div>
                    
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    {/* Timestamp */}
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}>
                      {message.timestamp}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex justify-start"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    <div className="flex space-x-1 space-x-reverse">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                className="flex-1 relative"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="تكلم مع هذا الشي..."
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                />
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  inputMessage.trim()
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
                                            </motion.button>
             </div>
           </motion.div>
         </motion.div>
       </motion.div>
     </main>
   </div>
  );
};

export default ChatBot;
