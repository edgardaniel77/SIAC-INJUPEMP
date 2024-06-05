import React, { useState } from 'react';

const ConfiguracionesUsuario = () => {
    const [notificacionesEmail, setNotificacionesEmail] = useState(false);
    const [tema, setTema] = useState('claro');

    return (
        <div>
            <h3>Configuraciones de Usuario</h3>
            <label>
                Notificaciones por Email:
                <input type="checkbox" checked={notificacionesEmail} onChange={() => setNotificacionesEmail(!notificacionesEmail)} />
            </label>
            <label>
                Tema de la Interfaz:
                <select value={tema} onChange={(e) => setTema(e.target.value)}>
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                </select>
            </label>
        </div>
    );
};

export default ConfiguracionesUsuario;
