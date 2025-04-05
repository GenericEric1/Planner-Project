In order for this site to work, node.js and npm should be installed

SETTING UP PROJECT AND STARTING:

Based on TCSS445 GCP Tutorial, create a VM instance.
    In GCP, create a new project and call it tcss445-au24-mixviewplanner
    Launch a new Bitnami package for LAMP VM instance.
    Name the VM instance: tcss445-lamp and deploy it
    Keep track of the IP Adresss and admin password, this will be used to log into PHPMyAdmin and to create the .env file.
    In the SSH terminal, enter the command: sudo nano /opt/bitnami/apache/conf/bitnami/phpmyadmin.conf
    Update line 5 to read "Require all granted" and save
    Reboot VM with command in SSH: sudo reboot

Based on TCSS445 Assingment 3, add SQL file to PHPMyAdmin.
    Visit PHPMyAdmin by using the IP Address of the VM instance: <IPAddress>/phpMyAdmin
    Go into Add user and add this new user:
        Username: tcss445-user
        Host Name: %
        Password: mypassword
        Global Priviledges: Check all
    Press import and import in the sql database: Planner

Based on TCSS445 Assignment 4, confgiure mysql for remote access
    In GCP menu, go to VPC Network -> Firewall
    Create new firewall rule called: mysql-access
        Targets: All instance in Network
        Source IP range: 0.0.0.0/0
        Protocols & ports: Specified protocols and ports
            TCP: 3306
    
    In GCP SSH, enter the command: sudo nano /opt/bitnami/mariadb/conf/my.cnf
    Locate the line bind_address and replace existing value with 0.0.0.0
    In the mysqld section, add the line: lower_case_table_names=1
    Save and exit file
    Restart mysql with sudo /opt/bitnami/ctlscript.sh restart mariadb

In the code file, add the following files: 
.env

In the .env file, copy the following code: 

DB_HOST=<IP ADDRESS FROM VM>
DB_USER=tcss445-user
DB_PASSWORD=mypassword
DB_NAME=planner
DB_PORT=3306

Install dependencies using command in SSH: npm install express dotenv mysql2 nodemon
Start application in terminal using: npm start
Look in terminal and click on the link after "Server running on http://..."