import { useState } from 'react';
import { MdAdd, MdRemove } from "react-icons/md";

const questions = [
  {
    title: "¿Cuánto tiempo tarda el envío de mi pedido?",
    text: "Ofrecemos envíos estándar y exprés. Los envíos estándar tardan de 3 a 5 días hábiles, mientras que los envíos exprés suelen llegar en 24-48 horas. Los tiempos pueden variar según tu ubicación."
  },
  {
    title: "¿Puedo devolver un producto si no estoy satisfecho?",
    text: "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la recepción de tu pedido, siempre que los productos estén en su estado original. Consulta nuestra política de devoluciones para más detalles."
  },
  {
    title: "¿Qué métodos de pago aceptan?",
    text: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal y pagos por transferencia bancaria."
  },
  {
    title: "¿Cómo puedo contactar con atención al cliente?",
    text: "Puedes contactarnos a través del formulario en nuestra página de contacto o enviando un correo a soporte@naiz.com. También estamos disponibles por chat en horario laboral."
  }

];
const FAQ = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className='flex flex-col mt-6'>
     <h3 className='text-2xl font-bold mb-6'>Preguntas frecuentes</h3>
      {questions.map((question, index) => (
        <div key={index} className={`py-3 border-b border-dark-grey ${openIndex === index ? 'font-semibold' : ''}`}>
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} 
            onClick={() => toggleQuestion(index)}
          >
            <span>{question.title}</span>
            {openIndex === index ? <MdRemove /> : <MdAdd />}
          </div>
          {openIndex === index && (
            <div className='py-6'>
              <p className='font-normal'>{question.text}</p>
            </div>
          )}
        </div>
      ))}

    </div>
  );
};


export default FAQ;