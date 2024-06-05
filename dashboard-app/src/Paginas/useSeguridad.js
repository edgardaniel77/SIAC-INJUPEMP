import React from 'react';
import { useSeguridad } from './Seguridad';

const ListaRolesComponente = () => {
  const { roles, eliminarRol } = useSeguridad();

  return (
    <div>
      {roles.map(rol => (
        <div key={rol.id}>
          <h3>{rol.nombre}</h3>
          <p>{rol.descripcion}</p>
          <button onClick={() => eliminarRol(rol.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ListaRolesComponente;
