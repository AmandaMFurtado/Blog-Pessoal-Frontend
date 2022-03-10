import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';

function Navbar() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    let history = useHistory();
    const dispatch = useDispatch();

    //função para limpar o token quando se deslogar
    function goLogout() {
        dispatch(addToken(''));
        //alerta do tipo informativo
        toast.info('Usuário deslogado', {
            //possição onde a notificação sera exibida
            position: "top-right",
            //em quanto tempo a notificação deve desaparecer - 2 segundos
            autoClose: 2000,
            //barrinha de progresso com o tempo
            hideProgressBar: false,
            //possibilidade de fechar a notificação antes do tempo
            closeOnClick: true,
            //pausa na notificação quando clicado
            pauseOnHover: false,
            //possibilidade de mover a notificação de local
            draggable: false,
            //tema do alerta
            theme: "dark",
            progress: undefined,
        });
        history.push('/login')
    }

    var navbarComponent;

    if (token != "") {
        navbarComponent = <AppBar position="static" className='appbar'>
            <Toolbar variant="dense" className='toolbar'>

                <Link to='' className='text-decorator-none'>
                    <Box className='cursor'>
                        <Typography variant="h5" color="inherit" className='blog'>
                            Blog Pantera
                        </Typography>
                    </Box>
                </Link>

                <Box display="flex" justifyContent="start">
                    <Link to='/home' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/postagens' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/temas' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/formularioTema' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Novo tema
                            </Typography>
                        </Box>
                    </Link>
                    

                    {/*onClick - vai chamar a função goLogout */}
                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                        <Avatar alt="" src="/static/images/avatar/2.jpg" className='avatar-navbar'/>
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;