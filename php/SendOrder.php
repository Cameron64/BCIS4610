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




$headers = "From: " . "cameron64@ymail.com" . "\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";




  $final = "<html><body>";
    $final .= '<table rules="all" style="border-color: black;" cellpadding="10">';
  $final .= "<tr style='background: #eee;'><td><strong>Email:</strong> </td><td>" . strip_tags($email) . "</td></tr>"
    .         "<tr style='background: #eee;'><td><strong>Company Name:</strong> </td><td>" . strip_tags($company) . "</td></tr>"
        .     "<tr style='background: #eee;'><td><strong>Phone Number:</strong> </td><td>" . strip_tags($phone) . "</td></tr>";
$final .= "<tr style='background: #eee;'><td><strong>Quantity</strong></td>";
$final .= "<td style='background: #eee;'><strong>Product</strong></td></tr>";

    for($i=0; $i <= sizeof($products,0)-1; $i++){

        $final .= "<tr><td style='border-right; border-color:black;background: #F7F7F7;' >" . strip_tags($basketQuantities[$i]) . "</td><td style='background: #F7F7F7;' >" . strip_tags($basket[$i]) . "</td></tr>";
    }
//$final.= "</tr>";
    if($comments != null){
        $final .= "<tr style='background: #eee;'><td><strong>Comment:</strong>" . "</td><td>" . wordwrap($comments,70, "<br />\n") . "</td></tr>";
    }
$final .= "</table>";
  $final .="</body></html>";


//customer email
$customerFinal = "";
$customerFinal = "Dear Customer,\n\nThank you for your order. We hope to do business with you again soon.
\nYour order:\n";

for($i=0; $i <= sizeof($products,0)-1; $i++){

    $customerFinal .= $basket[$i] . "\t" . $basketQuantities[$i] . "\n";
}



$mailTo = "cameron64@ymail.com";
$mailSubject = "New Order";



mail($mailTo,$mailSubject,$final,$headers);









?>