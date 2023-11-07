import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import wallpaper from '../images/wallpaper_pacman.jpg';
import gatoNoia from '../images/gatonoia-removebg-preview.png'

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

const gatoNoiaStyle = {
    position: 'absolute',
    zIndex: 2,
    marginTop: '965px',
    marginLeft: '1990px'
}

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedLogin, setEditedLogin] = useState('');
    const [editedSenha, setEditedSenha] = useState('');
    const [editedId, setEditedId] = useState('');

    const GETUsuarios = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/GETUsuarios');
            if (response.data.Sucesso) {
                console.log(response.data.usuarios);
                return response.data.usuarios;
            } else {
                console.error('Erro ao buscar usuários:', response.data.msg);
                return [];
            }
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    };

    const fetchUsers = async () => {
        const users = await GETUsuarios();
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deletarUsuario = async (user) => {
        try {
            const response = await Axios.delete(`http://localhost:3001/DELUsuario/${user.UsuarioID}`);
            if (response.data.Sucesso) {
                console.log('Usuário excluído com sucesso:', user.UsuarioID);

                // Atualize a lista de usuários após a exclusão, removendo o usuário da lista.
                setUsers((prevUsers) => prevUsers.filter((u) => u.UsuarioID !== user.UsuarioID));
            } else {
                console.error('Erro ao excluir usuário:', response.data.msg);
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const editarUsuario = (user) => {
        // Quando o botão "Editar" é clicado, defina o usuário selecionado e abra o modal de edição
        setSelectedUser(user);
        setEditedLogin(user.UsuarioLogin);
        setEditedSenha(user.UsuarioSenha);
        setEditedId(user.UsuarioID)
        setShowModal(true);
    };

    const salvarEdicaoUsuario = async (event) => {
        event.preventDefault();

        const response = await Axios.put('http://localhost:3001/updateUsuario', {
            login: editedLogin,
            senha: editedSenha,
            id: editedId
        })

        if (response.data.Sucesso) {
            Swal.fire('Sucesso', response.data.msg, 'success')
        } else {
            Swal.fire('Erro', response.data.msg, 'error')
        }

        console.log('Salvar edições para o usuário:', selectedUser.UsuarioID);
        setShowModal(false); // Fecha o modal após a edição
    };

    return (
        <div style={{ position: 'relative' }}>
            <img src={wallpaper} alt="Wallpaper" style={wallpaperStyle} />
            <div style={corpoCadastroStyle}>
                <img src={gatoNoia} alt="Gato noia" style={gatoNoiaStyle} />
                <div className="container">
                    <h2 style={{ color: 'whitesmoke' }}>Lista de Usuários</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: '50px'}}>ID</th>
                                <th style={{ width: '50px'}}>Login</th>
                                <th style={{ width: '50px'}}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.UsuarioID}>
                                    <td>{user.UsuarioID}</td>
                                    <td>{user.UsuarioLogin}</td>
                                    <td>
                                        <Button variant="info" onClick={() => editarUsuario(user)}>
                                            Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => deletarUsuario(user)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Modal de Edição */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Usuário</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editedLogin}
                                        onChange={(e) => setEditedLogin(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={editedSenha}
                                        onChange={(e) => setEditedSenha(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={salvarEdicaoUsuario}>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default UserList;
