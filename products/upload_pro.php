<?php

include("../connection.php");

$name = filterReq("name");
$price = filterReq("price");
$desc = filterReq("desc");
$img = uploadFile("img");
$company_id = filterReq("company_id");

$stmt = $conn->prepare(
    "INSERT INTO `products` (`name` , `price` , `img` ,`desc` , `company_id`) 
        VALUES (?,?,?,?,?)"
);
$stmt->execute(
    [
        $name,
        $price,
        $img,
        $desc,
        $company_id
    ]
);
$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Product uploaded successfully"
        ]
    );
} else {
    http_response_code(400);
    echo json_encode(
        [
            "status" => 400,
            "message" => "Product upload failed"
        ]
    );
}
