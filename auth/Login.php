<?php

include("../connection.php");

$u_name = isset($_POST["u_name"]) ? filterReq("u_name") : "";
$u_email = isset($_POST['u_email']) ? filterReq("u_email") : "";
$u_pass = filterReq("u_pass");

$fields = [];
$params = [];

if (!empty($u_name)) {
    $fields[] = "`username` =?";
    $params[] = $u_name;
}

if (!empty($u_email)) {
    $fields[] = "`email` =?";
    $params[] = $u_email;
}

if (!empty($fields)) {
    $query = "SELECT * FROM `users` WHERE " . implode(", ", $fields);
    $stmt = $conn->prepare($query);

    $stmt->execute(
        $params
    );

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && password_verify($u_pass, $result['password'])) {
        http_response_code(200);
        echo json_encode(
            [
                "message" => "Login successfully",
                "user" => $result
            ]
        );
    } else {
        http_response_code(400);
        echo json_encode(
            [
                "message" => "Invalid username or password",
            ]
        );
    }
} else {
    http_response_code(400);
    echo json_encode(
        [
            "message" => 'Please enter username or email and password',
        ]
    );
}
