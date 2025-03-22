<?php

// POST
function filterReq($req)
{
    return htmlspecialchars(strip_tags($_POST[$req]));
}

// GET
function fitchData($req)
{
    return htmlspecialchars(strip_tags($_GET[$req]));
}

// DELETE
function deleteData($req)
{
    return htmlspecialchars(strip_tags($_REQUEST[$req]));
}


// PATCH
function patchData($req)
{
    parse_str(file_get_contents("php://input"), $patchData);

    if (isset($patchData[$req])) {
        return htmlspecialchars(strip_tags($patchData[$req]));
    }
}

define("MB", 1024 * 1024);

// FILES
function uploadFile($req)
{
    global $msgErr;
    // imgPhone.jpg

    $name = $_FILES[$req]["name"];
    $tmp = $_FILES[$req]["tmp_name"];
    $size = $_FILES[$req]["size"];

    $allowedExt = [
        "jpg",
        "png",
        "jpeg",
        "webp",
    ];

    $ranName = rand(1000, 10000) . $name;

    $strToArr = explode(".", $name);
    $ext = end($strToArr);

    $ext = strtolower($ext);

    if (!empty($req) && !in_array($ext, $allowedExt)) {
        $msgErr = "File is not allowed";
    }

    if ($size > 8 * MB) {
        $msgErr = 'File is too large';
    }

    if (empty($msgErr)) {
        move_uploaded_file($tmp, "../upload/" . $ranName);

        return $ranName;
    } else return $msgErr;
}

// DELETE FILE
function deleteFile($file, $dir)
{
    if (file_exists($dir . "/" . $file)) {
        unlink($dir . '/' . $file);
    }
}
