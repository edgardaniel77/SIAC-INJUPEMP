import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Display.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faUser,
  faUserAlt,
  faThumbsUp,
  faMoneyBillAlt,
  faBook,
  faHandHoldingUsd,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

const Display = () => {
  const [step, setStep] = useState(1);
  const [identityNumber, setIdentityNumber] = useState('');
  const [attentionType, setAttentionType] = useState('');
  const [service, setService] = useState('');
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  const validateIdentityNumber = () => {
    if (identityNumber.trim() === '') {
      return 'Por favor, ingrese su número de identidad.';
    }
    if (!/^\d+$/.test(identityNumber)) {
      return 'El número de identidad debe contener solo dígitos.';
    }
    return '';
  };

  const handleIdentitySubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateIdentityNumber();
    if (errorMessage) {
      setErrors({ identityNumber: errorMessage });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleAttentionType = (type) => {
    setAttentionType(type);
    setStep(3);
  };

  const handleServiceSelection = (serviceSelected) => {
    setService(serviceSelected);
    setIdentityNumber(''); // Clear identity number
    setStep(4);
  };

  const handleNumberClick = (number) => {
    setIdentityNumber(prevNumber => prevNumber + number);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBackspaceClick = () => {
    setIdentityNumber(prevNumber => prevNumber.slice(0, -1));
  };

  const handleKeyPress = useCallback((e) => {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (validKeys.includes(e.key)) {
      setIdentityNumber(prevNumber => prevNumber + e.key);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const printTicket = () => {
    const pdf = new jsPDF();
    pdf.text('INJUPEMP Ticket de Turno A-14', 20, 20);
    pdf.text(`Número de Identidad: ${identityNumber}`, 20, 30);
    pdf.text(`Tipo de Atención: ${attentionType}`, 20, 40);
    pdf.text(`Servicio: ${service}`, 20, 50);
    pdf.text('Gracias por su visita.', 20, 70);
    pdf.save('ticket.pdf');
  };

  return (
    <div className="display-container">
      <h1>Bienvenido a INJUPEMP</h1>
      {step === 1 && (
        <form onSubmit={handleIdentitySubmit}>
          <label>
            Ingrese su Número de Identidad:
            <input
              type="text"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              required
              ref={inputRef}
            />
            {errors.identityNumber && <span className="error">{errors.identityNumber}</span>}
          </label>
          <div className="numeric-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
              <button
                key={number}
                className="numeric-button"
                onClick={() => handleNumberClick(number.toString())}
                style={{ gridColumn: ((index % 3) + 1) }} // Asegura que los botones se distribuyen en las tres primeras columnas
                type="button" // Asegura que los botones no envíen el formulario
              >
                {number}
              </button>
            ))}
            {/* Botón cero con clase específica */}
            <button className="numeric-button zero" onClick={() => handleNumberClick('0')} type="button">
              0
            </button>
            {/* Botón de borrar */}
            <button className="numeric-button backspace" onClick={handleBackspaceClick} type="button">
              ←
            </button>
          </div>
          <button className="button next-button" type="submit">Siguiente</button>
        </form>
      )}
      {step === 2 && (
        <div>
          <h2>Selecciona Atención</h2>
          <button className="button selection-button" onClick={() => handleAttentionType('Preferencial')}>
            <FontAwesomeIcon icon={faUserCircle} /> Atención Preferencial
          </button>
          <button className="button selection-button" onClick={() => handleAttentionType('Normal')}>
            <FontAwesomeIcon icon={faUser} /> Atención Normal
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Selecciona Área</h2>
          <button className="button selection-button" onClick={() => handleServiceSelection('Secretaría General')}>
            <FontAwesomeIcon icon={faMoneyBillAlt} /> Secretaría General
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Préstamos')}>
            <FontAwesomeIcon icon={faBook} /> Préstamos
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Cartera Y Cobro')}>
            <FontAwesomeIcon icon={faHandHoldingUsd} /> Cartera Y Cobro
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Beneficios')}>
            <FontAwesomeIcon icon={faThumbsUp} /> Beneficios
          </button>
          <button className="button selection-button" onClick={() => handleServiceSelection('Planilla Jubilados')}>
            <FontAwesomeIcon icon={faUserAlt} /> Planilla Jubilados
          </button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Confirmación de Servicio</h2>
          <p>Servicio seleccionado: {service}</p>
          <p>Tipo de atención: {attentionType}</p>
          <button className="button print-button" onClick={printTicket}>
            <FontAwesomeIcon icon={faPrint} /> Imprimir Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default Display;
