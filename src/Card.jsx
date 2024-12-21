import './Card.css';
import ReactCardFlip from 'react-card-flip';

function Card({ content, isFlipped, onClick }) {

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

      <div onClick={onClick} className="card-back">
      </div>

      <div onClick={onClick} className="card-front">
        {content}
      </div>
    </ReactCardFlip>

  );
}

export default Card;
