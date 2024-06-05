import React, { useState } from 'react';

const ConfiguracionesDashboard = () => {
    const [widgets, setWidgets] = useState(['Turnos', 'Informes']);

    const handleWidgetChange = (event) => {
        const value = Array.from(event.target.selectedOptions, (option) => option.value);
        setWidgets(value);
    };

    return (
        <div>
            <h3>Configuraciones del Dashboard</h3>
            <label>
                Widgets en Dashboard:
                <select multiple value={widgets} onChange={handleWidgetChange}>
                    <option value="Turnos">Turnos</option>
                    <option value="Informes">Informes</option>
                    <option value="Seguridad">Seguridad</option>
                </select>
            </label>
        </div>
    );
};

export default ConfiguracionesDashboard;
