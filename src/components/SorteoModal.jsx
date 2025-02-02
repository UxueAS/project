import PropTypes from 'prop-types';

const SorteoModal = ({showSorteoModal, setShowSorteoModal, handleConfirmar}) => {
  return (<>
    {showSorteoModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white text-dark-grey text-center rounded p-6 shadow-lg w-11/12 max-w-xl">
                  <h2 className="text-xl font-bold mb-4">Condiciones del Sorteo</h2>
                  <p className="mb-6">
                    Al participar en este sorteo, aceptas los términos y condiciones. 
                    Por favor, confirma para continuar.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleConfirmar}
                      className="px-4 py-2 bg-primary text-white font-semibold  uppercase hover:bg-primary/75 transition"
                    >
                      Confirmar Participación
                    </button>
                    <button
                      onClick={() => setShowSorteoModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}</>
  );
};
SorteoModal.propTypes = {
  showSorteoModal: PropTypes.bool.isRequired,
  setShowSorteoModal: PropTypes.func.isRequired,
  handleConfirmar: PropTypes.func.isRequired,
};

export default SorteoModal;