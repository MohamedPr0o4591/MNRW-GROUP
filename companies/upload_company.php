<?php
include("../connection.php");

$c_name = filterReq("c_name");
$category_id = filterReq("category_id");

$stmt = $conn->prepare(
    "INSERT INTO `companies` (`company` , `c_id`)
        VALUES (? ,?)"
);

$stmt->execute(
    [
        $c_name,
        $category_id
    ]
);

$count = $stmt->rowCount();

if ($count > 0) {
    http_response_code(200);
    echo json_encode(
        [
            "message" => "Company uploaded successfully",
        ]
    );
} else {
    http_response_code(404);
    echo json_encode(
        [
            "message" => "Company not uploaded",
        ]
    );
}
