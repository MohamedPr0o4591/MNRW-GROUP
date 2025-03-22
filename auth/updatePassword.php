<?php
include("../connection.php");

$u_email = patchData("u_email");
$u_pass = password_hash(patchData("u_pass"), PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "UPDATE `users` SET `password` =? WHERE `email` =?"
);

$stmt->execute([
    $u_pass,
    $u_email
]);

$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "message" => "Password updated successfully",
        ]
    );
} else {
    http_response_code(400);
    echo json_encode(
        [
            "message" => "Password not updated",
        ]
    );
}
