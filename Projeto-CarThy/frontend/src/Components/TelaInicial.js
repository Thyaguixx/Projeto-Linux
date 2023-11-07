import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import wallpaper from '../images/wallpaper_pacman.jpg';
import gatoTrevoso from '../images/gatotrevoso-removebg-preview.png'

const buttonStyle = {
  position: 'absolute',
  marginTop: '60px',
  top: '50%', // Posição vertical no centro
  left: '50%', // Posição horizontal no centro
  transform: 'translate(-50%, -50%)', // Centraliza os botões
  zIndex: 2, // Coloca os botões em um plano superior
};

const wallpaperStyle = {
  width: '100%',
  height: '100vh',
  objectFit: 'cover',
  position: 'absolute', // Permite que o wallpaper ocupe a tela inteira
  top: 0,
  left: 0,
  zIndex: 1, // Coloca o wallpaper em um plano inferior
};

const gatoTrevosoStyle = {
  position: 'absolute',
  zIndex: 3,
  marginTop: '-40px',
  marginLeft: '1195px'
}

function Inicio() {
  return (
    <div style={{ position: 'relative' }}>
      <img src={wallpaper} alt="Wallpaper" style={wallpaperStyle} />
      <div className="container" style={buttonStyle}>
        <img src={gatoTrevoso} alt="Gato trevoso" style={gatoTrevosoStyle} />
        <div className="row">
          <div className="col-md-6">
            <div className="text-center">
              <a href="/cadastro" className="btn btn-primary">
                <FontAwesomeIcon icon={faCat} className="mr-2" /> Cadastrar usuário
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <a href="/lista-usuarios" className="btn btn-success">
                <FontAwesomeIcon icon={faCat} className="mr-2" /> Listar usuários
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;