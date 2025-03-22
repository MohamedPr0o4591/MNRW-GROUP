<?php
include("../connection.php");
include("../bearerAuth.php");

$stmt = $conn->prepare(
    "SELECT * FROM `users` WHERE `id` = ?"
);

$stmt->execute([$tokedId]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    http_response_code(200);
    echo json_encode(
        [
            "message" => "Authorized",
            "user" => $result
        ]
    );
} else {
    http_response_code(404);
    echo json_encode(
        [
            "message" => "Unauthorized",
            "user" => null
        ]
    );
}
