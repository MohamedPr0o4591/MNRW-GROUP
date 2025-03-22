<?php
include("../connection.php");

$c_id = deleteData("id");

$stmt = $conn->prepare(
    "DELETE FROM `categories` WHERE `id` =?"
);

$stmt->execute([$c_id,]);

$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Category deleted successfully"
        ]
    );
} else {
    http_response_code(500);
    echo json_encode(
        [
            "status" => 500,
            "message" => "Category not deleted"
        ]
    );
}
