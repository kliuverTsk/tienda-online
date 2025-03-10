import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        return { 
            hasError: true, 
            error 
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error detectado:', error);
        console.error('Información del error:', errorInfo);
        this.setState({
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h2>¡Vaya! Ha ocurrido un error inesperado</h2>
                    <p>Lo sentimos, algo no salió como esperábamos</p>
                    <div className="error-actions">
                        <button 
                            onClick={() => window.location.reload()}
                            className="reload-button"
                        >
                            Intentar de nuevo
                        </button>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="home-button"
                        >
                            Volver al inicio
                        </button>
                    </div>
                    {process.env.NODE_ENV === 'development' && (
                        <details className="error-details">
                            <summary>Detalles del error (modo desarrollo)</summary>
                            <pre>{this.state.error && this.state.error.toString()}</pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;