//service responsavel por toda regra de négocio

//intercepta todos os tipos de requisição - axios
import axios from "axios";
import { url } from "inspector";

//inicializando o axios - necessario colocar dentro de um objeto
export const api = axios.create({
    //essa propriedade vai armazenar o endereço da api
    baseURL: 'https://blogpessoalamf.herokuapp.com/'
})

export const cadastroUsuario = async (url: any, dados: any, setDados: any) => {
    //acionando o método post na api
    const resposta = await api.post(url, dados)
    //resposta dos dados da api
    setDados(resposta.data)
}

//url - conectando os endereços - usuarios/logar
//dados- conectando os dados dos usuarios
// setDados - recebe a resposta da api
//è necessario declar o tipo com any
export const login = async (url: any, dados: any, setDados: any) => {
    //acionando o método post na api
    const resposta = await api.post(url, dados)
    //resposta dos dados da api
    setDados(resposta.data.token)
}
//requisição para listar - buscar as postagens ou temas
//o mesmo método sera aplicado em postagens e temas
//header é passado o token para liberar a requisição
export const busca = async(url: any,setDado: any, header: any) => { 
    //obter o que já tem cadastrado com o verbo get
    const resposta = await api.get(url,header) 
    //resposta da api
    setDado(resposta.data)
}

//fazer uma busca por id
export const buscaId = async(url: any,setDado: any, header: any) => { 
    //obter o que já tem cadastrado com o verbo get
    const resposta = await api.get(url,header) 
    //resposta da api
    setDado(resposta.data)
}

//método de cadastro de informações - Cadastro de postagens e temas
export const post = async(url: any, dados: any,setDado: any, header: any) => { 
    //utiliza-se três paramentros
    const resposta = await api.post(url,dados,header) 
    //resposta da api
    setDado(resposta.data)
}

//método de atualização dos dados da api
export const put = async(url: any, dados: any,setDado: any, header: any) => { 
    //utiliza-se três paramentros
    const resposta = await api.put(url,dados,header) 
    //resposta da api
    //utiliza o token para verificar se o usuario é valido
    setDado(resposta.data)
}

//método para deletar uma postagen ou um tema
//não é armazenado resposta neste método
export const deleteId = async(url: any, header: any) => { 
    //utiliza-se dois paramentros
     await api.delete(url, header) 

}
