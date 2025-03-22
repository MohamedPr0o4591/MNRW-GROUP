<?php

$headers = apache_request_headers();

if (isset($headers["Authorization"])) {
    $authHeader = $headers["Authorization"];

    if (preg_match("/Bearer\s(\S+)/", $authHeader, $matches)) {
        $tokedId = $matches[1];
    } else {
        http_response_code(400);
        echo json_encode(
            [
                "message" => "Authorization header format is incorrect",
            ]
        );
        exit();
    }
} else {
    http_response_code(401);
    echo json_encode(
        [
            "message" => "Unauthorized",
        ]
    );
    exit();
}
