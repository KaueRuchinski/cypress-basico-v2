/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach (function() {
        cy.visit('./src/index.html')
    })
    /// exe 0
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
//exe 1
    it('preenche os campos obrigatórios e envia o formulário', function() {

        const longText = 'teste ,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName').type('Kaue')
        cy.get('#lastName').type('Humenhuk')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        

    })
    ///exe2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('Kaue')
        cy.get('#lastName').type('Humenhuk')
        cy.get('#email').type('teste#teste.com')
        cy.get('#open-text-area').type('boa')
        
        cy.get('button[type="submit"]').click()
        
        
        cy.get('.error').should('be.visible')
    })

    it('campo de telefone só aceita números', function(){

        cy.get('#phone')
        .type('numero')
        .should('have.value', '')
    })


////exe 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').type('Kaue')
        cy.get('#lastName').type('Humenhuk')
        cy.get('#email').type('teste#teste.com')
        cy.get('#open-text-area').type('boa')
        cy.get('#phone').type('numero')
        
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    ///exe 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone' , function(){

        cy.get('#firstName').type('Kaue').should('have.value', 'Kaue')
        .clear().should('have.value', '')

        cy.get('#lastName').type('Humenhuk').should('have.value', 'Humenhuk')
        .clear().should('have.value', '')

        cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com')
        .clear().should('have.value', '')

        cy.get('#phone').type('1234567890').should('have.value', '1234567890')
        .clear().should('have.value', '')
    }) 
    /// exe 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    //exe 7
    it('envia o formuário com sucesso usando um comando customizado' , function(){

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
///exe 1 aula 6
    it('marca ambos checkboxes, depois desmarca o último', function(){

        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){

    cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

        })

       
  })
  it('seleciona um arquivo simulando um drag-and-drop', function(){

    cy.get('input[type=file]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
        
        })


    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type=file]')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
            
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    

})