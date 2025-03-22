<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$dbname = 'phone_store';
$user = 'root';
$pass = "";

try {
    $conn = new PDO("mysql:host=$host", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $conn->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql1 = "CREATE TABLE IF NOT EXISTS `users` (
       `id` varchar(100) NULL PRIMARY KEY,
       `username` varchar(100) NULL,
       `password` varchar(100) NULL ,
       `email` varchar(100) NULL ,
       `created_at` varchar(100) NULL ,
       `status` varchar(100) NULL 
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $conn->exec($sql1);

    $sql2 = "CREATE TABLE IF NOT EXISTS `categories` (
        `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
        `category` varchar(100) NOT NULL 
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $conn->exec($sql2);

    $sql3 = "CREATE TABLE IF NOT EXISTS `companies` (
        `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        `company` varchar(100) NOT NULL ,
        `c_id` int(11) NOT NULL ,
        FOREIGN KEY (`c_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE 
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $conn->exec($sql3);

    $sql4 = "CREATE TABLE IF NOT EXISTS `profile_info` (
        `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        `f_name` varchar(100) NULL ,
        `l_name` varchar(100) NULL ,
        `gender` varchar(100) NULL ,
        `b_day` varchar(100) NULL ,
        `img_profile` varchar(100) NULL ,
        `u_id` varchar(100) NOT NULL ,
        FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $conn->exec($sql4);

    $sql5 = "CREATE TABLE IF NOT EXISTS `products` (
        `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        `name` varchar(100) NULL ,
        `price` varchar(100) NULL ,
        `img` varchar(100) NULL ,
        `desc` varchar(255) NULL ,
        `company_id` int(11) NOT NULL ,
        FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $conn->exec($sql5);

    $sql6 = "CREATE TABLE IF NOT EXISTS `visa_cards` (
        `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        `c_number` varchar(100)  NULL , 
        `ex_month` varchar(100)  NULL ,
        `ex_year` varchar(100)  NULL ,
        `cvv` varchar(100)  NULL ,
        `c_holder` varchar(100) NULL ,
        `created_at` varchar(100) NULL ,
        `u_id` varchar(100) NOT NULL ,
        FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    $conn->exec($sql6);

    $sql7 = "CREATE TABLE IF NOT EXISTS `orders` (
        `id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY ,
        `u_id` varchar(100) NOT NULL ,
        `date` varchar(100) NOT NULL ,
        `total_price` int(11) NOT NULL ,
        `status` varchar(100) NULL ,
        FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ";

    $conn->exec($sql7);

    $sql8 = "CREATE TABLE IF NOT EXISTS `order_details` (
        `id` int(11) AUTO_INCREMENT NOT NULL PRIMARY KEY ,
        `o_id` int(11) NOT NULL ,
        `quantity` int(11) NOT NULL ,
        `name` varchar(100) NOT NULL ,
        `img` varchar(100) NULL ,
        `desc` varchar(100) NULL ,
        `price` int(11) NOT NULL ,
        FOREIGN KEY (`o_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE 
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ";

    $conn->exec($sql8);

    include('../actions.php');
} catch (PDOException $e) {
    echo "" . $e->getMessage();
}
