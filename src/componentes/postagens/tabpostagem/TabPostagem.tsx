import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography, Box, Grid } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }
    return (
        <>
            {/**Container das abas ou seja das guias*/}
            <TabContext value={value}>
                <AppBar position="static" className='appbar' >
                    {/*Tab são as abas, o value faz o redirecionamento para o painel com o valor selecionado */}
                    <Tabs centered indicatorColor="secondary" onChange={handleChange}>
                        <Tab label="Postagens" value="1" className='titulo2' />
                        <Tab label="Sobre mim" value="2" className='titulo2' />
                    </Tabs>
                </AppBar>
                <TabPanel value="1" >
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        <ListaPostagem />
                    </Box>
                </TabPanel>


                <TabPanel value="2">
                    <Grid container direction='row' justifyContent='center' alignItems='center'>

                        <Grid alignItems='center' xs={6}>
                            <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo1">Pantera Cor de Rosa</Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary" align="justify">A Pantera Cor de Rosa, pode se afirmar, surgiu meio sem querer, no ano de 1964 quando estreou o filme “A Pantera Cor de Rosa”. O filme contava o roubo de um diamante, que era rosa e o protagonista era Peter Sellers. Acontece que o filme começa com uma simpática animação de uma pantera fumando uma piteira, que não durava nem um minuto, mas caiu nas graças de quem assistiu a película. Então o produtor Blake Edwards resolveu produzir o desenho no ano de 1969, resolveram criar o personagem de animação que durou até 1980.</Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary" align="justify">A Pantera Cor de Rosa estreou no Brasil em 1973 passando em várias emissoras. No ano de 1984, o desenho foi feito em parceria com a Hanna Barbera, e nessa versão, o personagem ganhou voz (já que nos outros episódios, ela era muda), tinha dois filhos e além disso seu gênero era determinado como masculino, já que todos ficavam na dúvida.</Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary" align="justify">A trilha sonora foi feita por Henry Mancini e junto com animação temos outros dois personagens: o Inspetor -um típico policial francês, que resolve os crimes, mas, sempre passa por apuros e o Tamanduá e a Formiga, que no enredo, o inseto consegue dobrar o mamífero. Foram 121 episódios, que começaram a ser produzido na Inglaterra.</Typography>
                            <Typography variant="body1" gutterBottom color="textPrimary" align="justify">A característica da Pantera é de um personagem de boa alma, mas muito desastrada, que acaba se envolvendo em confusões, ou de forma inocente atrapalhando a vida dos outros, sendo apaixonada pela cor rosa. O desenho chegou a ser premiado, lembrando que o filme, ganhou 2 versões novas na década de 2000, ambos tendo Steve Martin como protagonista. Em 2006 contava com a cantora Beyonce e, em 2009 com a indiana miss universo Aishwarya.</Typography>
                        </Grid>
                        <Grid alignItems='center' xs={6} className='imagem0'>
                        </Grid>
                    </Grid>
                </TabPanel>



            </TabContext>
        </>
    );
}
export default TabPostagem;