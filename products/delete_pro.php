<?php
include("../connection.php");

$id = deleteData("id");

$stmt = $conn->prepare(
    "SELECT * FROM `products` WHERE `id` = ?"
);

$stmt->execute([$id]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    deleteFile($result["img"], "../upload");

    $stmt = $conn->prepare(
        "DELETE FROM `products` WHERE `id` =?"
    );
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

    if ($count > 0) {
        http_response_code(200);
        echo json_encode(
            [
                "status" => 200,
                "message" => "Product deleted successfully"
            ]
        );
    } else {
        http_response_code(400);
        echo json_encode(
            [
                "status" => 400,
                "message" => "Product not deleted"
            ]
        );
    }
}
