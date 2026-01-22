describe('Cart & Checkout Test', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    });

    it('Should add a product to the cart', () => {
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('Should sort products by price low to high', () => {
        cy.get('.product_sort_container').select('lohi');
        cy.get('.inventory_item_price').first().should('have.text', '$7.99');
    });

    // ✅ Kịch bản mới 1: Remove khỏi giỏ hàng
    it('Should remove product from the cart', () => {
        // Add sản phẩm đầu tiên
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        // Remove ngay tại trang inventory (nút sẽ đổi thành Remove)
        cy.get('.inventory_item').first().find('.btn_inventory').should('contain', 'Remove').click();

        // Badge biến mất (không còn hiển thị số lượng)
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    // ✅ Kịch bản mới 2: Checkout flow đến step two
    it('Should proceed to checkout step two', () => {
        // Add sản phẩm
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        // Vào cart
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // Checkout
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');

        // Điền thông tin
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');

        // Continue
        cy.get('[data-test="continue"]').click();

        // Verify đến step two
        cy.url().should('include', '/checkout-step-two.html');
    });
});
