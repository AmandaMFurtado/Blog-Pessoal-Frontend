//ação relacionada a adição do token utilizando para a validação dentro da api
export type Action = {type: "ADD_TOKEN"; payload: string}; //armazenando o token

export const addToken = (token: string): Action =>({
    type: "ADD_TOKEN",
    payload: token,
});