<?php

include("../connection.php");
$c_name = patchData("c_name");
$id = patchData("id");

$stmt = $conn->prepare(
    "UPDATE `categories` SET `category` =? WHERE `id` =?"
);

$stmt->execute(
    [
        $c_name,
        $id
    ]
);
$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Category updated successfully"
        ]
    );
} else {
    http_response_code(500);
    echo json_encode(
        [
            "status" => 500,
            "message" => "Category not updated"
        ]
    );
}
