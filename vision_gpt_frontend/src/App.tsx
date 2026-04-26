import { useState } from 'react'
import { Upload, Send, Image as ImageIcon, Trash2 } from 'lucide-react'
import ChatInterface from './components/ChatInterface'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        setShowChat(true)
        // Add initial bot message
        setMessages([{
          id: Date.now().toString(),
          text: "Image uploaded successfully! How can I help you analyze this image?",
          sender: 'bot',
          timestamp: new Date()
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setInputValue('')

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm analyzing your image. This is a demo response. In a real application, this would be connected to your backend API.",
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setShowChat(false)
    setMessages([])
    setInputValue('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Vision GPT</h1>
          <p className="text-blue-100 text-center mt-2">Upload an image and start chatting</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-blue-600" />
              Image Upload
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-h-96 mx-auto rounded-lg shadow-lg object-contain"
                  />
                  <div className="flex gap-3 justify-center">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5" />
                      Upload New
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Click to upload an image
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Send className="w-6 h-6 text-blue-600" />
              Chat
            </h2>

            {showChat ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-[500px]">
                {/* Messages Area */}
                <ChatInterface messages={messages} />

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-12 text-center bg-gray-50 h-[500px] flex items-center justify-center">
                <div className="text-gray-400">
                  <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Upload an image to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
