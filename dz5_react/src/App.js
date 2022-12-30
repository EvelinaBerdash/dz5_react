import { Routes, Route } from 'react-router-dom'
import { nanoid } from 'nanoid'

import { Header } from "./components/Header/Header"
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'
import { ChatsPage } from './pages/ChatsPage'
import { ChatList } from './components/ChatsList/ChatList'
import { useState } from 'react'
import { MessageList } from './components/MessageList/MessageList'

const defaultMessages = {
  default: [
    {
      author: 'user',
      text: 'one text'
    },
    {
      author: 'user',
      text: 'two text'
    }
  ]
}

export function App() {
  const [messages, setMessages] = useState(defaultMessages)

  const chats = Object.keys(messages).map((chat) => ({
    id: nanoid(),
    name: chat
  }))

  const onAddChat = (newChat) => {
    console.log('newChat', newChat)
    setMessages({
      ...messages,
      [newChat.name]: []
    })
  }

  const onAddMessage = (chatId, newMessage) => {
    setMessages({
      ...messages,
      [chatId]: [...messages[chatId], newMessage]
    })
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='chats'>
            <Route index element={<ChatList chats={chats} onAddChat={onAddChat}/>} />
            <Route path=':chatId' element={<ChatsPage chats={chats} messages={messages} onAddMessage={onAddMessage} onAddChat={onAddChat}/>} />
          </Route>
        </Route>

        <Route path='*' element={<h2>404 Page not FOUND</h2>} />
      </Routes>
      {/* <Header /> */}
    </>
  )
}

export default App