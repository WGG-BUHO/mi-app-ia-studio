import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    try {
      await new Promise<void>(resolve => {
        register(name, email, role);
        // After successful registration, navigate
        // Delay slightly to allow any state updates from register to propagate
        setTimeout(() => {
            if(role === UserRole.CLIENT) {
                navigate(ROUTES.SELECT_PLAN);
            } else {
                // For Lawyer/Admin, might need an approval process. For now, navigate to login.
                alert('Registro de Abogado enviado para aprobación. Será redirigido a la página de inicio de sesión.');
                navigate(ROUTES.LOGIN); 
            }
            resolve();
        },100);
      });
    } catch (err) {
      setError('Error al registrar. Intente nuevamente.'); // Placeholder
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-iusven-blue">Crear Cuenta</h2>
      <Input
        label="Nombre Completo"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Juan Pérez"
        required
      />
      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mínimo 8 caracteres"
        required
      />
      <Input
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repita su contraseña"
        required
      />
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Quiero registrarme como:</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iusven-blue focus:border-iusven-blue sm:text-sm"
        >
          <option value={UserRole.CLIENT}>Cliente</option>
          <option value={UserRole.LAWYER}>Abogado (requiere aprobación)</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Registrarme
      </Button>
      <p className="text-sm text-center text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <button type="button" onClick={() => navigate(ROUTES.LOGIN)} className="font-medium text-iusven-blue hover:text-iusven-lightBlue">
          Inicia Sesión
        </button>
      </p>
    </form>
  );
};
