<?php
include("../connection.php");

$stmt = $conn->prepare(
    "SELECT 
        companies.* , categories.category , categories.id as c_id
                   FROM `companies` JOIN `categories` ON companies.c_id = categories.id"
);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(
    [
        "companies" => $result,
    ]
);
