import PropTypes from 'prop-types';

const SubscriptionModal = ({showSubscribeModal, setShowSubscribeModal}) => {
  return (<>
    {showSubscribeModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white text-dark-grey text-center rounded p-6 shadow-lg w-11/12 max-w-xl">
                      <h2 className="text-xl font-bold mb-4">¡Suscríbete para participar!</h2>
                      <p className="mb-6">
                        Para participar en este sorteo, necesitas una cuenta Premium.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => setShowSubscribeModal(false)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                )}</>
  );
};
SubscriptionModal.propTypes = {
  showSubscribeModal: PropTypes.bool.isRequired,
  setShowSubscribeModal: PropTypes.func.isRequired
};

export default SubscriptionModal;