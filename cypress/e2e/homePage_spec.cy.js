describe('When I visit the Sour Apples home page I see a collection of movies', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', { fixture: 'allMovies'}).as('movies')
    cy.visit('http://localhost:3000')
    cy.wait('@movies').then(() => {
      'response.ok'
    })
  })

  it('Should display an error message (500 status code) if moves are unable to be displayed on screen', () => {
    cy.intercept(
      "GET", 
      'https://rancid-tomatillos.herokuapp.com/api/v2/movies', 
      {
        statusCode: 500, 
        body: {
          error: "Not Found",
        },
      }
    )
    cy.visit("http://localhost:3000")
    cy.get(".movies-container > h3").contains('Oops! No apples found!')
  })

  it('Should show an error message if the response is not ok', () => {
    cy.get({
      method: 'GET',
      url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
    },
    {
      statusCode: 401,
      body: {
        message: 'Oops, that was a bad apple, please try again!'
      }
    }
  )
})

  it('Should be able to view the home page and see an individual movie card', () => {
    cy
    .get('nav').contains('Sour Apples')
    .get('.movie-apple').should('exist')
    .get('.home-icon').should('exist')
    .get('#694919').contains('Money Plane')
    .get('img')
    .get('p.card-details').contains('Rating: 7 / 10')
    .get('#694919').trigger('mouseover')
  });

  it('Should be able to able to search and clear selections', () => {
    cy
    .get('input').type('Mon')
    .get('.search').contains('Search').click()
    .get('#694919').contains('Money Plane')
    .get('.clear').contains('Clear').click()
    .get('.home-icon').click()
  });

  it('Should be able to able to give the user an error message if no searched movies are found', () => {
    cy
    .get('input').type('Mn')
    .get('.search').contains('Search').click()
    .get('h3').contains('Oops! No apples found!')
  });

  it('Should be able to see a loading spinner while waiting for a movie to display on page', () => {
    cy
    .get('#694919').click()
    .visit('http://localhost:3000/694919')
    .get('.apple-loader').should('exist')
  })
});
