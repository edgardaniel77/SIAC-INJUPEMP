import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Inicio from './Paginas/Inicio';
import Llamadas from './Paginas/Llamadas';
import SalaEspera from './Paginas/SalaEspera';
import GestionUsuarios from './Paginas/GestionUsuarios';
import Turnos from './Paginas/Turnos';
import Informes from './Paginas/Reportes'; 
import Seguridad from './Paginas/Seguridad';
import Configuraciones from './Paginas/Configuraciones';
import Login from './Login';
import Display from './Paginas/Display';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
      case 'Inicio':
        return <Inicio />;
      case 'Display':
        return <Display />;
      case 'SalaEspera':
        return <SalaEspera />;
      case 'Llamadas':
        return <Llamadas />;
      case 'Turnos':
        return <Turnos />;
      case 'GestionUsuarios':
        return <GestionUsuarios />;
      case 'Informes':
        return <Informes />;
      case 'Seguridad':
        return <Seguridad />;
      case 'Configuraciones':
        return <Configuraciones />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className={`container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {isLoggedIn && (
        <Sidebar
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          handleLogout={() => setIsLoggedIn(false)}
          toggleSidebar={toggleSidebar}
        />
      )}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
