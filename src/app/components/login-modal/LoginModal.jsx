// src/app/components/login-modal/LoginModal.jsx
"use client"
import { useState } from 'react';
import { useNavBarContext } from '../../components/main-view/NavBarContext';
import styles from './loginModal.module.css';

export const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, setShowLoginModal } = useNavBarContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username);

    setShowLoginModal(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={() => setShowLoginModal(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.h2}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={() => setShowLoginModal(false)} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.loginButton}>
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};