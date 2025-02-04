import PropTypes from 'prop-types';
import { useState } from 'react';

const PromocionModal = ({showPromocionModal, setShowPromocionModal}) => {
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    phone: "",
    termsAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!/^\d{8}[A-Z]$/i.test(formData.dni)) {
      newErrors.dni = "Introduce un DNI válido (8 números y una letra).";
    }

    if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Introduce un número de teléfono válido (9 dígitos).";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };
  const close = () => {
    setSubmitted(false)
    setErrors({})
    setFormData({
      name: "",
      dni: "",
      phone: "",
      termsAccepted: false,
    })
    setShowPromocionModal(false)
  };
  return (<>
    {showPromocionModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => close()}>
        <div className="bg-white text-dark-grey text-center rounded p-6 shadow-lg w-11/12 max-w-xl" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl font-bold mb-4">Inscríbete en la promoción y obtén beneficios exclusivos</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Introduce tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">DNI/NIE</label>
                <input
                  type="text"
                  name="dni"
                  placeholder="Introduce tu DNI o NIE"
                  value={formData.dni}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Introduce tu número de teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label className="text-gray-700">
                  Acepto los{" "}
                  <a href="#" className="text-primary underline">
                    términos y condiciones
                  </a>{" "}
                  de la promoción.
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  type='submit'
                  className="px-4 py-2 bg-primary text-white font-semibold  uppercase hover:bg-primary/75 transition"
                >
                  Confirmar Participación
                </button>
                <button
                  onClick={() => setShowPromocionModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold text-green-600">
                ¡Gracias por inscribirte!
              </h2>
              <p className="text-gray-700 mt-2">
                Te hemos enviado un correo con la confirmación y los detalles de la oferta.
              </p>
            </div>
          )}
        </div>
      </div>
    )}</>
  );
};
PromocionModal.propTypes = {
  showPromocionModal: PropTypes.bool.isRequired,
  setShowPromocionModal: PropTypes.func.isRequired
};

export default PromocionModal;