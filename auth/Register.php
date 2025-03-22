<?php

include('../connection.php');

$token = bin2hex(random_bytes(16));
$u_name = filterReq("u_name");
$pass = password_hash(filterReq("pass"), PASSWORD_DEFAULT);
$email = filterReq("email");
$currentDate = date("Y-m-d H:i:s");

$stmt = $conn->prepare(
    "SELECT * FROM `users` WHERE `username` = ? OR `email` = ?"
);

$stmt->execute(
    [
        $u_name,
        $email
    ]
);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$result) {

    $stmt = $conn->prepare(
        "INSERT INTO `users` (`id` , `username` , `password` , `email` , `created_at` ,`status`) 
            VALUES (?,? ,?, ?, ? , ?)"
    );

    $stmt->execute(
        [
            $token,
            $u_name,
            $pass,
            $email,
            $currentDate,
            "active"
        ]
    );

    $count = $stmt->rowCount();

    if ($count > 0) {
        $stmt = $conn->prepare(
            "INSERT INTO `profile_info` (`u_id`) VALUES (:token) ;
                INSERT INTO `visa_cards` (`u_id`) VALUES (:token) ;"
        );
        $stmt->execute([
            "token" => $token
        ]);

        http_response_code(200);

        echo json_encode(
            [
                "message" => "Success",
                "user" =>  [
                    "token" => $token,
                    "username" => $u_name,
                    "email" => $email,
                    "status" => "active"
                ]

            ]
        );
    } else {
        http_response_code(400);
        echo json_encode(
            [
                "message" => "Something went wrong",
            ]
        );
    }
} else {
    http_response_code(400);
    echo json_encode(
        [
            "message" => "User already exists",
        ]
    );
}
