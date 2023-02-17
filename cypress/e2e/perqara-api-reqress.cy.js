describe('Perqara API ReqressIn', () => {
    //Authentication
     //base url
     const base_url_reqressin ='https://reqres.in'
     const email = 'eve.holt@reqres.in'
     const password = 'pistol'
     const name = 'morpheus'
     const job = 'leader'
     const job2 = 'head'
 
 
     it('User Register Successfull', () => {
         const options = {
             method: 'POST',
             url: (`${base_url_reqressin}/api/register`),
             headers: {
                "Content-Type": "application/json",
             },
             body: {
                 "email": email,
                 "password": password
               }
          }
           cy.request(options).then((response) => {
           cy.log(response.body)
           expect(response.status).to.eq(200)
           expect(response.body).to.have.property('id')
           expect(response.body).to.have.property('token')
           window.localStorage.setItem('token', response.body)
           cy.writeFile('cypress/fixtures/dev/reqress_token.json', response.body, 'binary')
           cy.wait(2000)
               })
          })

     it('User Register Successfull - without password', () => {
      const options = {
          method: 'POST',
          url: (`${base_url_reqressin}/api/register`),
          headers: {
             "Content-Type": "application/json",
          },
          body: {
              "email": email
              //"password": password
            }
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error')
        cy.wait(1000)
        
          })
     })
     it('User Login Successfull', () => {
      const options = {
          method: 'POST',
          url: (`${base_url_reqressin}/api/login`),
          headers: {
             "Content-Type": "application/json",
          },
          body: {
              "email": email,
              "password": password
            }
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('token')
        window.localStorage.setItem('token', response.body)
        cy.writeFile('cypress/fixtures/dev/reqress_token.json', response.body, 'binary')
        cy.wait(1000)
        
          })
     })
     it('User Login Usuccessfull - without password', () => {
      const options = {
          method: 'POST',
          url: (`${base_url_reqressin}/api/login`),
          headers: {
             "Content-Type": "application/json",
          },
          body: {
              "email": email
              //"password": password
            }
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error')
        cy.wait(1000)
        
          })
     })
     it('User see all list of user', () => {
      const options = {
          method: 'GET',
          url: (`${base_url_reqressin}/api/users?page=2`),
          headers: {
             "Content-Type": "application/json",
          },
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('page')
        expect(response.body).to.have.property('per_page')
        expect(response.body).to.have.property('total')
        expect(response.body).to.have.property('total_pages')
        expect(response.body).to.have.property('data')
        cy.writeFile('cypress/fixtures/dev/reqess_list_data_user.json', response.body, 'binary')
        cy.wait(2000)
        
          })
     })
     it('User see single list of user', () => {
      const options = {
          method: 'GET',
          url: (`${base_url_reqressin}/api/users/2`),
          headers: {
             "Content-Type": "application/json",
          },
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('data')
        expect(response.body).to.have.property('support')
        cy.writeFile('cypress/fixtures/dev/reqess_single_data_user.json', response.body, 'binary')
        cy.wait(2000)
        
          })
     })
     it('User create new users', () => {
      const options = {
          method: 'POST',
          url: (`${base_url_reqressin}/api/users`),
          headers: {
             "Content-Type": "application/json",
          },
          body: {
              "name": name,
              "job": job
            }
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('job')
        expect(response.body).to.have.property('id')
        cy.writeFile('cypress/fixtures/dev/reqress_new_data.json', response.body, 'binary')
        cy.wait(1000)
        
          })
     })
     it('User update data users', () => {
      cy.readFile('cypress/fixtures/dev/reqress_new_data.json').then(() => {
      const options = {
          method: 'PATCH',
          url: (`${base_url_reqressin}/api/user/2`),
          headers: {
             "Content-Type": "application/json",
          },
          body: {
              "name": name,
              "job": job2
            }
       }
        cy.request(options).then((response) => {
        cy.log(response.body)
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('job')
        expect(response.body).to.have.property('updatedAt')
        cy.writeFile('cypress/fixtures/dev/reqress_updated_data.json', response.body, 'binary')
        cy.wait(1000)
        
          })
     })
    })
 
  })
 
 
  