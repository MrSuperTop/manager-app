describe('main', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('body').contains('Welcome to main');
  });
});
