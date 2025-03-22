<?php
include("../connection.php");

$c_name = filterReq("c_name");

$stmt = $conn->prepare(
    "INSERT INTO `categories` (`category`)
        VALUES (?)"
);

$stmt->execute([$c_name]);
$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "message" => "Category uploaded successfully",
        ]
    );
} else {
    http_response_code(404);
    echo json_encode(
        [
            "message" => "Category not uploaded",
        ]
    );
}
