<?php

include("../connection.php");

$name = isset($_POST["name"]) ? filterReq("name") : null;
$price = isset($_POST["price"]) ? filterReq("price") : null;
$desc = isset($_POST["desc"]) ? filterReq("desc") : null;
$company_id = isset($_POST["company_id"]) ? filterReq("company_id") : null;
$img = isset($_FILES["img"]) ? uploadFile("img") : null;
$id = filterReq("id");

$fields = [];
$params = [];

if (isset($name)) {
    $fields[] = "`name` =?";
    $params[] = $name;
}

if (isset($price)) {
    $fields[] = "`price` =?";
    $params[] = $price;
}

if (isset($desc)) {
    $fields[] = "`desc` = ?";
    $params[] = $desc;
}

if (isset($company_id)) {
    $fields[] = "`company_id` = ?";
    $params[] = $company_id;
}

if (isset($img)) {
    $stmt = $conn->prepare(
        "SELECT `img` 
        FROM `products`
         WHERE `id` =?"
    );
    $stmt->execute(
        [
            $id,
        ]
    );

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result) {
        deleteFile($result["img"], "../upload");
    }

    $fields[] = "`img` = ?";
    $params[] = $img;
}

if (!empty($fields)) {
    $stmt = $conn->prepare(
        "UPDATE `products` SET " . implode(", ", $fields) . " WHERE `id` = ?"
    );

    $params[] = $id;
    $stmt->execute($params);

    $count = $stmt->rowCount();
    if ($count > 0) {
        http_response_code(200);
        echo json_encode(
            [
                "status" => 200,
                "message" => "Product updated successfully"
            ]
        );
    } else {
        http_response_code(400);
        echo json_encode(
            [
                "status" => 400,
                "message" => "Product not updated"
            ]
        );
    }
}
