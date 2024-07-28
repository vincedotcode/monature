"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { chatWithAi } from "@/services/ai";
import Loader from "@/components/loader";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatComponent() {
  const [messages, setMessages] = useState<{ content: string; role: string; timestamp: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const timestamp = new Date().toLocaleTimeString();
    setMessages([...messages, { content: inputMessage, role: "user", timestamp }]);
    setInputMessage("");

    setLoading(true);
    try {
      const aiResponse = await chatWithAi(inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: aiResponse, role: "bot", timestamp: new Date().toLocaleTimeString() },
      ]);
    } catch (error) {
      console.error("Error during AI chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const eventRegex = "/(\d+\.\s+Event:.*?Participants:.*?)(?=\d+\.\s+Event:|\s*$)/gs";
    const matches = content.match(eventRegex);

    if (matches) {
      return matches.map((event, index) => (
        <div key={index} className="mb-4">
          {event.split("\n").map((line, i) => {
            if (line.startsWith(" - ")) {
              return <p key={i} className="ml-4 text-sm">{line}</p>;
            } else if (line.startsWith("![Before Picture]")) {
              const url = line.match(/\((.*?)\)/)?.[1];
              return (
                <img key={i} src={url} alt="Event" className="w-full h-auto rounded-lg mt-2" />
              );
            } else {
              return <p key={i} className="text-sm font-semibold">{line}</p>;
            }
          })}
        </div>
      ));
    } else {
      return <p className="text-sm">{content}</p>;
    }
  };

  return (
    <Card className="flex flex-col h-screen p-4">
      <CardHeader className="flex items-center justify-between border-b px-6">
        <CardTitle className="text-lg font-semibold">Chat with MoNature AI</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-black"
                }`}
              >
                {renderMessageContent(message.content)}
                <span className="block mt-1 text-xs text-gray-500">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex items-center space-x-4">
             <Skeleton className="h-12 w-12 rounded-full" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[200px]" />
             </div>
           </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4 px-6">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Chatting" : "Send"}
        </Button>
      </CardFooter>
    </Card>
  );
}
