<?php
include("../connection.php");

$f_name = isset($_POST["f_name"]) ? filterReq("f_name") : null;
$l_name = isset($_POST["l_name"]) ? filterReq("l_name") : null;
$gender = isset($_POST["gender"]) ? filterReq("gender") : null;
$b_day = isset($_POST["b_day"]) ? filterReq("b_day") : null;
$img_profile = isset($_FILES["img_p"])  ? uploadFile("img_p") : null;
$u_id = filterReq("u_id");

$fields = [];
$params = [];

if (isset($f_name) && isset($l_name)) {
    $fields[] = "`f_name` =? , `l_name` =?";
    $params[] = $f_name;
    $params[] = $l_name;
}

if (isset($gender)) {
    $fields[] = "`gender` =?";
    $params[] = $gender;
}

if (isset($b_day)) {
    $fields[] = "`b_day`= ?";
    $params[] = $b_day;
}

if (isset($img_profile)) {

    $stmt = $conn->prepare(
        "SELECT `img_profile` FROM `profile_info` WHERE `u_id` =?"
    );
    $stmt->execute([$u_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        deleteFile($result["img_profile"], "../upload");
    }

    $fields[] = "`img_profile` =?";
    $params[] = $img_profile;
}

if (isset($fields)) {
    $query = "UPDATE `profile_info` SET " . implode(", ", $fields) . " WHERE `u_id`=?";
    $params[] = $u_id;

    $stmt = $conn->prepare($query);
    $stmt->execute(
        $params
    );

    $result = $stmt->rowCount();

    if ($result > 0) {
        http_response_code(200);
        echo json_encode(
            [
                "status" => 200,
                "message" => "Profile updated successfully",
            ]
        );
    } else {
        http_response_code(404);
        echo json_encode(
            [
                "status" => 404,
                "message" => "Profile not updated",
            ]
        );
    }
}
