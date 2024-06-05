import React, { useState } from 'react';

const ConfiguracionesTurnos = () => {
    const [autoAssign, setAutoAssign] = useState(false);
    const [reminders, setReminders] = useState(true);

    return (
        <div>
            <h3>Configuraciones de Turnos</h3>
            <label>
                Asignación Automática de Turnos:
                <input type="checkbox" checked={autoAssign} onChange={() => setAutoAssign(!autoAssign)} />
            </label>
            <label>
                Recordatorios de Turnos:
                <input type="checkbox" checked={reminders} onChange={() => setReminders(!reminders)} />
            </label>
        </div>
    );
};

export default ConfiguracionesTurnos;
