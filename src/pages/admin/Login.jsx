import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Intentando login con:', email, password);
            const result = await login(email, password);
            console.log('Login exitoso:', result.user);
            if (result.user) {
                window.location.href = '/admin';
            }
        } catch (error) {
            console.error('Error en login:', error.message);
            setError('Credenciales incorrectas: ' + error.message);
        }
    };

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                "kliuvertfigueroa@gmail.com", 
                "Samuel31724731"
            );
            console.log('Usuario creado:', userCredential.user);
            alert('Cuenta creada con éxito');
        } catch (error) {
            console.error('Error completo:', error);
            let errorMessage = 'Error al crear cuenta: ';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage += 'El email ya está registrado';
                    break;
                case 'auth/invalid-email':
                    errorMessage += 'Email inválido';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage += 'Autenticación por email/password no está habilitada';
                    break;
                case 'auth/weak-password':
                    errorMessage += 'La contraseña es muy débil';
                    break;
                default:
                    errorMessage += error.message;
            }
            setError(errorMessage);
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Admin Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {/* Botón temporal para registro */}
                <button type="button" onClick={handleRegister} style={{marginTop: '10px'}}>
                    Crear Cuenta Admin
                </button>
            </form>
        </div>
    );
}