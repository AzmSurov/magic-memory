import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/chris2.jpg", matched:false},
  {"src": "/img/brian2.jpg", matched:false},
  {"src": "/img/meg2.jpg", matched:false},
  {"src": "/img/peter2.png", matched:false},
  {"src": "/img/stewie2.png", matched:false},
  {"src": "/img/lois2.jpg", matched:false}
]


function App() {

  const [cards, setCards] = useState([])

  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] =  useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  }

// Handle a choice

const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards 
useEffect(() => {
  
if (choiceOne && choiceTwo) {
  setDisabled(true);
  if(choiceOne.src === choiceTwo.src) {
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.src === choiceOne.src) {
          return {...card, matched: true}
        }
        else {
          return card
        }
      })
    })
    resetTurn();
  }
  else {
    setTimeout(() => resetTurn(), 1000)
  }
}
}, [choiceOne, choiceTwo])

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTruns => prevTruns+1)
  setDisabled(false)
}

//Start a new game automatically
useEffect( () => {
  shuffleCards()
}, [])

  return (
    <div className='App'>
      <h1> <span>Family Guy</span> Memory Game</h1>
      <div className='section'>
        <button onClick={shuffleCards}>New Game</button>
        <h2>Turns: {turns}</h2>
      </div>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice = {handleChoice}
          flipped = {card === choiceOne || card === choiceTwo || card.matched} 
          disabled={disabled}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
