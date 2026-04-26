import { useEffect, useRef } from 'react'
import { Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatInterfaceProps {
  messages: Message[]
}

function ChatInterface({ messages }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {message.sender === 'user' ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>

            {/* Message Content */}
            <div
              className={`flex-1 max-w-[80%] ${
                message.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatInterface
