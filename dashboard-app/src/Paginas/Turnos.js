import React, { useState, useEffect } from 'react';
import './Turnos.css';

const areas = [
  "Secretaría General",
  "Préstamos",
  "Cartera y Cobro", // Nuevo botón añadido
  "Beneficios",
  "Planilla Jubilados"
];

const Turnos = () => {
  const [queue, setQueue] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [attendedTickets, setAttendedTickets] = useState([]);
  const [transferArea, setTransferArea] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomArea = areas[Math.floor(Math.random() * areas.length)];
      const randomTicketNumber = Math.floor(Math.random() * 1000) + 1;
      const ticketLabel = `Ticket ${randomTicketNumber}`;
      addTicketToQueue(ticketLabel, randomArea);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addTicketToQueue = (ticket, area) => {
    setQueue(prevQueue => [...prevQueue, { ticket, area, timeAdded: new Date() }]);
  };

  const handleAreaSelection = (area) => {
    setSelectedArea(area);
    setCurrentTicket(null);
  };

  const callNextTicket = () => {
    const areaTickets = queue.filter(ticket => ticket.area === selectedArea);
    if (areaTickets.length > 0) {
      const nextTicket = areaTickets[0];
      setCurrentTicket({...nextTicket, startTime: Date.now()});
      setQueue(queue.filter(t => t !== nextTicket));
    } else {
      setNotification("No hay más tickets en esta área.");
    }
  };

  const attendCurrentTicket = () => {
    if (!currentTicket) {
      setNotification("No hay ticket actual para atender.");
      return;
    }
    setNotification(`Atendiendo ${currentTicket.ticket}`);
  };

  const finishCurrentTicket = () => {
    if (currentTicket) {
      const endTime = Date.now();
      const duration = endTime - currentTicket.startTime;
      setAttendedTickets(prev => [...prev, { ...currentTicket, duration }]);
      setCurrentTicket(null);
    }
  };

  const cancelCurrentTicket = () => {
    if (currentTicket) {
      setNotification(`Anulando ${currentTicket.ticket}`);
      setCurrentTicket(null);
    }
  };

  const transferTicket = () => {
    if (transferArea) {
      setCurrentTicket(prevTicket => ({ ...prevTicket, area: transferArea }));
      setTransferArea(null);
    } else {
      setNotification("Por favor, seleccione un área para transferir el ticket.");
    }
  };

  const ticketsInQueueByArea = queue.filter(ticket => ticket.area === selectedArea);
  const ticketsAttendedByArea = attendedTickets.filter(ticket => ticket.area === selectedArea);

  const averageTimeByArea = ticketsAttendedByArea.reduce((acc, ticket) => acc + ticket.duration, 0) / (ticketsAttendedByArea.length || 1);

  return (
    <div className="turnos-container">
      <h2 className="turnos-header">Administración de Turnos por Área</h2>
      <div className="area-buttons">
        {areas.map((area, index) => (
          <button key={index} className={`area-button ${selectedArea === area ? 'selected' : ''}`} onClick={() => handleAreaSelection(area)}>
            {area}
          </button>
        ))}
      </div>
      {selectedArea && (
        <div>
          <h3>Tickets para {selectedArea}</h3>
          <div className="action-buttons">
            <button className="btn-siguiente" onClick={callNextTicket}>Tickets</button>
          </div>
          {currentTicket && (
            <div className="ticket-details">
              <p>Estado actual: {currentTicket.ticket} - {currentTicket.area}</p>
              <button className="btn-finalizar" onClick={finishCurrentTicket}>Finalizar</button>
              <button className="btn-anular" onClick={cancelCurrentTicket}>Anular</button>
              <button className="btn-transferir" onClick={() => setTransferArea(selectedArea)}>Transferir a Otra Área</button>
              {currentTicket.startTime && (
                <p>Tiempo de espera: {((Date.now() - currentTicket.startTime) / 1000).toFixed(2)} segundos</p>
              )}
            </div>
          )}
          <div className="status-section">
            <div className="status-item">
              <h4>Turnos en espera:</h4>
              <p className="counter">{ticketsInQueueByArea.length}</p>
            </div>
            <div className="status-item">
              <h4>Turnos atendidos:</h4>
              <p className="counter">{ticketsAttendedByArea.length}</p>
            </div>
            <div className="status-item">
              <h4>Tiempo promedio de espera:</h4>
              <p className="timer">{(averageTimeByArea / 1000).toFixed(2)} segundos</p>
            </div>
          </div>
        </div>
      )}
      {transferArea && (
        <div className="transfer-modal">
          <h3>Transferir Ticket a Otra Área</h3>
          <p>Seleccione el área a la que desea transferir el ticket:</p>
          <div className="transfer-buttons">
            {areas.filter(area => area !== selectedArea).map((area, index) => (
              <button key={index} className="transfer-button" onClick={() => {
                setTransferArea(area);
                setCurrentTicket(prevTicket => ({ ...prevTicket, area }));
              }}>
                {area}
              </button>
            ))}
          </div>
        </div>
      )}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
          <button className="btn-dismiss" onClick={() => setNotification(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Turnos;
