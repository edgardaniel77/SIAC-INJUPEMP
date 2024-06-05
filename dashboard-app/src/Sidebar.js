import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUsers, faCalendarAlt, faFileAlt, faShieldAlt, faTools, faPhone, faUserCog, faTv, faSignOutAlt, faBars
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ setCurrentPage, isLoggedIn, handleLogout, toggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    toggleSidebar();
  };

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <FontAwesomeIcon icon={faBars} onClick={handleToggle} />
        {!isCollapsed && <span>INJUPEMP</span>}
      </div>
      <ul className="nav-group">
        <li className="nav-item" onClick={() => setCurrentPage('Inicio')}>
          <FontAwesomeIcon icon={faHome} /> {!isCollapsed && 'Inicio'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('Display')}>
          <FontAwesomeIcon icon={faTv} /> {!isCollapsed && 'Display'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('SalaEspera')}>
          <FontAwesomeIcon icon={faUsers} /> {!isCollapsed && 'Sala de Espera'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('Llamadas')}>
          <FontAwesomeIcon icon={faPhone} /> {!isCollapsed && 'Llamadas'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('GestionUsuarios')}>
          <FontAwesomeIcon icon={faUserCog} /> {!isCollapsed && 'Gestión de Usuarios'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('Turnos')}>
          <FontAwesomeIcon icon={faCalendarAlt} /> {!isCollapsed && 'Turnos'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('Informes')}>
          <FontAwesomeIcon icon={faFileAlt} /> {!isCollapsed && 'Reportes'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('Seguridad')}>
          <FontAwesomeIcon icon={faShieldAlt} /> {!isCollapsed && 'Seguridad'}
        </li>
        <li className="nav-item" onClick={() => setCurrentPage('Configuraciones')}>
          <FontAwesomeIcon icon={faTools} /> {!isCollapsed && 'Configuraciones'}
        </li>
        {isLoggedIn && (
          <li className="nav-item logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> {!isCollapsed && 'Cerrar Sesión'}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
