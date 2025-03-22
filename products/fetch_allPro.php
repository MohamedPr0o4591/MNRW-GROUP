<?php
include("../connection.php");

$stmt = $conn->prepare(
    "SELECT 
            products.* , companies.company , companies.c_id as category_id , categories.category
                     FROM `products`
                             JOIN `companies` ON products.company_id = companies.id
                                     JOIN `categories` ON companies.c_id = categories.id "
);

$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(
    [
        "products" => $result,
    ]
);
