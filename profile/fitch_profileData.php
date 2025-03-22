<?php

include('../connection.php');

$u_id =  fitchData("u_id");

$stmt = $conn->prepare(
    "SELECT * FROM 
    `profile_info` 
    WHERE `u_id` = ?"
);

$stmt->execute([$u_id]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(
    [
        "status" => 200,
        "user" => $result
    ]
);
