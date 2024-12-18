import PropTypes from 'prop-types';
import { MdOutlineStar } from "react-icons/md";

const StarRating = ({ rating }) => {


  return (
    <div className="flex gap-1 text-2xl text-dark-grey">
      {[...Array(5)].map((star, index) => (
        <MdOutlineStar
          key={index}
          className={index < rating ? 'text-primary' : ''}
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
};

export default StarRating;