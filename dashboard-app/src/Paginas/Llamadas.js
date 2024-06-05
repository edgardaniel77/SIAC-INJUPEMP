import React, { useState, useEffect, useReducer, useCallback } from 'react';
import './Llamadas.css';

const areas = [
  "Secretaría General",
  "Préstamos",
  "Cartera y Cobro",
  "Beneficios",
  "Planilla Jubilados"
];

const initialState = {
  queue: [],
  currentTicket: null,
  attendedTickets: [],
  showQueue: false
};

const actionTypes = {
  ADD_TICKET: 'ADD_TICKET',
  SET_CURRENT_TICKET: 'SET_CURRENT_TICKET',
  FINISH_TICKET: 'FINISH_TICKET',
  TOGGLE_QUEUE_VISIBILITY: 'TOGGLE_QUEUE_VISIBILITY'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TICKET:
      return {
        ...state,
        queue: [...state.queue, action.payload]
      };
    case actionTypes.SET_CURRENT_TICKET:
      return {
        ...state,
        currentTicket: action.payload,
        queue: state.queue.filter(ticket => ticket.id !== action.payload.id)
      };
    case actionTypes.FINISH_TICKET:
      return {
        ...state,
        attendedTickets: [...state.attendedTickets, state.currentTicket],
        currentTicket: null
      };
    case actionTypes.TOGGLE_QUEUE_VISIBILITY:
      return {
        ...state,
        showQueue: !state.showQueue
      };
    default:
      return state;
  }
};

const Ticket = ({ ticket }) => (
  <p>{ticket.description}</p>
);

const Llamadas = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectedArea = areas[0];

  useEffect(() => {
    const interval = setInterval(() => {
      const ticketNumber = Math.floor(Math.random() * 1000) + 100;
      const newTicket = { id: ticketNumber, area: selectedArea, description: `Descripción del Ticket ${ticketNumber}` };
      dispatch({ type: actionTypes.ADD_TICKET, payload: newTicket });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const callNextTicket = useCallback(() => {
    const tickets = state.queue.filter(ticket => ticket.area === selectedArea);
    if (tickets.length > 0) {
      dispatch({ type: actionTypes.SET_CURRENT_TICKET, payload: tickets[0] });
    } else {
      alert('No hay tickets en espera para esta área.');
    }
  }, [state.queue, selectedArea]);

  const finishTicket = useCallback(() => {
    if (window.confirm('¿Está seguro que desea finalizar el ticket actual?')) {
      dispatch({ type: actionTypes.FINISH_TICKET });
    }
  }, [state.currentTicket]);

  const toggleQueueVisibility = useCallback(() => {
    dispatch({ type: actionTypes.TOGGLE_QUEUE_VISIBILITY });
  }, []);

  return (
    <div className="llamadas-container">
      <h1>Visualización de Tickets del Usuario</h1>
      <button className="button btn-call-next" onClick={callNextTicket}>Llamar Siguiente</button>
      <button className="button btn-toggle-queue" onClick={toggleQueueVisibility}>
        {state.showQueue ? 'Ocultar' : 'Ver'} Tickets en Espera
      </button>
      {state.currentTicket && (
        <div>
          <h3>Atendiendo: {state.currentTicket.description}</h3>
          <button className="button btn-finish" onClick={finishTicket}>Finalizar</button>
        </div>
      )}
      <div className="attended-tickets">
        <h2>Tickets Atendidos: {state.attendedTickets.length}</h2>
        {state.attendedTickets.map(ticket => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
      {state.showQueue && (
        <div className="queue-list">
          <h2>Tickets en Espera:</h2>
          {state.queue.map(ticket => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Llamadas;
