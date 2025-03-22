<?php
include('../connection.php');

$name  =  patchData("name");
$c_id  =  patchData("c_id");
$id  =  patchData("id");




$stmt = $conn->prepare("
UPDATE `companies` SET `company` = ? , `c_id` = ? WHERE `id` = ?");
$stmt->execute([
    $name,
    $c_id,
    $id
]);

$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "status" => 200,
            "message" => "Company updated successfully"
        ]
    );
} else {
    http_response_code(400);
    echo json_encode(
        [
            "status" => 400,
            "message" => "Company not updated"
        ]
    );
}
