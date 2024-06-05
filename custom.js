
jQuery(function($) {
    // Function to update cart count
    function updateCartCount() {
        // AJAX call to refresh the cart count
        $.ajax({
            type: 'POST',
            url: custom_cart_ajax.ajaxurl, // WordPress AJAX URL
            data: {
                action: 'custom_refresh_cart_count'
            },
            success: function(response) {
                // Update the cart count wherever it's displayed
                $('.cart-count').text(response);
            }
        });
    }

    // On document ready, update cart count
    updateCartCount();

    // Listen for updates in cart totals
    $(document.body).on('updated_cart_totals', function() {
        // Update cart count
        updateCartCount();
    });

    // Listen for removal of a product from cart using AJAX
    $(document.body).on('click', '.remove', function(e) {
        e.preventDefault();
        var remove_button = $(this);
        var product_id = remove_button.data('product_id');

        // AJAX call to remove the product from cart
        $.ajax({
            type: 'POST',
            url: custom_cart_ajax.ajaxurl, // WordPress AJAX URL
            data: {
                action: 'custom_remove_product_from_cart',
                product_id: product_id
            },
            success: function(response) {
                // Update cart count
                updateCartCount();
                // Trigger an update of the cart totals
                $(document.body).trigger('updated_cart_totals');
            }
        });
    });
});
