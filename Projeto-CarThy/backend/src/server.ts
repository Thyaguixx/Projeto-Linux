import mysql from 'mysql2';
import express from "express"
import cors from "cors"

const client = mysql.createConnection({
    host: '192.168.78.27',
    user: 'carlin-thy',
    password: '123',
    database: 'ProjetoLinux',
});

client.connect((err) => {
    if (err) {
        //console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    //console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

const app = express()
app.use(cors())
app.use(express.json())


app.post('/SETUsuario', async (req, res) => {
    const { login } = req.body
    const { senha } = req.body

    const SQL = 'INSERT INTO Usuario(UsuarioLogin, UsuarioSenha) VALUES (?, ?)'
    const values = [login, senha]

    client.query(SQL, values, (err, result) => {
        if (err) {
            //console.error('Erro ao inserir usuário:', err);
            res.send({ msg: 'Erro', Sucesso: false })
        }

        //console.log('Usuário inserido com sucesso!');
        res.send({ msg: 'Usuário inserido com sucesso', Sucesso: true });
    })

})

app.get('/GETUsuarios', (req, res) => {
    const query = 'SELECT * FROM Usuario;';

    client.query(query, (err, result) => {
        if (err) {
            //console.error('Erro ao buscar usuários:', err);
            res.send({ msg: 'Erro', Sucesso: false });
        } else {
            //console.log('Usuários buscados com sucesso!');
            res.send({ Sucesso: true, usuarios: result });
        }
    });
});

app.put('/updateUsuario', (req, res) => {
    const { login } = req.body
    const { senha } = req.body
    const { id } = req.body

    const SQL = 'UPDATE Usuario SET UsuarioLogin = ?, UsuarioSenha = ? WHERE UsuarioID = ?'
    const values = [login, senha, id]

    client.query(SQL, values, (err, result) => {
        if (err) {
            //console.error('Erro ao editar usuário:', err);
            res.send({ msg: 'Erro', Sucesso: false });
        } else {
            //console.log('Usuário editado com sucesso!');
            res.send({msg: 'Usuário editado com sucesso!', Sucesso: true});
        }
    })
})

app.delete('/DELUsuario/:usuarioID', (req, res) => {
    const { usuarioID } = req.params; // Obtém o ID do usuário a ser excluído a partir dos parâmetros da URL

    const query = 'DELETE FROM Usuario WHERE UsuarioID = ?';

    client.query(query, [usuarioID], (err, result) => {
        if (err) {
            //console.error('Erro ao excluir usuário:', err);
            res.send({ msg: 'Erro ao excluir usuário', Sucesso: false });
        } else {
            //console.log('Usuário excluído com sucesso!');
            res.send({ msg: 'Usuário excluído com sucesso', Sucesso: true });
        }
    });
});



app.listen(3001, () => {
    //console.log("Servidor rodando!")
})
