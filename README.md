Concrete Solutions API - Sing-up Sign-in
===================================================================

## Codeship Status:
[ ![Codeship Status for astesio/concrete-solutions-api-sing-up-sign-in](https://codeship.com/projects/c5862b10-7e10-0134-fbaf-42c59cf9d92c/status?branch=master)](https://codeship.com/projects/181577)

## Instruções de uso

Este projeto está hospedado no cloud do [heroku](https://www.heroku.com/), que e gerenciado pelo [CodeShip](https://codeship.com/), seguindo os padrõs de CI (Continuous Integration) , para a persistencia de dados foi usado o Banco de Dados não relacional no caso o [MongoDB](https://www.mongodb.com/), este projeto esta preparado para rodar um banco tanto local, como um banco como serviço, para este projeto estou usando o [MongoLab](https://mlab.com/).

### Cadastro de um usuário:

Neste tutorial estou usando o software [CURL](https://curl.haxx.se/).

```bash
curl -H "Content-Type: application/json" -X POST -d '{"name": "test-terminal", "email": "test-terminal@gmail.com", "password":"123456", "telephones": [{ "ddd": "31", "number": "99184-9826"}]}' https://concrete-solutions.herokuapp.com/api/user
```

sua resposta deve ser algo como

```bash
"user": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ODE2ODdhNDEzYTE5ZjAwMjU4MTZlYmQiLCJleHAiOjE0Nzc4NzMzMjR9.vOxMqgNnCu5ZvHSUa7igsPszecsgxzFg9mXEMI3NlJQ",
        "updated_at": "2016-10-30T23:35:30.967Z",
        "email": "test-terminal@gmail.com",
        "name": "test-termina",
        "_id": "581687a413a19f0025816ebd",
        "created_at": "2016-10-30T23:35:30.967Z",
        "last_login": "2016-10-30T23:35:30.967Z",
        "telephones": [
            {
                "ddd": "31",
                "number": "99184-9826",
                "_id": "581687a413a19f0025816ebe"
            }
        ]
    }
```

perceba que na resposta não e retornado o password, e uma forma a mais para a segurança do usuário, mais caso queria o password na response, basta remover o metodo, toJSON que se encontra do arquivo ***UserModel.js*** dentro da pasta models.

### Listando todos os usuários:
  
Basta executar ```bash curl https://concrete-solutions.herokuapp.com/api/user.```

Sua respsta será todos os usuários.

### Logando:

Para logar na aplicação e preciso ter o e-mail e a senha cadastrada

```bash 
curl -H "Content-Type: application/json" -X POST -d '{"email": "nero@gasdilss.com", "password":"12df345"}' https://concrete-solutions.herokuapp.com/api/sign-in
```

### Para buscar um usuário especifico

Antes de buscar e preciso se logar primeiramente, com isso e concedido 30 minutos para sua sessão, nesse período e possível fazer a busca da seguinte maneira: 
E preciso passar o ***token*** no header e o ***id*** que se deseja buscar exemplo:

```bash
curl https://concrete-solutions.herokuapp.com/api/user/5581616c7626e2c0f3bdc3068 -X GET -H "Authentication: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ODE2MTZjNzYyNmUyYzBmM2JkYzMwNjgiLCJleHAiOjE0Nzc4NDQ0MzF9.MhnaIy8Nh-uV2IY6L07G-AYx-RLBQ7Aq6rnsKxmIlm4"
```

## Desafio node.js Concrete Solutions
Crie um aplicativo backend que exporá uma API RESTful de criação de sing up/sign in.
Todos os endpoints devem somente aceitar e somente enviar JSONs. O servidor deverá retornar JSON para os casos de endpoint não encontrado também.
O aplicativo deverá persistir os dados (ver detalhes em requisitos).
Todas as respostas de erro devem retornar o objeto:
{ "mensagem": "mensagem de erro" }
Segue a documentação dos endpoints:

### Criação de cadastro

* Este endpoint deverá receber um usuário com os seguintes campos: nome, email, senha e uma lista de objetos telefone. Seguem os modelos:
{ "nome": "string", "email": "string", "senha": "senha", "telefones": [ { "numero": "123456789", "ddd": "11" } ] }
* Usar status codes de acordo
* Em caso de sucesso irá retornar um usuário mais os campos:
* `id`: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante se fosse um GUID)
* `data_criacao`: data da criação do usuário
* `data_atualizacao`: data da última atualização do usuário
* `ultimo_login`: data do último login (no caso da criação, será a mesma que a criação)
* `token`: token de acesso da API (pode ser um GUID ou um JWT)
* Caso o e-mail já exista, deverá retornar erro com a mensagem "E-mail já existente".
* O token deverá ser persistido junto com o usuário

### Sign in

* Este endpoint irá receber um objeto com e-mail e senha.
* Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar igual ao endpoint de sign_up.
* Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem "Usuário e/ou senha inválidos"
* Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401 mais a mensagem "Usuário e/ou senha inválidos"

### Buscar usuário

* Chamadas para este endpoint devem conter um header na requisição de Authentication com o valor "Bearer {token}" onde {token} é o valor do token passado na criação ou sign in de um usuário.
* Caso o token não exista, retornar erro com status apropriado com a mensagem "Não autorizado".
* Caso o token exista, buscar o usuário pelo user_id passado no path e comparar se o token no modelo é igual ao token passado no header.
* Caso não seja o mesmo token, retornar erro com status apropriado e mensagem "Não autorizado"
* Caso seja o mesmo token, verificar se o último login foi a MENOS que 30 minutos atrás.
* Caso não seja a MENOS que 30 minutos atrás, retornar erro com status apropriado com mensagem "Sessão inválida".
* Caso tudo esteja ok, retornar o usuário.

## Requisitos

* persitência de dados
* Sistema de build Gestão de dependências via gerenciador de pacotes Utilizar um task runner para realização de build
* Padronização de estilo de código em tempo de build - sugestão: jsHint/jsLint
* API: Express

## Requisitos desejáveis

* JWT como token
* Testes unitários
* Criptogafia não reversível (hash) na senha e no token
