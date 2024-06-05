import React, { useState } from 'react';
import './GestionUsuarios.css';

// Componente para cada campo del formulario
const CampoFormulario = ({ etiqueta, tipo, valor, onChange, opciones }) => {
  return (
    <label>
      {etiqueta}:
      {tipo === "select" ? (
        <select value={valor} onChange={onChange}>
          {opciones.map(opcion => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={tipo} value={valor} onChange={onChange} />
      )}
    </label>
  );
};

// Modal Component para mostrar los Detalles de usuarios
const Modal = ({ usuarios, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles de Usuarios</h2>
        {usuarios.length > 0 ? (
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.id}>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Identificación:</strong> {usuario.identificacion}</p>
                <p><strong>Correo Electrónico:</strong> {usuario.email}</p>
                <p><strong>Celular:</strong> {usuario.celular}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
                <p><strong>Área:</strong> {usuario.area}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

// Formulario de usuario
const FormularioUsuario = ({ usuario, onSubmit, modoEdicion, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(usuario);
  };

  // Opciones para el selector de roles y áreas
  const roles = [
    { value: "administrador", label: "Administrador" },
    { value: "usuario", label: "Usuario" }
  ];

  const areas = [
    { value: "secretaria_general", label: "Secretaría General" },
    { value: "prestamos", label: "Préstamos" },
    { value: "cartera_y_cobro", label: "Cartera y Cobro" },
    { value: "planilla_jubilados", label: "Planilla Jubilados" },
    { value: "beneficios", label: "Beneficios" }
  ];

  return (
    <form onSubmit={handleSubmit} className="formulario-usuario">
      <CampoFormulario etiqueta="Nombre" tipo="text" valor={usuario.nombre} onChange={(e) => onChange(e, 'nombre')} />
      <CampoFormulario etiqueta="Identificación (13 dígitos)" tipo="text" valor={usuario.identificacion} onChange={(e) => onChange(e, 'identificacion')} />
      <CampoFormulario etiqueta="Correo Electrónico" tipo="email" valor={usuario.email} onChange={(e) => onChange(e, 'email')} />
      <CampoFormulario etiqueta="Número de Celular" tipo="text" valor={usuario.celular} onChange={(e) => onChange(e, 'celular')} />
      <CampoFormulario etiqueta="Contraseña" tipo="password" valor={usuario.contraseña} onChange={(e) => onChange(e, 'contraseña')} />
      <CampoFormulario etiqueta="Rol" tipo="select" valor={usuario.rol} onChange={(e) => onChange(e, 'rol')} opciones={roles} />
      <CampoFormulario etiqueta="Área" tipo="select" valor={usuario.area} onChange={(e) => onChange(e, 'area')} opciones={areas} />
      <button type="submit" className="boton-submit">{modoEdicion ? 'Editar' : 'Crear'} Usuario</button>
    </form>
  );
};

// Componente principal de gestión de usuarios
const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({ nombre: '', identificacion: '', email: '', celular: '', contraseña: '', rol: '', area: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUsuarioChange = (e, key) => {
    const { value } = e.target;

    if (key === 'nombre' && !/^[a-zA-Z\s]*$/.test(value)) {
      alert('El nombre solo debe contener letras');
      return;
    }

    if (key === 'identificacion' && !/^\d*$/.test(value)) {
      alert('La identificación solo debe contener números');
      return;
    }

    if (key === 'celular' && !/^\d*$/.test(value)) {
      alert('El número de celular solo debe contener números');
      return;
    }

    if (key === 'celular' && value.length > 8) {
      alert('El número de celular debe tener 8 dígitos');
      return;
    }

    setUsuarioSeleccionado(prev => ({ ...prev, [key]: value }));
  };

  const abrirModalUsuarios = () => {
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const crearEditarUsuario = (usuario) => {
    if (!usuario.nombre || !usuario.identificacion || !usuario.email || !usuario.celular || !usuario.contraseña || !usuario.rol || !usuario.area) {
      alert('Por favor, complete todos los campos');
      return;
    }
    // Validaciones adicionales
    if (usuario.identificacion.length !== 13) {
      alert('La identificación debe tener 13 dígitos');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(usuario.email)) {
      alert('Correo electrónico no válido');
      return;
    }
    if (usuario.celular.length !== 8) {
      alert('El número de celular debe tener 8 dígitos');
      return;
    }
    if (modoEdicion) {
      const actualizados = usuarios.map(u => u.id === usuarioSeleccionado.id ? {...u, ...usuario} : u);
      setUsuarios(actualizados);
      alert('Usuario editado exitosamente');
    } else {
      const nuevoUsuario = {...usuario, id: usuarios.length + 1};
      setUsuarios([...usuarios, nuevoUsuario]);
    }
    setUsuarioSeleccionado({ nombre: '', identificacion: '', email: '', celular: '', contraseña: '', rol: '', area: '' });
    setModoEdicion(false);
  };

  return (
    <div className="gestion-usuarios-container">
      <h2>Gestión de Usuarios</h2>
      <button onClick={abrirModalUsuarios}>Ver Usuarios</button>
      <FormularioUsuario
        usuario={usuarioSeleccionado}
        onSubmit={crearEditarUsuario}
        modoEdicion={modoEdicion}
        onChange={handleUsuarioChange}
      />
      {showModal && <Modal usuarios={usuarios} onClose={cerrarModal} />}
    </div>
  );
};

export default GestionUsuarios;
