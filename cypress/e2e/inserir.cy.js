
describe("inserção de tarefas", () => {

  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html")
  })

  it("Deve ser possivel adicionar uma tarefa com click", () => {
    const tituloDaTarefa = "comprar pão"
    cy.get('#todo_title').click().type(tituloDaTarefa)
    cy.get('.bg-white > .col-auto > .btn') .click()
    cy.get('[x-text="todo.task"]').should("have.text",tituloDaTarefa)
    cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should("not.be.empty")


  })
    it("Deve ser possivel adicionar uma tarefa com ENTER", () => {
      const tituloDaTarefa = "comprar pão"
      cy.get('#todo_title').click().type(tituloDaTarefa + '{enter}')
      cy.get('[x-text="todo.task"]').should("have.text",tituloDaTarefa)
      cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should("not.be.empty")

    })
      it("Deve ser possivel atualizar total de tarefas ao cadastrar uma nova", () => {
        const tituloDaTarefa = "comprar pão"
        cy.get('#todo_title').click().type(tituloDaTarefa + '{enter}')
        cy.get('[x-text="todo.task"]').should("have.text",tituloDaTarefa)
        cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should("not.be.empty")
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")

      })

      it('Deve remover uma tarefa e atualizar a lista', () => {
        const tituloDaTarefa = "comprar pão"
        cy.get('#todo_title').click().type(tituloDaTarefa)
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")
        cy.get('[x-text="todo.task"]').should("have.text", tituloDaTarefa)
        cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should("not.be.empty")
        cy.get('.form-check-input').click()
        cy.get('.text-end > .btn').click()
        cy.on('window:alert', (msg) => {
          expect(msg).to.equal('Tem certeza que deseja remover?')
      })
        cy.on('window:confirm', () => true)
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 0")
      })

      it('Deve filtrar as tarefas em aberto', () => {
        const tituloDaTarefa = "comprar pão"
        cy.get('#todo_title').click().type(tituloDaTarefa)
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.mb-3').invoke('text').then(text => {
        const matches = text.match(/Tarefas cadastradas: (\d+)/)
        const numTasks = parseInt(matches[1])
        expect(numTasks).to.be.at.least(1)
  })
        cy.get('[x-text="todo.task"]').should("contain", tituloDaTarefa)   
        })

        it('Deve filtrar as tarefas concluídas', () => {
          const tituloDaTarefa = "comprar pão"
        cy.get('#todo_title').click().type(tituloDaTarefa)
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")
        cy.get('[x-text="todo.task"]').should("have.text", tituloDaTarefa)
        cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should("not.be.empty")
        cy.get('.form-check-input').click()
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")
        cy.get('[x-text="todo.task"]').should("exist")
        
        
      });
              
      it('Deve exibir uma mensagem de erro ao tentar criar uma tarefa sem título', () => {
        cy.get('#todo_title').click()
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.on('window:alert', (msg) => {
          expect(msg).to.equal('Digite um título para a tarefa!')   
      })
        cy.on('window:confirm', () => true)
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 0")
    })


    })


  

    
