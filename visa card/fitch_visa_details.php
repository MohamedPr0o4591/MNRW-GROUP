<?php
include("../connection.php");
include('../bearerAuth.php');

$stmt = $conn->prepare(
    "SELECT * FROM `visa_cards` WHERE `u_id` =?"
);

$stmt->execute([$tokedId]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "cards" => $result
        ]
    );
} else {
    http_response_code(500);
    echo json_encode(
        [
            "status" => 500,
            "cards" => [],
        ]
    );
}
