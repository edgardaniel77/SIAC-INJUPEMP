import React, { useState } from 'react';
import './Configuraciones.css';

// Importamos los componentes de cada categoría
import ConfiguracionesUsuario from './ConfiguracionesUsuario';
import ConfiguracionesTurnos from './ConfiguracionesTurnos';
import ConfiguracionesReportes from './ConfiguracionesReportes';
import ConfiguracionesSeguridad from './ConfiguracionesSeguridad';
import ConfiguracionesDashboard from './ConfiguracionesDashboard';

const Configuraciones = () => {
    const [tabActiva, setTabActiva] = useState('usuario');

    const renderTabContent = () => {
        switch (tabActiva) {
            case 'usuario':
                return <ConfiguracionesUsuario />;
            case 'turnos':
                return <ConfiguracionesTurnos />;
            case 'reportes':
                return <ConfiguracionesReportes />;
            case 'seguridad':
                return <ConfiguracionesSeguridad />;
            case 'dashboard':
                return <ConfiguracionesDashboard />;
            default:
                return <ConfiguracionesUsuario />;
        }
    };

    return (
        <div className="configuraciones-container">
            <div className="tabs">
                <button onClick={() => setTabActiva('usuario')}>Usuario</button>
                <button onClick={() => setTabActiva('turnos')}>Turnos</button>
                <button onClick={() => setTabActiva('reportes')}>Reportes</button>
                <button onClick={() => setTabActiva('seguridad')}>Seguridad</button>
                <button onClick={() => setTabActiva('dashboard')}>Dashboard</button>
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Configuraciones;
