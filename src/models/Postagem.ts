import Tema from './Tema'

interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    //Importado da model tema
    tema?: Tema| null
}

export default Postagem;