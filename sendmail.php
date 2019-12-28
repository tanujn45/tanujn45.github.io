<?php 
    $sendEmail = "tanujn45@gmail.com";
    $name = $_POST['name'];
    $email = $POST['email'];
    $phone = $_POST['phone'];
    $mess = $_POST['message'];

    $sendMess = $name . $email . $phone . $mess;
    mail($sendEmail, "tanujnamdeo.me mail", $mess);
    echo "<script>alert('Message sent!')</script>";
    header('Location: contact.html');

?>