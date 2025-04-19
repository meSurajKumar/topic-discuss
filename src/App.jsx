import { useState } from 'react'
import reactLogo from './assets/react.svg'
import boy from './assets/gifs/boy.gif'
import girl from './assets/gifs/girl.gif'
import boyImage from './assets/images/boy.png'
import girlImage from './assets/images/girl.png'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <div className='h-screen w-6xl p-4'>
      {/* Header */}
      <p className='text-3xl font-bold underline mb-2'>Topic Discuss</p>

      {/* Input Section */}
      <div className='flex justify-center mb-6 gap-4'>
        <input
          type="text"
          id="topic"
          placeholder='Enter your topic.'
          className='border-4 border-pink-400 text-xl p-2 w-2/5 rounded-lg'
        />
        <button
          type="button"
          className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-6 py-2"
        >
          Send
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-10 gap-4 h-full w-full">
        {/* Boy Section */}
        <div className='col-span-5 flex flex-col items-center  border-2 border-amber-200'>
          <img src={boy} className="h-40 object-contain" alt="Boy" />
          <div className="w-full mt-4 bg-blue-100 text-2xl text-center py-2 h-96">Pros
              <div className='border-2 h-86'>
              </div>



          </div>
        </div>

        {/* Girl Section */}
        <div className='col-span-5 flex flex-col items-center  border-2 border-amber-200'>
          <img src={girl} className="h-40 object-contain" alt="Girl" />
          <div className="w-full mt-4 bg-pink-100 text-center text-2xl py-2 h-96">Cons
          <div className='border-2 h-86'>


          </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
