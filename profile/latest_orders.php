<?php
include("../connection.php");
include("../bearerAuth.php");

$stmt = $conn->prepare(
    "SELECT orders.status , orders.date , orders.total_price ,order_details.* 
            FROM  `orders` 
                 JOIN `order_details` ON orders.id =  order_details.o_id
                      WHERE orders.u_id = ?"
);

$stmt->execute(
    [$tokedId]
);

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($result) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "orders" => $result
        ]
    );
} else {
    http_response_code(500);
    echo json_encode(
        [
            "status" => 500,
            "orders" => null,
        ]
    );
}
