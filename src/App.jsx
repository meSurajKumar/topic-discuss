import RingLoader from "react-spinners/RingLoader";
import { useEffect, useState } from 'react'
import boyGif from './assets/gifs/boy.gif'
import girlGif from './assets/gifs/girl.gif'
import boyPic from './assets/images/boy.png'
import girlPic from './assets/images/girl.png'

import { model, boyPrompt , girlPrompt} from './botController/common';

import './App.css'

function App() {
  const [boyImageStatus, setBoyImage] = useState(true)
  const [girlImageStatus, setGirlImage] = useState(true)
  const [topic, setTopic] = useState('')
  const [boyResult, setBoyResult] = useState('')
  const [girlResult, setGirlResult] = useState('')
  const [processingMessage, setProcessingMessage] = useState({ showBoyLoader: false, showGirlLoader: false })

  const boyImage = boyImageStatus ? boyPic : boyGif;
  const girlImage = girlImageStatus ? girlPic : girlGif;

  const cycleCount = 3;
  const runBotCycle = async () => {
    if (!topic.trim()) return;
    setBoyResult('');
    setGirlResult('');
    setProcessingMessage({ showBoyLoader: true, showGirlLoader: false })
    setBoyImage(true);
    setBoyImage(false);

    let boyReplies = '';
    let girlReplies = '';

    let context = topic;
    for (let i = 0; i < cycleCount; i++) {
      // BOY Responds
      setProcessingMessage({ showBoyLoader: true, showGirlLoader: false })
      const boySystemPrompt = { role: "system", content: boyPrompt }
      const boyUserPrompt = { role: "user", content: context }

      const boyResponse = await model.invoke([boySystemPrompt, boyUserPrompt]);
      const boyText = boyResponse.content.trim();

      boyReplies += `<b> Cycle ${i + 1} : </b><br>${boyText}<br><br>`
      setBoyResult(boyReplies);
      setProcessingMessage({ showBoyLoader: false });

      // animation switch
      setBoyImage(false);

      // GIRL Responds
      setProcessingMessage({ showBoyLoader: false, showGirlLoader: true })
      const girlSystemPrompt = { role: "system", content: girlPrompt }
      const girlUserPrompt = { role: "user", content: context }

      const girlResponse = await model.invoke([girlSystemPrompt, girlUserPrompt]);
      const girlText = girlResponse.content.trim();

      girlReplies += `<b> Cycle ${i + 1} : </b><br>${girlText}<br><br>`
      setGirlResult(girlReplies);
      setProcessingMessage({ showGirlLoader: false });

      // animation switch
      setGirlImage(false);

      // Updating the context for the next round;
      context = boyText + ' ' + girlText;
      localStorage.setItem('boyRespone', JSON.stringify({ 'respone': boyReplies, topic }));
      localStorage.setItem('boyRespone', JSON.stringify({ 'respone': girlReplies, topic }));
    }
  };



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
          onChange={(e) => { setTopic(e.target.value) }}
          required
          className='border-4 border-pink-400 text-xl p-2 w-2/5 rounded-lg'
        />
        <button
          type="button"
          className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-6 py-2" onClick={runBotCycle}
        >
          Send
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-10 gap-4 h-full w-full">
        {/* Boy Section */}
        <div className='col-span-5 flex flex-col items-center  '>
          <img src={boyImage} className="h-40 object-contain" alt="Boy" />
          <div className="w-full mt-4 bg-blue-100 text-2xl text-center py-2 h-96">Pros
            {
              processingMessage.showBoyLoader ? (
                <div className="flex  justify-center p-20">
                  <RingLoader color='#f542bf' />

                </div>
              ) : (
                <div className='border-2 h-86 overflow-auto'>
                  <p className='text-sm'> <span dangerouslySetInnerHTML={{ __html: boyResult.replace(/\n/g, '<br />') }} ></span></p>
                </div>
              )
            }



          </div>
        </div>

        {/* Girl Section */}
        <div className='col-span-5 flex flex-col items-center  '>
          <img src={girlImage} className="h-40 object-contain" alt="Girl" />
          <div className="w-full mt-4 bg-pink-100 text-center text-2xl py-2 h-96">Cons
            {
              processingMessage.showGirlLoader ? (
                <div className="flex  justify-center p-20">
                  <RingLoader color='#4248f5' />

                </div>
              ) : (
                <div className='border-2 h-86 overflow-auto'>
                  <p className='text-sm'> <span dangerouslySetInnerHTML={{ __html: girlResult.replace(/\n/g, '<br />') }} ></span></p>
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
