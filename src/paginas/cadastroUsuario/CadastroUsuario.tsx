import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box, Typography, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import './CadastroUsuario.css';
import { toast } from 'react-toastify';

//função para cadastrar usuario
function CadastroUsuario() {

    //utilizada junto com o useEfecct para direcionar a tela de cadastro para a tela de login
    let history = useHistory()
    //verificar se as senhas são iguais enviando para cadastro
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    //contem as informação que serão enviadas para cadastro
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    //responsavel por armazenar os valores de retorno da api
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    //faz a verificação dos dados retornados 
    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])

    //faz a verificação da senha junto com setConfirmarSenha
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    //responsavel por enviar os dados para cadastro
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        //previne a atualização da tela
        e.preventDefault()
        //verificação da senhas
        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            //se os dados estiverem corretos serão cadastrados
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            //informando que o usuario foi cadastrado e redireciona para a tela de login
            toast.success('Usuário cadastrado com sucesso !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
        } else {
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
        }
    }

    //retorno da função
    return (

        //tela principal
        //direction diz que o container sera identificado como uma linha - row - na mesma linha
        //justifyContent - para justificar o conteudo
        //alignItems - alinhamaento de itens
        <Grid container direction='row' justifyContent='center' alignItems='center' className='fundo'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>

                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>

                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>

                        {/* required - torna o preenchimento do campo obrigatorio */}
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth required />

                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='usuario' label='Usuario' variant='outlined' name='usuario' margin='normal' fullWidth required />

                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth placeholder='Insira no minimo 8 caracteres' required />

                        {/*Vai fazer a verificação se as senhas são iguais - confirmarSenhaHandle */}
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                            id='confirmarSenha' label='Confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth required />

                        <Box marginTop={2} textAlign='center'>

                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='botao1 textos2'>
                                    Cancelar
                                </Button>
                            </Link>

                            <Button type='submit' variant='contained' color='secondary' className='botao1 textos2'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;