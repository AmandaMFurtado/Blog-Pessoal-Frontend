
//useState - responsavel por fazer o controle dos estados de um componente
import React, { ChangeEvent, useState, useEffect } from "react";
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import { useDispatch } from 'react-redux';
import './Login.css';
import { addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";


function Login() {

    //essa variavel vai fazer o uso o useHistory - Hooks
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState('')

    //UserLogin - para acessar a informação do state
    //setUserlogin - função para alterar o que está no state
    const [userLogin, setUserLogin] = useState<UserLogin>(
        //Valores iniciais do state
        //As alterações poderam ser feitas através do setUserLogin
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        })

    //responsavel por fazer a atualizção da model com os valores informados pelo usuario
    //ChangeEvent - responsavel por alteração 
    //HTMLInputElement - Manipulação de elementos Input - campos de texto HTML 
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        //no corpo da requisição ira o que sera manipilados - dados utilizados para fazer login 
        setUserLogin({
            //... espalha os atributos que tem dentro de userLogin para dentro da função
            ...userLogin,
            //name - refere-se ao nome da propriedade do campo TextField
            //value - valor digitado pelo usuario 
            [e.target.name]: e.target.value
        })
    }

    //responsavel por fazer o cliclo de vida de um componente
    useEffect(() => {
        //verificando a validade do token
        if (token != '') {
            dispatch(addToken(token));
            //redirecinando para a pagina home 
            history.push('/home')
        }
    }, [token])

    //Responsavel por enviar os dados a requisição
    //Avalia o comportamento do formulario como um todo
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        //previne que o botão atualize a tela
        e.preventDefault();

        //tratando exceção
        try { //tentativa de requisiçaõ há api
            //resposta da requisição
            //post direcionamento de rotas
            //userLogin dados de tentativa de conexão
            //responsavel por gravar o token que vem da api no LocalStorage - setToken
            await login(`/usuarios/logar`, userLogin, setToken)
            //mensagem de notificação caso tudo esteje correto
            toast.success('Usuário logado com sucesso !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
            
        } catch (error) {
            //mensagem de notificação se algo der errado
            toast.error('Dados do usuário inconsistentes. Erro ao logar !', {
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

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' className="fundo">
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>

                    {/*Toda função precisa ser acionada para funcionar */}
                    {/*Acionando o envio do formulario com a função onSubmit*/}
                    <form onSubmit={onSubmit}>

                    <Typography variant='h3' gutterBottom align='center' className="texto1" >Entrar</Typography>

                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="usuario" label="Usuario" name="usuario" autoComplete="usuario" variant="outlined" margin="normal" autoFocus required fullWidth />
                        {/*value - vincula o campo com a model / onChang - aciona a função updateModel*/}
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id="senha" label="Senha" name="senha" type="password" variant="outlined" margin="normal" autoComplete="current-password" required fullWidth />
                        
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary' className="botao">
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center' className="texto" >Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario' className='text-decorator-none' >
                            <Typography variant='subtitle1' gutterBottom align='center' className='texto1'> Cadastre-se</Typography>
                        </Link>

                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>
            </Grid>
        </Grid>
    );
}

export default Login;
