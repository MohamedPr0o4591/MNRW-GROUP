<?php
include('../connection.php');

$u_email = filterReq("u_email");

$stmt = $conn->prepare(
    "SELECT `email` FROM `users` WHERE `email` = ?"
);

$stmt->execute([$u_email]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    http_response_code(200);
    echo json_encode(
        [
            "message" => "Email already exists",
            "email" => $result["email"],
        ]
    );
} else {
    http_response_code(500);
    echo json_encode(array("error" => "Email not found"));
}
