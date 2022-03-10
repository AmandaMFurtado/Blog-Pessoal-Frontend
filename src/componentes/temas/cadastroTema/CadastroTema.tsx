import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { useHistory, useParams } from 'react-router-dom';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function CadastroTema() {

    //responsavel por fazer o redirecionamento de pagina
    let history = useHistory();
    //Captura os parametros que estão em uma url
    const { id } = useParams<{ id: string }>();
    //captura o token armazenado
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    //responsavel pelo ciclo de vida de um componente
    useEffect(() => {
        //verificando se o usuario esta conectado
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
            history.push("/login")
        }
    }, [token])

    //monitorando o id capturado pelo parametro da rota
    useEffect(() => {
        if (id !== undefined) {
            //faz a conexão com a api e verifica a requisição por meio do id existente
            findById(id)
        }
    }, [id])

    //faz a comunicação com o backend
    //o id aqui é passado como parametro e entra no corpo da função
    async function findById(id: string) {
        //aciona o método responsaver por conectar com a api
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    //responsavel por capturar os valores digitados no formulario e atribui-los ao setTema
    function updatedTema(e: ChangeEvent<HTMLInputElement>) {

        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }
    //enviando os dados para api
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        //previne a atualização da tela
        e.preventDefault()
        //imprime no conseole os dados armazenados no state tema
        console.log("tema " + JSON.stringify(tema))
        //função para atualizar tema
        if (id !== undefined) {
            //verificando a validade do id para ser atualizado
            console.log(tema)
            //informa a rota da api, dados a serem cadastrados e armazena 
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema atualizado com sucesso !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                progress: undefined,
            });
            //cadastrar tema
        } else {
            //se o id for inexistente cria-se um novo tema
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Tema cadastrado com sucesso !', {
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
        back()
    }
    //redirecionando para a pagina temas
    function back() {
        history.push('/temas')
    }

    return (

        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Cadastre um novo tema</Typography>

                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
                    id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />

                <Button type="submit" variant="contained" color="primary">
                    Cadastrar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;