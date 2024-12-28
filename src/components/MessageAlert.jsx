import PropTypes from 'prop-types';

const MessageAlert = ({ message }) => {

  return (
    message && (
      <div className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-primary text-black text-center py-2 px-6 w-3/4 rounded-lg shadow  transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in z-20">
        {message}
      </div>
    )
  );
};

MessageAlert.propTypes = {
  message: PropTypes.string
};

export default MessageAlert;