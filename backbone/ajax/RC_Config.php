<?php
ini_set("date.timezone", "America/Denver");
class RC_Config {
    public $host;
    public $db;
    public $user;
    public $password;
    
    public function __construct() {
        $this->host = "localhost";
        $this->db = "dlists";
        $this->user = "root";
        $this->password = "password";
    }
}
?>
