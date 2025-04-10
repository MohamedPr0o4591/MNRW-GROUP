<?php
include("../connection.php");

$c_number = filterReq("c_number");
$ex_month = filterReq("ex_month");
$ex_year = filterReq("ex_year");
$cvv = filterReq("cvv");
$c_holder = filterReq("c_holder");
$created_at = date("Y-m-d H:i:s");
$u_id = filterReq("u_id");

$stmt = $conn->prepare(
    "UPDATE `visa_cards` SET `c_number` =?, `ex_month` =?, `ex_year` =?, `cvv` =?, `c_holder` =?, `created_at` =? 
    WHERE `u_id` =?"
);
$stmt->execute(
    [
        $c_number,
        $ex_month,
        $ex_year,
        $cvv,
        $c_holder,
        $created_at,
        $u_id
    ]
);

$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Visa card uploaded successfully"
        ]
    );
} else {
    http_response_code(400);
    echo json_encode(
        [
            "status" => 400,
            "message" => "Visa card not uploaded"
        ]
    );
}
