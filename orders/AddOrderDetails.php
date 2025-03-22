<?php

include("../connection.php");

$quantity = filterReq("quantity");
$name = filterReq("name");
$img = filterReq("img");
$desc = filterReq("desc");
$price = filterReq("price");

$stmt = $conn->prepare(
    "SELECT `id` FROM `orders` ORDER BY `id` DESC LIMIT 1"
);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {

    $o_id = $result["id"];

    $stmt = $conn->prepare(
        "INSERT INTO `order_details` (`o_id` , `quantity` , `name` , `img` , `desc` , `price`)
            VALUES ( ?,?,? ,?,?,?) "
    );
    $stmt->execute(
        [
            $o_id,
            $quantity,
            $name,
            $img,
            $desc,
            $price,
        ]
    );

    $count = $stmt->rowCount();

    if ($count > 0) {
        http_response_code(200);
        echo json_encode(
            [
                "status" => 200,
                "message" => "Order details added successfully"
            ]
        );
    } else {
        http_response_code(400);
        echo json_encode(
            [
                "status" => 400,
                "message" => "Order details not added"
            ]
        );
    }
}
