import React, { useEffect } from "react";
import './Home.css';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import TabPostagem from "../../componentes/postagens/tabpostagem/TabPostagem";
import ModalPostagem from "../../componentes/postagens/modalPostagem/ModalPostagem";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function Home() {

    let history = useHistory();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
        );
    
    //validando token
    useEffect(() => {
      if (token === "") {
        toast.error('Você precisa estar logado !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
            progress: undefined,
        });
        history.push('/login')
    }
  }, [token])

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" >
                <Grid item xs={6} className='caixa'>
                </Grid>

                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={10} className='titulos'>
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                        <Typography variant="h6" gutterBottom color="textPrimary" component="h6" align="center" className='titulo'>Expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to='/postagens' className="text-decoration">
                        <Button variant="outlined" className='botao'>Postagens</Button>
                        </Link>
                    </Box>
                </Grid>

                <Grid xs={12} >
                    <TabPostagem/>
                </Grid>
            </Grid>

        </>
    );
}

export default Home;