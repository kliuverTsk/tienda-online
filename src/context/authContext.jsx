import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential;
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Estado de autenticación cambiado:", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            login,
            logout,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}