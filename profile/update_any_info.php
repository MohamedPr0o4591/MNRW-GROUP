<?php
include("../connection.php");

$tokenId = filterReq("u_id") ;
// profile info
$f_name = isset($_POST["f_name"]) ? filterReq("f_name") : null ;
$l_name = isset($_POST["l_name"]) ? filterReq("l_name") : null ;
$img_p = isset($_FILES["img_p"] )? uploadFile("img_p") : null ;
$p_fields = [] ;
$p_params = [] ;

// users
$u_name = isset($_POST["u_name"]) ? filterReq("u_name") : null ;
$email =isset( $_POST["email"] )? filterReq("email") : null ;
$pass = isset($_POST["pass"]) ? password_hash(filterReq("pass") , PASSWORD_DEFAULT) : null ;
$u_fields = [] ;
$u_params = [] ;


if (isset($f_name)) {
    $p_params[] = $f_name ;
    $p_fields[] = "`f_name` = ?" ;
}

if (isset($l_name)) {
    $p_params[] = $l_name ;
    $p_fields[] = "`l_name` = ?" ;
}

if (isset($img_p)) {
    $p_params[] = $img_p ;
    $p_fields[] = "`img_profile` = ?" ;
}

// users

if (isset($u_name)) {
    $u_params[] = $u_name ;
    $u_fields[] = "`username` = ?" ;
}

if (isset($pass)) {
    $u_params[] = $pass ;
    $u_fields[] = "`password` = ?" ;
}

if (isset($email)) {
    $u_params[] = $email ;
    $u_fields[] = "`email` = ?" ;
}

global $msgErr ;


if (!empty($p_fields)) {
    $stmt = $conn->prepare(
        "UPDATE `profile_info` SET " . implode(' ,' , $p_fields) . " WHERE `u_id` = ?" 
    ) ;
    $p_params[] = $tokenId ;

    $stmt->execute($p_params) ;

    $count = $stmt->rowCount() ;

    if ($count == 0) $msgErr = "Error ,profile info can't updated" ;

}

if (!empty($u_fields)) {
    $stmt = $conn->prepare(
        "UPDATE `users` SET " . implode(' ,' , $u_fields) . " WHERE `id` = ?" 
    ) ;
    $u_params[] = $tokenId ;

    $stmt->execute($u_params) ;

    $count = $stmt->rowCount() ;

    if ($count == 0) $msgErr = "Error ,users info can't updated" ;

}

if (empty($msgErr)) {
    http_response_code(200) ;

    echo json_encode(
        [
            "status" => 200 ,
            "message" => "Successfully ,your information has been updated"
        ]
    ) ;
}  else {
    http_response_code(500) ;

    echo json_encode(
        [
            "status" => 500 ,
            "message" => "Error ,your information can't updated"
        ]
    ) ;
}