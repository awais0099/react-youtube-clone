import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {AppContext} from './context/AppContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components
import Header from './components/Header';
import Feed from './components/Feed';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';

import { IoMdRadio } from 'react-icons/io';


function App() {
  const [count, setCount] = useState(0)

  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full w-full">
          <Header />
          <Routes>
            <Route exact path='/' element={<Feed />} />
            <Route exact path='/searchResult/:searchQuery' element={<SearchResult />} />
            <Route exact path='/video/:id' element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  )
}

export default App
