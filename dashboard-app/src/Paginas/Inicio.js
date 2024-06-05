import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Inicio.css';

const Inicio = () => {
    const [datosMostrados, setDatosMostrados] = useState([]);
    const [datos, setDatos] = useState({
        hoy: [
            { nombre: 'Jaime Orlando Caballero  ', identificacion: '1234567890123', correo: 'usuario1@example.com', hora: '08:30', servicio: 'Consulta' },
            { nombre: 'Edgar Rolando palacios ', identificacion: '9876543210987', correo: 'usuario2@example.com', hora: '09:15', servicio: 'Registro' }
        ],
        servido: [
            { nombre: 'Luis Canales', identificacion: '1234567890123', correo: 'usuario1@example.com', hora: '08:30', servicio: 'Consulta' },
            { nombre: 'Olvin  Lagos', identificacion: '9876543210987', correo: 'usuario2@example.com', hora: '09:15', servicio: 'Registro' }
        ],
        'no-presentado': [
            { nombre: 'Pedro juan Rosales 1', identificacion: '1234567890123', correo: 'usuario1@example.com', hora: '08:30', servicio: 'Consulta' },
            { nombre: 'Juan 2', identificacion: '9876543210987', correo: 'usuario2@example.com', hora: '09:15', servicio: 'Registro' }
        ],
        serviendo: [
            { nombre: 'Jaime Roslaes  1', identificacion: '1234567890123', correo: 'usuario1@example.com', hora: '08:30', servicio: 'Consulta' },
            { nombre: 'Maria tatiana lopez  2', identificacion: '9876543210987', correo: 'usuario2@example.com', hora: '09:15', servicio: 'Registro' }
        ]
    });

    const barChartRef = useRef();
    const pieChartRef = useRef();

    useEffect(() => {
        const barCtx = barChartRef.current.getContext('2d');
        const pieCtx = pieChartRef.current.getContext('2d');

        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Ayer', 'Hoy'],
                datasets: [{
                    label: 'Cantidad',
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    data: [28, datosMostrados.length]
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        const pieChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Hoy Atendido', 'Hoy No Presentado'],
                datasets: [{
                    label: 'Cantidad',
                    backgroundColor: ['#FFCE56', '#FF6384'],
                    data: [datosMostrados.filter(dato => dato.servicio === 'Consulta').length, datosMostrados.filter(dato => dato.servicio === 'Registro').length]
                }]
            }
        });

        return () => {
            barChart.destroy();
            pieChart.destroy();
        };
    }, [datosMostrados]);

    const handleCola = (opcion) => {
        setDatosMostrados(datos[opcion]);
    };

    return (
        <div className="inicio-container">
            <div className="botones-cola">
                <button onClick={() => handleCola('hoy')}>Cola de Hoy </button>
                <button onClick={() => handleCola('servido')}>Atendidos Hoy</button>
                <button onClick={() => handleCola('no-presentado')}>Hoy No Presentado</button>
                <button onClick={() => handleCola('serviendo')}>En Atencion</button>
            </div>

            <div className="datos-hoy">
                <h2>Datos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Correo Electrónico</th>
                            <th>Hora</th>
                            <th>Servicio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosMostrados.map((dato, index) => (
                            <tr key={index}>
                                <td>{dato.nombre}</td>
                                <td>{dato.identificacion}</td>
                                <td>{dato.correo}</td>
                                <td>{dato.hora}</td>
                                <td>{dato.servicio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grafica-comparacion">
                <h2>Comparativa entre ayer y hoy</h2>
                <div className="chart-container">
                    <canvas ref={barChartRef}></canvas>
                </div>
                <div className="chart-container">
                    <canvas ref={pieChartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default Inicio;