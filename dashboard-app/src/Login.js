import React, { useState } from 'react';
import './Login.css';
import logoSIAC from './imagenes/Logo siac.png';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [emailRequested, setEmailRequested] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleForgotPassword = () => {
    setEmailRequested(true);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpRequested(true);
    setOtp(newOtp);
    setEmailRequested(false);
    alert(`Un correo ha sido enviado a ${email} con tu código OTP.`);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica de autenticación con el backend
    if (otpRequested && otp === generatedOtp) {
      onLoginSuccess();
    } else {
      // Simular solicitud de OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setOtpRequested(true);
      alert('OTP generado: ' + newOtp);
    }
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    if (otp === generatedOtp) {
      onLoginSuccess();
    } else {
      alert('OTP incorrecto');
    }
  };

  return (
    <div className="login-container">
      <img src={logoSIAC} alt="Logo SIAC" className="login-logo" />
      {!emailRequested ? (
        <form onSubmit={otpRequested ? handleOtpSubmit : handleLoginSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="login-input"
          />
          {otpRequested && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Ingrese OTP"
              className="login-input"
            />
          )}
          <button type="submit" className="login-button">
            {otpRequested ? 'Verificar OTP' : 'Iniciar sesión'}
          </button>
          {!otpRequested && (
            <button type="button" onClick={handleForgotPassword} className="recover-link">
              ¿Olvidaste tu contraseña?
            </button>
          )}
        </form>
      ) : (
        <form onSubmit={handleSendEmail} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Enviar correo
          </button>
        </form>
      )}
      {otpRequested && (
        <p className="otp-display">OTP para pruebas: {generatedOtp}</p>
      )}
    </div>
  );
};

export default Login;
