<?php

include("../connection.php");

$name = filterReq("name");
$price = filterReq("price");
$desc = filterReq("desc");
$img = uploadFile("img");
$company_id = filterReq("company_id");

$ram = filterReq("ram");
$hard = filterReq(("hard"));
$processor = filterReq("processor");
$screen = filterReq("screen");
$camera = filterReq("camera");
$battery = filterReq("battery");
$system_info = filterReq("system_info");
$good_de = filterReq(("good_de"));
$bad_de = filterReq(("bad_de"));


$stmt = $conn->prepare(
    "INSERT INTO `products` (`name` , `price` , `img` ,`desc` , `company_id`) 
        VALUES (?,?,?,?,?) ;
   "
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
    $last_id = $conn->lastInsertId();
    $stmt = $conn->prepare(
        " INSERT INTO `info_product` (`ram`, `hard`, `procss`, `display`, `camireaa`, `battry`, `system_info`
    ,`good_de`, `bad_de` , `product_id`)
        VALUES (?,?,?,?,?,?,?,?,?,?)"
    );
    $stmt->execute(
        [
            $ram,
            $hard,
            $processor,
            $screen,
            $camera,
            $battery,
            $system_info,
            $good_de,
            $bad_de,
            $last_id
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
}
