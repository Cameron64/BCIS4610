<?php
/**
 * Created by PhpStorm.
 * User: camer_000
 * Date: 10/1/14
 * Time: 10:01 AM
 */



/*function strip($inputz)
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
}*/



if ( $_SERVER['REQUEST_METHOD'] == 'POST' && strpos($_SERVER['CONTENT_TYPE'], 'application/json') === 0 ) {
    $postdata = file_get_contents('php://input');
    $_POST = json_decode($postdata, true);
    $_REQUEST = array_merge($_REQUEST, $_POST);
}


//$data['message'] = $_POST['customer'];
$data = $_POST['customer'];
var_dump($data);
$basket = array();
$basketQuantities = array();
$email = $data['email'];
$phone = $data['num'];
$company = $data['restaurant'];
$products = $data['product'];
$quantities = $data['quantities'];
$comments = $data['comments'];
$counter = 0;

var_dump($email);
//var_dump($_POST['customer']);

for($i=0; $i<= sizeof($products,0)-1; $i++){
    array_push($basket, $data['product'][$i]['id']);
}

for($i=0; $i<= sizeof($products,0)-1; $i++){
    if($data['quantities'][$i] != null)
    {$basketQuantities[$i]=$data['quantities'][$i];
    }
    else{
        array_push($basketQuantities[$i], "1");
    };
}



  $final = "";
    $final .= "Email: " . $email . "\n"
    .         "Company Name: ". $company . "\n"
        .     "Phone Number: ". $phone . "\n".
    "They ordered: \n";
    for($i=0; $i <= sizeof($products,0)-1; $i++){

        $final .= $basket[$i] . "\t" . $basketQuantities[$i] . "\n";
    }
    if($comments != null){
        $final .= "They also left a comment with their order:" . "\n" . wordwrap($comments);
    }




$mailTo = "cameron64@ymail.com";
$mailSubject = "New Order";

var_dump($final);

if($counter < 1){
    mail($mailTo,$mailSubject,$final);
    $counter++;
}

//header('Location: invoice.html');





?>