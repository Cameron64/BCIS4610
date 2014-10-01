<?php
/**
 * Created by PhpStorm.
 * User: camer_000
 * Date: 10/1/14
 * Time: 10:01 AM
 */

$errors = [];




//$data['message'] = $_POST['customer'];
$data = json_decode($_POST['customer']);
$basket = array();
$basketQuantities = array();
$email = $data->email;
$phone = $data->num;
$company = $data->restaurant;
$products = $data->product;
$quantities = $data->quantities;
$comments = $data->comments;


for($i=0; $i<= sizeof($products,0)-1; $i++){
    array_push($basket, $data->product[$i]->id);
}

for($i=0; $i<= sizeof($products,0)-1; $i++){
    if($data->quantities[$i] != null)
    {array_push($basketQuantities, $data->quantities[$i]);
    }
    else{
        array_push($basketQuantities, "1");
    };
}

var_dump($email);
var_dump($phone);
var_dump($company);
var_dump($comments);




?>