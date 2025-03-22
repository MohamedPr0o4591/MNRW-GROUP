<?php

include('../connection.php');

$stmt = $conn->prepare(
    "SELECT * FROM `categories`"
);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($result) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "categories" => $result
        ]
    );
} else {
    http_response_code(404);
    echo json_encode(
        [
            "status" => 404,
            "categories" => []
        ]
    );
}
