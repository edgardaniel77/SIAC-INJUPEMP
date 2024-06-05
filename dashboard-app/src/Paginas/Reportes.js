import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Reportes.css';

// Definición de las áreas para los reportes
const areas = [
  "Secretaría General",
  "Préstamos",
  "Cartera y Cobro",
  "Beneficios",
  "Planilla Jubilados"
];

// Tipos de reportes disponibles
const reportesDisponibles = [
  "Tiempo de espera promedio",
  "Tiempo de atención promedio",
  "Volumen de Afiliados",
  "Cantidad de turnos generados",
  "Cantidad de turnos atendidos"
];

// Simulación de datos para los reportes con rango de fechas
const datosSimulados = {
  "Secretaría General": {
    "2024-04-20": {
      "Tiempo de espera promedio": "15 minutos",
      "Tiempo de atención promedio": "5 minutos",
      "Volumen de Afiliados": "200 afiliados",
      "Cantidad de turnos generados": "50 turnos",
      "Cantidad de turnos atendidos": "45 turnos"
    },
    // Más fechas y datos...
  },
  "Préstamos": {
    "2024-04-20": {
      "Tiempo de espera promedio": "12 minutos",
      "Tiempo de atención promedio": "4 minutos",
      "Volumen de Afiliados": "300 afiliados",
      "Cantidad de turnos generados": "60 turnos",
      "Cantidad de turnos atendidos": "58 turnos"
    },
    // Más fechas y datos...
  },
  // Otros departamentos...
};

const Reportes = () => {
  const [areaSeleccionada, setAreaSeleccionada] = useState(areas[0]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(reportesDisponibles[0]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [datosImpresion, setDatosImpresion] = useState({});
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => modalRef.current,
    documentTitle: 'Reporte_Generado',
    onAfterPrint: () => alert('Impresión completa')
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const datosArea = datosSimulados[areaSeleccionada] || {};
    let resultadoReporte = 'Datos no disponibles';

    // Filtrar datos entre las fechas seleccionadas
    const fechasFiltradas = Object.keys(datosArea).filter(fecha => fecha >= fechaInicio && fecha <= fechaFinal);
    if (!fechasFiltradas.length) {
      alert("No hay datos disponibles para las fechas seleccionadas.");
      return;
    }
    let reportes = fechasFiltradas.map(fecha => datosArea[fecha][reporteSeleccionado] || 'N/D');
    resultadoReporte = reportes.join(", ");

    setDatosImpresion({
      area: areaSeleccionada,
      reporte: reporteSeleccionado,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      resultado: resultadoReporte
    });

    setShowModal(true);
  };

  return (
    <div className="reportes-container">
      <h1>Formulario de Reportes</h1>
      <form onSubmit={handleSubmit}>
        <div className="formulario-seccion">
          <label>Seleccione Área:</label>
          <select value={areaSeleccionada} onChange={e => setAreaSeleccionada(e.target.value)}>
            {areas.map(area => <option key={area} value={area}>{area}</option>)}
          </select>
        </div>

        <div className="formulario-seccion">
          <label>Seleccione Reporte:</label>
          <select value={reporteSeleccionado} onChange={e => setReporteSeleccionado(e.target.value)}>
            {reportesDisponibles.map(reporte => <option key={reporte} value={reporte}>{reporte}</option>)}
          </select>
        </div>

        <div className="formulario-seccion">
          <label>Fecha de Inicio:</label>
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </div>

        <div className="formulario-seccion">
          <label>Fecha Final:</label>
          <input type="date" value={fechaFinal} onChange={e => setFechaFinal(e.target.value)} />
        </div>

        <button type="submit" className="submit-button">Generar Reporte</button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Reporte de {datosImpresion.area}</h2>
            <p><strong>Reporte:</strong> {datosImpresion.reporte}</p>
            <p><strong>Desde:</strong> {datosImpresion.fechaInicio}</p>
            <p><strong>Hasta:</strong> {datosImpresion.fechaFinal}</p>
            <p><strong>Resultados:</strong> {datosImpresion.resultado}</p>
            <button onClick={handlePrint}>Imprimir Reporte</button>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportes;
