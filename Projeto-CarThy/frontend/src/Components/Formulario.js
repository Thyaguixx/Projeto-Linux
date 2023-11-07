import React, { useState } from 'react';
import Axios from "axios"
import Swal from "sweetalert2"
import wallpaper from '../images/wallpaper_pacman.jpg';
import gatoSmart from '../images/gatosmart-removebg-preview.png'
import gatoMucego from '../images/gatomucego-removebg-preview.png'

const wallpaperStyle = {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    position: 'absolute', // Permite que o wallpaper ocupe a tela inteira
    top: 0,
    left: 0,
    zIndex: 1, // Coloca o wallpaper em um plano inferior
};

const corpoCadastroStyle = {
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '45vh',
    marginLeft: '600px'
}

const gatoMucegoStyle = {
    position: 'absolute',
    zIndex: 3,
    marginTop: '-100px',
    marginLeft: '1943px'
}

function FormularioUser() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const validaCampos = () => {
        let IsVazio = false

        if (login === '' || senha === '') {
            IsVazio = true
            return IsVazio
        }
    }

    const cadastrar = async (e) => {
        e.preventDefault();

        if (!validaCampos()) {
            const response = await Axios.post('http://localhost:3001/SETUsuario', {
                login: login,
                senha: senha
            })

            if (response.data.Sucesso) {
                Swal.fire('Sucesso', response.data.msg, 'success').then(() => window.location.reload())
            } else {
                Swal.fire('Erro', response.data.msg, 'error')
            }
        } else {
            Swal.fire({
                title: 'Alerta',
                html: 'Preencha todos os campos aí mermão.',
                imageUrl: gatoSmart
            })
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <img src={wallpaper} alt="Wallpaper" style={wallpaperStyle} />
            <div style={corpoCadastroStyle}>
                <img src={gatoMucego} alt="Gato happy" style={gatoMucegoStyle} />
                <div className="container">
                    <h2 style={{ color: 'whitesmoke' }}>Cadastrar Usuário</h2>
                    <form onSubmit={cadastrar}>
                        <div className="form-group">
                            <label htmlFor="login" style={{ color: 'whitesmoke', marginBottom: '10px' }}>Login:</label>
                            <input
                                type="text"
                                name="login"
                                className="form-control"
                                style={{ width: '300px' }}
                                placeholder="Digite o login"
                                value={login}
                                onChange={(event) => setLogin(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha" style={{ color: 'whitesmoke', marginBottom: '10px', marginTop: '9px' }}>Senha:</label>
                            <input
                                type="password"
                                name="senha"
                                className="form-control"
                                style={{ width: '300px' }}
                                placeholder="Digite a senha"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Concluir</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormularioUser;
