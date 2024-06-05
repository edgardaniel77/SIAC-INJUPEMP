import React, { useState } from 'react';
import './Seguridad.css';

const Seguridad = () => {
    const [vistaActual, setVistaActual] = useState('permisos');
    const [actividad, setActividad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [permisos, setPermisos] = useState([
        'Inicio', 'Display', 'Llamadas','Gestión Usuarios', 'Turnos', 'Reportes', 'Seguridad', 
    ]);
    const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState('');

    const cambiarVista = (vista) => {
        setVistaActual(vista);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Actividad:', actividad);
        console.log('Descripción:', descripcion);
        setActividad('');
        setDescripcion('');
    };

    const handlePermisoChange = (e) => {
        const permiso = e.target.value;
        if (permisosSeleccionados.includes(permiso)) {
            setPermisosSeleccionados(permisosSeleccionados.filter(p => p !== permiso));
        } else {
            setPermisosSeleccionados([...permisosSeleccionados, permiso]);
        }
    };

    const handleGuardar = () => {
        console.log('Permisos seleccionados:', permisosSeleccionados);
        // Aquí puedes agregar cualquier lógica adicional para guardar los permisos seleccionados
    };

    const handleRolChange = (e) => {
        setRolSeleccionado(e.target.value);
    };

    return (
        <div className="container seguridad-container">
            <h2>Configuración de Seguridad</h2>
            <div className="btn-group vista-selector" role="group" aria-label="Basic example">
                <button className={`btn btn-outline-primary ${vistaActual === 'permisos' ? 'active' : ''}`} onClick={() => cambiarVista('permisos')}>Permisos</button>
                <button className={`btn btn-outline-primary ${vistaActual === 'auditorias' ? 'active' : ''}`} onClick={() => cambiarVista('auditorias')}>Auditorías</button>
                <button className={`btn btn-outline-primary ${vistaActual === 'bitacoras' ? 'active' : ''}`} onClick={() => cambiarVista('bitacoras')}>Bitácoras</button>
            </div>

            <div className="card vista-actual">
                {vistaActual === 'permisos' && (
                    <div className="card-body">
                        <h3 className="card-title">Administración de Permisos</h3>
                        <p className="card-text">Interfaz para definir y asignar permisos a diferentes roles.</p>
                        <form>
                            <div className="form-group">
                                <label htmlFor="rol">Rol:</label>
                                <select className="form-control" id="rol" value={rolSeleccionado} onChange={handleRolChange}>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Usuario">Usuario</option>
                                </select>
                            </div>
                            {permisos.map((permiso, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={permiso}
                                        value={permiso}
                                        checked={permisosSeleccionados.includes(permiso)}
                                        onChange={(e) => handlePermisoChange(e)}
                                    />
                                    <label className="form-check-label" htmlFor={permiso}>
                                        {permiso}
                                    </label>
                                </div>
                            ))}
                            <button className="btn btn-primary mt-2" onClick={handleGuardar}>Guardar</button>
                        </form>
                    </div>
                )}

                {vistaActual === 'auditorias' && (
                    <div className="card-body">
                        <h3 className="card-title">Auditorías</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="actividad">Actividad:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="actividad"
                                    value={actividad}
                                    onChange={(e) => setActividad(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción:</label>
                                <textarea
                                    className="form-control"
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary mt-2" type="submit">Registrar Actividad</button>
                        </form>
                    </div>
                )}

                {vistaActual === 'bitacoras' && (
                    <div className="card-body">
                        <h3 className="card-title">Bitácoras</h3>
                        <p className="card-text">Visualización de los registros de bitácora del sistema.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Seguridad;
