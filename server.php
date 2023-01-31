<?php

$_POST = json_decode(file_get_contents('php://input'), true);
// Команда echo позволит нам увидеть данные что приходят с клиента
echo var_dump($_POST);


