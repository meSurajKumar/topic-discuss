import RingLoader from "react-spinners/RingLoader";
import { useEffect, useState } from 'react'
import boyGif from './assets/gifs/boy.gif'
import girlGif from './assets/gifs/girl.gif'
import boyPic from './assets/images/boy.png'
import girlPic from './assets/images/girl.png'

import {model, boyPrompt , girlPrompt} from './botController/common';

import './App.css'

function App() {
  const [boyImageStatus, setBoyImage] = useState(true)
  const [girlImageStatus, setGirlImage] = useState(true)
  const [topic , setTopic] = useState('')
  const [boyResult  , setBoyResult] = useState('')
  const [girlResult  , setGirlResult] = useState('')
  const [processingMessage , setProcessingMessage] = useState({showBoyLoader : false , showGirlLoader : false})


  const boyImage = boyImageStatus ? boyPic : boyGif; 
  const girlImage = girlImageStatus ? girlPic : girlGif; 

  const sendTopic=async()=>{
    localStorage.removeItem('boyRespone');
    localStorage.removeItem('girlRespone');
    setProcessingMessage({showBoyLoader:true , showGirlLoader:true})
    const botResponse = await model.invoke([
      "human",
      topic
    ])

    const respone = botResponse.content

    const boyPromptTemplating = boyPrompt.replace("{context}",respone)
    const girlPromptTemplating = girlPrompt.replace("{context}",respone)

    const boyResponse = await model.invoke([
      {
        role: "system",
        content : boyPromptTemplating
      },
      {
        role : "user",
        content : topic
      }
    ])
    const girlResponse = await model.invoke([
      {
        role: "system",
        content : girlPromptTemplating
      },
      {
        role : "user",
        content : topic
      }
    ])
    
    setBoyResult(boyResponse.content)
    const boyLocalData = {'respone':boyResponse.content , topic :topic }
    const setBoyDataToLocal = localStorage.setItem('boyRespone',JSON.stringify(boyLocalData) )
    setProcessingMessage({showBoyLoader:false})
    setBoyImage(false)
    setGirlResult(girlResponse.content)
    const girlLocalData = {'respone':boyResponse.content , topic :topic }
    const setGirlDataToLocal = localStorage.setItem('girlRespone',JSON.stringify(girlLocalData) )

    setProcessingMessage({showGirlLoader:false})
    setGirlImage(false)
  }

  useEffect(()=>{

  },[processingMessage])
  

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
          value={topic}
          onChange={(e)=>{setTopic(e.target.value)}}
          required
          className='border-4 border-pink-400 text-xl p-2 w-2/5 rounded-lg'
        />
        <button
          type="button"
          className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-6 py-2" onClick={sendTopic}
        >
          Send
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-10 gap-4 h-full w-full">
        {/* Boy Section */}
        <div className='col-span-5 flex flex-col items-center  border-2 border-amber-200'>
          <img src={boyImage} className="h-40 object-contain" alt="Boy" />
          <div className="w-full mt-4 bg-blue-100 text-2xl text-center py-2 h-96">Pros
                {
                  processingMessage.showBoyLoader ? (
                    <div className="flex  justify-center p-20">
                      <RingLoader color='#f542bf' />

                    </div>
                  ):(                    
                    <div className='border-2 h-86 overflow-auto'>
                    <p className='text-sm'> <span dangerouslySetInnerHTML={{__html:boyResult.replace(/\n/g, '<br />')}} ></span></p>
                    </div>
                  )
                }              



          </div>
        </div>

        {/* Girl Section */}
        <div className='col-span-5 flex flex-col items-center  border-2 border-amber-200'>
          <img src={girlImage} className="h-40 object-contain" alt="Girl" />
          <div className="w-full mt-4 bg-pink-100 text-center text-2xl py-2 h-96">Cons
          {
                  processingMessage.showGirlLoader ? (
                    <div className="flex  justify-center p-20">
                      <RingLoader color='#4248f5' />

                    </div>
                  ):(                    
                    <div className='border-2 h-86 overflow-auto'>
                    <p className='text-sm'> <span dangerouslySetInnerHTML={{__html:girlResult.replace(/\n/g, '<br />')}} ></span></p>
                    </div>
                  )
                }
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
