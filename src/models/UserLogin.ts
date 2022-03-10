//Conectando com o banco de dados
//Os dados utilizados aqui são os mesmos utilizados no backend
//Sera splicado ná pagina de login
interface UserLogin{
    id: number;
    usuario: string;
    senha: string;
    token?: string | null
}

export default UserLogin;