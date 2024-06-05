import React, { useState } from 'react';

const ConfiguracionesSeguridad = () => {
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    return (
        <div>
            <h3>Configuraciones de Seguridad</h3>
            <label>
                Autenticación de Dos Factores (2FA):
                <input type="checkbox" checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
            </label>
        </div>
    );
};

export default ConfiguracionesSeguridad;
