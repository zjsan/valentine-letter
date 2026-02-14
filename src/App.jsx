import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function App() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  
  // The "Yes" button grows as the "No" button is clicked
  const yesButtonSize = noCount * 20 + 16

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const getNoButtonText = () => {
    const phrases = [
      "No", "Are you sure?", "Really sure?", "Think again!",
      "Last chance!", "Surely not?", "You might regret this!",
      "Give it another thought!", "Are you absolutely sure?",
      "Have a heart!", "Don't be so cold!", "Change of heart?",
      "Wouldn't you reconsider?", "Is that your final answer?",
      "You're breaking my heart ;("
    ]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-16 p-4">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gU_PbB5_naAAAAAM/tonton-friends-chubby-tonton.gif" alt="Cute bear" />
          <div className="text-4xl font-bold my-4 text-pink-600">Ok Yay!!! ❤️</div>
        </>
      ) : (
        <>
          <img className="h-[200px]" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5pwz4nmzjl.gif" alt="Bear with roses" />
          <h1 className="text-4xl my-8 font-serif text-center">Will you be my Valentine?</h1>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              style={{ fontSize: yesButtonSize }}
              onClick={() => {
                setYesPressed(true)
                confetti()
              }}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  )
}