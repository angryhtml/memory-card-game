import './Card.css';
import ReactCardFlip from 'react-card-flip';

function Card({ card, isFlipped, onClick }) {
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

      <div onClick={onClick} className="card-back">
      </div>

      <div className="card-front">
        <div className="icon-content">
          {card.icon}
        </div>
      </div>
      
    </ReactCardFlip>
  );
}

export default Card;