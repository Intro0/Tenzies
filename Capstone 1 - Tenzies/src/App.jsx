import { useState, useEffect, useRef } from 'react'
import Die from "./components/Die.jsx";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  // state
  const [dice, setDice] = useState(() => generateAllNewDice())
  const [gameWon, setGameWon] = useState(false)
  const buttonRef = useRef(null)

  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      onClick={() => holdDice(die.id)}
    />
  ))

  useEffect(() => {
    if (gameWon && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  // functions
  function generateAllNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
      setGameWon(false)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          {
            ...die, value: Math.ceil(Math.random() * 6),
          }
      }))
      checkWin()
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function checkWin() {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)
    if (allHeld && allSameValue) {
      setGameWon(true)
    }
  }

  // render
  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>You win!</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div>
        {diceElements}
      </div>
      <button 
        ref={buttonRef}
        className="roll-btn" 
        onClick={rollDice}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}