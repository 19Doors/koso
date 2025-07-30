"use client";
import { useEffect, useRef, useState } from "react";
import { ModelSelector } from "./ModelSelector";
import { messageAnimations } from "@/utils/animations";
import gsap from "gsap";
import Markdown from "react-markdown";
import { Flip } from "gsap/Flip";
import { chat } from "@/lib/gemini";
import { SplitText } from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(Flip, SplitText, ScrambleTextPlugin);
export function MessageBlock() {
  const containerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const welcomeRef = useRef(null);
  const chatRef = useRef(null);
  const messagesRef = useRef(new Array());
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

const animateAIMessage = (element) => {
  // Get all text-containing elements in markdown
  const textElements = element.querySelectorAll(`
    p, li, h1, h2, h3, h4, h5, h6, 
    blockquote, code, pre, strong, em, 
    td, th, figcaption, span
  `);
  
  // Filter out empty elements
  const validElements = Array.from(textElements).filter(el => 
    el.textContent.trim().length > 0
  );
  
  if (validElements.length > 0) {
    // Create timeline for better control
    const tl = gsap.timeline();
    
    validElements.forEach((el, index) => {
      tl.to(el, {
        duration: 0.8,
        scrambleText: {
          text: el.textContent,
          chars: "lowerCase",
          revealDelay: 0.2,
          speed: 0.5
        }
      }, index * 0.1); // Start each 0.1s after the previous
    });
  }
};
  // const animateAIMessage = (element) => {
  //   const textElement = element.querySelector("p") || element;
  //   if (textElement && textElement.textContent) {
  //     gsap.to(textElement, {
  //       duration: 1.0,
  //       scrambleText: textElement.textContent,
  //     });
  //   }
  // };

  useEffect(() => {
    if (chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      const lastMessageIndex = chatMessages.length - 1;
      const msg = messagesRef.current[lastMessageIndex];
      if(msg) {
	msg.scrollIntoView({
	  behaviour: "smooth",
	  block: "end"
	});
      }

      if (lastMessage.role == "assistant") {
        const msgElement = messagesRef.current[lastMessageIndex];
        if (msgElement) {
          animateAIMessage(msgElement);
        }
        // setTimeout(()=>{
        //   const msgElement = messagesRef.current[lastMessageIndex];
        //   if(msgElement) {
        //     animateAIMessage(msgElement)
        //   }
        // }, 100);
      }
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (!message.trim() || !selectedModel) {
      alert("Please enter a message and select a model");
      return;
    }
    if (!isExpanded) {
      setIsExpanded(true);
    }
    gsap.to(welcomeRef.current, {
      opacity: 0,
      ease: "power1.in",
      duration: 0.3,
    });

    const newUserMessage = { content: message, role: "user" };
    let updatedMessages = [...chatMessages, newUserMessage];
    setChatMessages((prev) => updatedMessages);
    setMessage("");
    let aiMessage = await chat(updatedMessages, selectedModel.id);
    updatedMessages = [...updatedMessages, aiMessage];
    setChatMessages((prev) => updatedMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={containerRef}
      className={
        isExpanded
          ? "w-full h-full flex justify-center items-center"
          : "w-full h-full flex justify-center items-center"
      }
    >
      <div ref={inputContainerRef} className="text-center w-1/3 space-y-2">
        <h1 ref={welcomeRef} className="font-inter text-2xl font-bold mb-4">
          Welcome Back!
        </h1>

        {isExpanded && (
          <div ref={chatRef} className="w-full max-h-[50vh] overflow-auto">
            <div className="p-4 space-y-5 font-inter">
              {chatMessages.map((msg, index) => (
                <div
                  key={msg.content}
                  className={`text-justify flex flex-col w-full border-b ${msg.role == "user" ? "font-bold" : ""}`}
                  ref={(element) => {
                    messagesRef.current[index] = element;
                  }}
                >
                  <Markdown>{msg.content}</Markdown>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full flex flex-col border p-3 space-y-2 rounded-sm text-left shadow-inner shadow-black/20">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask away"
            className="h-8 resize-none w-full outline-none font-inter placeholder:font-inter placeholder:font-bold"
            rows={1}
          />

          <div className="font-inter flex justify-between items-center">
            <ModelSelector onModelChange={setSelectedModel} />
            <button
              className="text-sm cursor-pointer hover:opacity-70 transition-opacity"
              onClick={handleSend}
              disabled={!message.trim() || !selectedModel}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
