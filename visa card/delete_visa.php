<?php
include('../connection.php');

$tokenId = filterReq('u_id');
$date = date("Y-m-d H:i:s");

$stmt = $conn->prepare(
    "SELECT * FROM `visa_cards` WHERE `u_id` =?"
);
$stmt->execute([$tokenId]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    $stmt = $conn->prepare(
        "UPDATE  `visa_cards` SET `c_number` = NULL , `ex_month` = NULL , `ex_year` = NULL , `cvv` = NULL , `c_holder` = NULL WHERE `u_id` = ?"
    );

    $stmt->execute([$tokenId]);
    $count = $stmt->rowCount();

    if ($count > 0) {
        $stmt = $conn->prepare(
            "INSERT INTO `visa_cards` (`u_id` , `c_number` , `ex_month` , `ex_year` , `cvv` , `c_holder` , `created_at`)
                VALUES (? , NULL , NULL , NULL , NULL , NULL , ?)"
        );
        $stmt->execute(
            [
                $tokenId,
                $date
            ]
        );

        $count = $stmt->rowCount();
        if ($count > 0) {
            http_response_code(200);
            echo json_encode(
                [
                    "status" => 200,
                    "message" => "Visa card deleted successfully"
                ]
            );
        } else {
            http_response_code(500);
            echo json_encode(
                [
                    "status" => 500,
                    "message" => "Visa card not deleted"
                ]
            );
        }
    }
} else {
    http_response_code(500);
    echo json_encode(
        [
            "status" => 500,
            "message" => "Visa card not found"
        ]
    );
}
