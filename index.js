// Importando a Biblioteca
const express = require('express')
const uuid = require('uuid')
// Definino a Porta
const port = 1834
const app = express()
app.use(express.json())

            /* R O T A S */

const users = []

// Middleweare
/*

const appMiddleware = (request, response, next) => {
    next()
}
app.use(appMiddleware)

*/

// Buscando Usuário - ".get"
app.get('/users', (request, response) => {
    return response.status(200).json(users)
})

// Criando Usuário - ".post"
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

// Atualizando Usuário - ".put / .patch"
app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const updatedUser = { id, name, age }
    const index = users.findIndex(user => user.id === id)

    if(index >= 0){
        users[index] = updatedUser
    } else if(index === -1){
        return response.status(404).json({ mensage: "User not Found" })
    } else {
        return response.status(500).json({ mensage: "Internal Server Error" })
    }

    return response.status(201).json(updatedUser)
})

// Deletando Usuário - ".delete"
app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    users.splice(index, 1)
    return response.status(404).json({ mensage: "User not Found" })
})

// console.log() da porta
app.listen(port, () => {
    console.log(`Server hosted on port: ${port}.`)
})

/*     A U L A S     */

/*

Query Params - " http://localhost:1834/first-project-node?nome=eduardo&idade=15 " - Filtros.
Route Params - " http://localhost:1834/first-project-node/2 " - Buscar, deletar ou atualizar algo específico.

Body Params:

Get - Busca informações no Back-End
Post - Cria informações no Back-End
Put / Patch - Altera / Atualiza informações no Back-End
Delete - Deleta informações no Back-End

Middleware - Interceptador - Pode parar ou alterar dados da requesição.

*/

/*

    Retorna uma Resposta
    app.get('/first-project-node/' Esse .get('') define uma parte do link... , (request, response) => {
        
        console.log(request.body)
        const { name, age } = request.body
        
            console.log(request)

            const { nome, idade } = request.query // Esse modo de construir a variável é chamado de: "Destructuring Assignment"
            const { id } = request.params

            console.log(request) - Escreve muitas informações sobre a página, e também...

            ...escreve no terminal um objeto chamado: "query"
            quando o link tem essa terminação: " ?nome=eduardo&idade=15 ", 
            o que foi escrito foi o seguinte: " query: { nome: 'eduardo', idade: '15' }, "
        
        return response.send(`Hello, World!`) - .send() Escreve algo na página.

        return response.json({ name, age })
    })

*/

/*

    Gitignore - Arquivo que serve como uma forma do GitHub ignorar arquivos
    que não queremos subir para o repositório...

    Nesse caso não queremos que suba o "node_modules".

*/