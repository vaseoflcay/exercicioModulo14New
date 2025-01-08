
import contrato from '../contratos/produtos.contratos'

/// <reference types= "cypress"/>

describe('teste de API em Produtos', () => {
    let token
    beforeEach(() => {
        cy.token('fulano@qa.com','teste').then(tkn =>{
            token = tkn
        })
    });

    it('deve validar contrato dos produtos com sucesso', () => {
        cy.request('produtos').then(response =>{
            return contrato.validateAsync(response.body)
        })
    });

    it.only('Listar produtos - GET', () => {
        cy.request({
          method:'GET',
          url:'produtos'
        }).should((response) =>{
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')

        })
        
    });

    it('Cadastrar produto com sucesso- POST ', () => {
        let produto= 'produtoEBAC' + Math.floor(Math.random()*10000000)
        cy.cadastrarProduto(token, produto, 10, 'cabo', 50).should((response => {  // foi criado um commnad.cypress 
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        }))
        
    });


    it('deve validar a mensagem de produto cadastrado anteriomente - NEGATIVO', () => {
         
         cy.cadastrarProduto(token, 'cabo usb samsung', 10, 'cabo', 50).should((response =>{
            expect(response.status).equal(400)
            expect(response.body.message).equal('Já existe produto com esse nome')
          }))

        
    });

    it.only('deve editar um produto - PUT', () => {
        let produto= 'Produto EBAC Editado' + Math.floor(Math.random()*10000000)
        cy.cadastrarProduto(token, produto, 10, 'Produto EBAC Editado', 100).then(response =>{
            let id = response.body._id
            cy.request({
                method: 'PUT',
                url:`produtos/${id}`,
                headers:{authorization: token},
                body:  
                   {
                      "nome": produto,
                      "preco": 500,
                      "descricao": "Produto Editado",
                      "quantidade": 100
                   }
    
            }).should(response =>{
                expect(response.status).equal(200)
                expect(response.body.message).equal('Registro alterado com sucesso')
            })
        })
        


        
    });

    it('deve deletar um produto - DELETE', () => {
        cy.cadastrarProduto(token, 'produto a ser deletado', 100, 'deletar',50).then(response =>{
            let id= response.body._id
              cy.request({
                method:'DELETE',
                url:`produtos/${id}`,
                headers:{authorization : token}
              }).should(response =>{
                expect(response.body.message).to.equal('Registro excluído com sucesso')
                expect(response.status).equal(200)
              })

              




        })


        
    });



    
});