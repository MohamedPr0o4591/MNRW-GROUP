<?php
include("../connection.php");

$status = "pending";
$date = date("Y-m-d H:i:s");
$u_id = filterReq("u_id");
$t_price = filterReq("t_price");

$stmt = $conn->prepare(
    "INSERT INTO `orders` (`u_id` , `date` , `total_price` , `status`)
        VALUES (?,?,?,?)"
);
$stmt->execute(
    [
        $u_id,
        $date,
        $t_price,
        $status
    ]
);
$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Order created successfully"
        ]
    );
} else {
    http_response_code(400);
    echo json_encode(
        [
            "status" => 400,
            "message" => "Order not created"
        ]
    );
}
