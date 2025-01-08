
describe('teste de API em Produtos', () => {

    it('Listar produtos - GET', () => {
        cy.request({
          method:'GET',
          url:'produtos'
        }).should((response) =>{
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')

        })
        
    });

    it.only('Cadastrar produto - POST ', () => {
        let token=  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzM1MDY0NDk4LCJleHAiOjE3MzUwNjUwOTh9._g170n4m56T6Jg5nNCCTmJ_2sxrlZuHarPd-jCA7Dw0"
        cy.request({
          method:'POST',
          url:'produtos',
          headers:{authorization: token},
          body:
          {
            "nome": "cabo usb huawei",
            "preco": 15,
            "descricao": "cabo",
            "quantidade": 55
          }
        }).should((response => {
            expect(response.status).equal(201)
            expect(response.body.message).equal('Cadastro realizado com sucesso')
        }))
        
    });





    
});