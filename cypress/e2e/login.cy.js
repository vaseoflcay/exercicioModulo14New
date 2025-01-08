
describe('teste API - login', () => {
 it('deve realizar login com sucesso', () => {
  cy.request({
    method: 'POST',
    url: 'login',
    body:{
      "email": "fulano@qa.com",
      "password": "teste"
    }
  }).then((response) =>{
    cy.log(response.body.authorization)
    expect(response.status).equal(200)
    expect(response.body.message).equal('Login realizado com sucesso')
  })
  
 });

  
});