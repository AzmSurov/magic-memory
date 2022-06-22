import React from 'react'
import './SingleCard.css'


function SingleCard( {card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }

    }
  return (
    <div className="card">
    <div className={flipped ? "flipped" : " "}>
      <img  className="front" src= {card.src} alt="card front" />
      <img 
        src='./img/cover2.png' 
        className='back' 
        alt='cover'
        onClick={handleClick}
        />
    </div>
  </div>
  )
}

export default SingleCard