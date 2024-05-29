

describe('App Component', () => {
  beforeEach(() => {
    cy.fixture('warehouses').as('warehousesData');
    cy.fixture('moveStockResponse').as('moveStockResponseData');

    cy.intercept('GET', 'http://localhost:3001/warehouse?providerId=1', { fixture: 'warehouses' }).as('getWarehouses');
    cy.intercept('POST', 'http://localhost:3001/warehouse/move/*', { fixture: 'moveStockResponse' }).as('postMoveStock');
  });

  it('passes', () => {
    cy.visit('http://localhost:3002');

    // Test for WarehouseCard
    cy.contains('Warehouse 1');
    cy.contains('1234 Main St');
    cy.contains('Warehouse 2');
    cy.contains('5678 Market St');

    // Test for MoveStock
    cy.get('select').eq(0).select('101');
    cy.get('input[type="number"]').type('10');
    cy.get('select').eq(1).select('1');
    cy.get('select').eq(2).select('2');
    cy.contains('Mover').click();

    cy.wait('@postMoveStock').then((interception) => {
      expect(interception.response.body).to.include({
        status: 'success'
      });
    });
  });
});

describe('WarehouseCard Component', () => {
  const warehouse = {
    id: 1,
    address: '1234 Main St',
    products: [
      { productId: 101, stock: 20 },
      { productId: 102, stock: 15 }
    ]
  };

  it('displays warehouse information correctly', () => {
    cy.mount(<WarehouseCard warehouse={warehouse} />);

    cy.contains('Warehouse 1');
    cy.contains('1234 Main St');
    cy.contains('101').parent().contains('20');
    cy.contains('102').parent().contains('15');
  });
});

describe('MoveStock Component', () => {
  beforeEach(() => {
    cy.fixture('warehouses').as('warehousesData');
    cy.intercept('GET', 'http://localhost:3001/warehouse?providerId=1', { fixture: 'warehouses' }).as('getWarehouses');
    cy.intercept('POST', 'http://localhost:3001/warehouse/move/*', { fixture: 'moveStockResponse' }).as('postMoveStock');
  });

  it('moves stock between warehouses', () => {
    cy.mount(<MoveStock providerId={1} />);

    cy.wait('@getWarehouses');

    cy.get('select').eq(0).select('101');
    cy.get('input[type="number"]').type('10');
    cy.get('select').eq(1).select('1');
    cy.get('select').eq(2).select('2');
    cy.contains('Mover').click();

    cy.wait('@postMoveStock').then((interception) => {
      expect(interception.response.body).to.include({
        status: 'success'
      });
    });
  });
});

describe('Warehouses Component', () => {
  beforeEach(() => {
    cy.fixture('warehouses').as('warehousesData');
    cy.intercept('GET', 'http://localhost:3001/warehouse?providerId=1', { fixture: 'warehouses' }).as('getWarehouses');
  });

  it('displays warehouses correctly', () => {
    cy.mount(<Warehouses providerId={1} />);

    cy.wait('@getWarehouses');

    cy.contains('Warehouse 1');
    cy.contains('1234 Main St');
    cy.contains('Warehouse 2');
    cy.contains('5678 Market St');
  });
});
