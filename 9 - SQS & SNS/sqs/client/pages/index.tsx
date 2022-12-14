import { useState } from "react";

type Message = {
  MessageId: string;
  ReceiptHandle: string;
  MD5OfBody: string;
  Body: string;
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = () => {
    fetch("http://localhost:3001/get-messages")
      .then((res) => res.json())
      .then((res) => {
        setMessages(res);
      });
  };

  return (
    <div className="w-1/2 my-6 mx-auto">
      <button
        className="px-6 py-2 rounded-md text-white bg-blue-700"
        onClick={fetchMessages}
      >
        Get new messages
      </button>
      <div className="mt-6">
        <ul>
          {messages.map((message) => (
            <li key={message.MessageId} className="mt-4">
              <div>
                <span className="font-semibold">Message id:</span>{" "}
                {message.MessageId}
              </div>
              <div>
                <span className="font-semibold">Message body:</span>{" "}
                {message.Body}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
