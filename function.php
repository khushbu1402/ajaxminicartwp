
<?php // AJAX handler to remove a product from cart
function custom_remove_product_from_cart() {
    if (isset($_POST['product_id'])) {
        $product_id = $_POST['product_id'];
        WC()->cart->remove_cart_item($product_id);
    }

    // Get the updated cart count
    $cart_count = WC()->cart->get_cart_contents_count();

    // Return the updated cart count
    echo $cart_count;

    die();
}
add_action('wp_ajax_custom_remove_product_from_cart', 'custom_remove_product_from_cart');
add_action('wp_ajax_nopriv_custom_remove_product_from_cart', 'custom_remove_product_from_cart');
?>
