import { useState } from 'react';
import { MdAdd, MdRemove } from "react-icons/md";

const questions = [
  "What is your return policy?",
  "How do I track my order?",
  "Can I purchase items again?",
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
        <div key={index} className='py-2 border-b border-dark-grey'>
          <div 
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} 
            onClick={() => toggleQuestion(index)}
          >
            <span>{question}</span>
            {openIndex === index ? <MdRemove /> : <MdAdd />}
          </div>
          {openIndex === index && (
            <div style={{ padding: '10px 0' }}>
              <p>Answer to the question goes here.</p>
            </div>
          )}
        </div>
      ))}

    </div>
  );
};


export default FAQ;