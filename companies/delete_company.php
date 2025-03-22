<?php

include("../connection.php");

$id = deleteData("id");

$stmt = $conn->prepare(
    "DELETE FROM `companies` WHERE `id` =?"
);

$stmt->execute(
    [
        $id
    ]
);

$count = $stmt->rowCount();
if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" =>  200,
            "message" => "Company deleted successfully"
        ]
    );
} else {
    http_response_code(500);
    echo json_encode(
        [
            "status" => 500,
            "message" => "Company not deleted"
        ]
    );
}
