// src/app/components/login-modal/LoginModal.jsx
"use client"
import { useState } from 'react';
import { useNavBarContext } from '../../components/main-view/NavBarContext';
import styles from './loginModal.module.css';
import { loginHandler } from '@/utils/request'; // Asegúrate de que esta ruta sea correcta
export const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, setShowLoginModal } = useNavBarContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const loginData = await loginHandler(username, password);

      if (!loginData.ok) {
        // console.error('Error al iniciar sesión:', loginData.error || 'Error desconocido');
        alert('Error al iniciar sesión. Por favor, verifque sus credenciales.');
        return;
      }

      // Si el inicio de sesión es exitoso, actualiza el estado del contexto
      const { nombre, id } = loginData.data.user;
      console.log('Nombre de usuario:', nombre);
      handleLogin(nombre, id);

      setShowLoginModal(false);
      alert('Inicio de sesión exitoso. Bienvenido, ' + nombre + '!');
    }catch (error) {
      console.error('Error en handleSubmit:', error);
    }
  }

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