<?php
include '../connection.php';

$pro_id = fitchData('pro_id');

$stmt = $conn->prepare(
    "SELECT products.* , info_product.*
        FROM `products` 
        JOIN `info_product` ON products.id = info_product.product_id  WHERE products.id = ? "
);

$stmt->execute((
    [
        $pro_id
    ]
));

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Product details",
            "data" => $result
        ]
    );
} else {
    http_response_code(400);
    echo json_encode(
        [
            "status" => 400,
            "message" => "Product not found"
        ]
    );
}
