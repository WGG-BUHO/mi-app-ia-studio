import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';


export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState<UserRole>(UserRole.CLIENT); // Default role, could be selectable
  const [error, setError] = useState('');
  const { login, isLoading, user } = useAuth(); // Added user to determine navigation target
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, ingrese email y contraseña.');
      return;
    }
    
    try {
      // Simulate login and wait for user state to update
      // The role determination logic could be more complex in a real app
      // Forcing CLIENT role for this simplified login.
      await new Promise<void>(resolve => {
        login(email, UserRole.CLIENT); 
        // We need to react to user state change for navigation, which AuthContext and useEffects in pages handle.
        // Direct navigation here might be premature if login is async and updates state that other components react to.
        // Forcing a slight delay to allow state update before potential navigation
        setTimeout(() => {
          // Check role from potentially updated user after login for navigation
          // This part relies on `user` object being updated by `login` call.
          // In a real app, login might return the user object or a promise that resolves it.
          // For now, this is a simplified approach.
          // The navigation based on role is generally better handled in a top-level component or effect listening to auth state.
          // However, for this specific flow, navigating after login is common.
          if (user?.role === UserRole.ADMIN) navigate(ROUTES.ADMIN_DASHBOARD);
          else if (user?.role === UserRole.LAWYER) navigate(ROUTES.LAWYER_DASHBOARD);
          else navigate(ROUTES.CLIENT_DASHBOARD); // Default for CLIENT or if role not determined
          resolve();
        }, 100); // Small delay to let state propagate if login is truly async.
      });
      
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.'); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-iusven-blue">Iniciar Sesión</h2>
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
        placeholder="********"
        required
      />
      {/* 
      // Example Role Selector (optional)
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Soy un</label>
        <select 
          id="role" 
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iusven-blue focus:border-iusven-blue sm:text-sm"
        >
          <option value={UserRole.CLIENT}>Cliente</option>
          <option value={UserRole.LAWYER}>Abogado</option>
          <option value={UserRole.ADMIN}>Administrador</option>
        </select>
      </div> 
      */}
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Ingresar
      </Button>
      <p className="text-sm text-center text-gray-600">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={() => navigate(ROUTES.REGISTER)} className="font-medium text-iusven-blue hover:text-iusven-lightBlue">
          Regístrate
        </button>
      </p>
    </form>
  );
};
