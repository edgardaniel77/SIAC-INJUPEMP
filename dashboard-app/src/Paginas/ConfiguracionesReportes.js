import React, { useState } from 'react';

const ConfiguracionesReportes = () => {
    const [formato, setFormato] = useState('PDF');

    return (
        <div>
            <h3>Configuraciones de Reportes</h3>
            <label>
                Formato de Informes:
                <select value={formato} onChange={(e) => setFormato(e.target.value)}>
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                </select>
            </label>
        </div>
    );
};

export default ConfiguracionesReportes;
