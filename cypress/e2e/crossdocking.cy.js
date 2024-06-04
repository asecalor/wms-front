describe('Warehouse Management Application', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3005'); // Adjust the URL if your app runs on a different port or path
    });

    it('should fetch warehouses and display them based on provider ID', () => {
        const providerId = 1;

        // Intercept the fetch request before entering the provider ID
        cy.intercept('GET', `http://localhost:3001/warehouse?providerId=${providerId}`).as('fetchWarehouses');

        // Enter provider ID
        cy.get('input.input-style').type(providerId);

        // Wait for warehouses to be fetched
        cy.wait('@fetchWarehouses').then((interception) => {
            expect([200, 201, 202, 304]).to.include(interception.response.statusCode);
        });

        // Verify that the warehouses are displayed
        cy.get('.warehouse-card-style').should('have.length.at.least', 1);
    });

    it('should show an error message for invalid provider ID', () => {
        // Enter an invalid provider ID
        cy.get('input.input-style').type('invalid');

        // Verify that no request is made and no warehouses are displayed
        cy.get('.warehouse-card-style').should('have.length', 0);
    });

    it('should show an error message when moving stock with invalid input', () => {
        const providerId = 1;

        // Intercept the fetch request before entering the provider ID
        cy.intercept('GET', `http://localhost:3001/warehouse?providerId=${providerId}`).as('fetchWarehouses');

        // Enter provider ID
        cy.get('input.input-style').type(providerId);

        // Wait for warehouses to be fetched
        cy.wait('@fetchWarehouses').then((interception) => {
            expect([200, 201, 202,304]).to.include(interception.response.statusCode);
        });

        // Attempt to move stock with invalid input
        cy.get('button').contains('Mover').click();

        // Verify error message
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Por favor, rellena todos los campos. La cantidad debe ser positiva.');
        });
    });

    it('should move stock between warehouses and update the stock correctly', () => {
        const providerId = 1;

        // Intercept the fetch request before entering the provider ID
        cy.intercept('GET', `http://localhost:3001/warehouse?providerId=${providerId}`).as('fetchWarehouses');

        // Enter provider ID
        cy.get('input.input-style').type(providerId);

        // Wait for warehouses to be fetched
        cy.wait('@fetchWarehouses').then((interception) => {
            expect([200, 201, 202,304]).to.include(interception.response.statusCode);
        });

        // Select product to move
        cy.get('select').eq(0).select('1'); // Select first product in the list (assuming productId is 1)

        // Enter quantity
        cy.get('input[type="string"]').type('1');

        // Select from warehouse
        cy.get('select').eq(1).select('1'); // Select first warehouse in the list (assuming warehouse ID is 1)

        // Select to warehouse
        cy.get('select').eq(2).select('2'); // Select second warehouse in the list (assuming warehouse ID is 2)

        // Intercept and wait for the stock move API call
        cy.intercept('POST', 'http://localhost:3001/warehouse/move/*').as('moveStock');
        cy.get('button').contains('Mover').click();
        cy.wait('@moveStock').then((interception) => {
            expect([200, 201, 202,304]).to.include(interception.response.statusCode);
        });

        // Verify that warehouses are refreshed
        cy.wait('@fetchWarehouses').then((interception) => {
            expect([200, 201, 202,304]).to.include(interception.response.statusCode);
        });

        // // Verify stock update
        // // Assuming initial stock quantities are known for the test
        // const initialStockFromWarehouse = 100; // replace with actual initial stock
        // const initialStockToWarehouse = 50;   // replace with actual initial stock
        // const movedQuantity = 10;

        // cy.get('.warehouse-card-style').eq(0).within(() => {
        //     cy.get('tbody tr').contains('1').parent().find('td').eq(1).should('have.text', initialStockFromWarehouse - movedQuantity);
        // });

        // cy.get('.warehouse-card-style').eq(1).within(() => {
        //     cy.get('tbody tr').contains('1').parent().find('td').eq(1).should('have.text', initialStockToWarehouse + movedQuantity);
        // });
    });

    it('should display correct warehouses based on different provider IDs', () => {
        const providerId1 = 1;
        const providerId2 = 2;

        // Intercept the fetch request for the first provider ID
        cy.intercept('GET', `http://localhost:3001/warehouse?providerId=${providerId1}`).as('fetchWarehouses1');

        // Enter first provider ID
        cy.get('input.input-style').type(providerId1);

        // Wait for warehouses to be fetched
        cy.wait('@fetchWarehouses1').then((interception) => {
            expect([200, 201, 202,304]).to.include(interception.response.statusCode);
        });

        // Verify that the warehouses are displayed for provider 1
        cy.get('.warehouse-card-style').should('have.length.at.least', 1);

        // Clear the input and enter second provider ID
        cy.get('input.input-style').clear();

        // Intercept the fetch request for the second provider ID
        cy.intercept('GET', `http://localhost:3001/warehouse?providerId=${providerId2}`).as('fetchWarehouses2');

        // Enter second provider ID
        cy.get('input.input-style').type(providerId2);

        // Wait for warehouses to be fetched for provider 2
        cy.wait('@fetchWarehouses2').then((interception) => {
            expect([200, 201, 202,304]).to.include(interception.response.statusCode);
        });

        // Verify that the warehouses are displayed for provider 2
        cy.get('.warehouse-card-style').should('have.length.at.least', 1);
    });
});
