<?php
/**
 * Created by PhpStorm.
 * User: camer_000
 * Date: 10/1/14
 * Time: 10:01 AM
 */



function strip($inputz)
{
    $inputz = str_replace("'","\'", $inputz);
    $inputz = str_replace('"','\"', $inputz);
    $inputz = str_replace("$","\$", $inputz);
    $inputz = str_replace("%","\%", $inputz);
    $inputz = str_replace("http","-h-", $inputz);
    $inputz = str_replace("/","-", $inputz);
    $inputz = str_replace("<","-", $inputz);
    $inputz = str_replace(">","-", $inputz);
    $inputz = str_replace("[","-", $inputz);
    $inputz = str_replace("]","-", $inputz);
    $inputz = str_replace("(","-", $inputz);
    $inputz = str_replace(")","-", $inputz);
    $inputz = str_replace("{","-", $inputz);
    $inputz = str_replace("}","-", $inputz);
    $inputz = str_replace(":","-", $inputz);
    $inputz = str_replace("url=","-u-", $inputz);
    $inputz = str_replace("link=","-l-", $inputz);
    return $inputz;
}






//$data['message'] = $_POST['customer'];
$data = json_decode($_POST['customer']);
$basket = array();
$basketQuantities = array();
$email = strip($data->email);
$phone = strip($data->num);
$company = strip($data->restaurant);
$products = strip($data->product);
$quantities = strip($data->quantities);
$comments = strip($data->comments);


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


$mailTo = "Cameron64@ymail.com";
$mailSubject = "New Order";
$mailMessage = "This is a test";


mail($mailTo,$mailSubject,$mailMessage);
//header('Location: invoice.html');





?>