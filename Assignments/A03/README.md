## Assignment 3 - Create your own server
### Ethan Bailey
### Description:

This assignment was create your own server and configure it appropriately.
We used Digital Ocean to create a cloud based server (or droplet), and installed 
Windows Subsytem for Linux (WSL) to SSH onto the server with root access.
The server is running Ubuntu Server LTS, which is a Debian-based operating system.
We assigned privileges and created activated the UFW Firewall, installed some package management,
python, apache and other necessary software on the server.
Finally, we loaded up an API using python's fastapi that can be accessed using our servers Ip address.

The following image shows the authorized keys that were added.

<img src="https://github.com/EthanJBailey/4443-MobileApps/blob/main/Assignments/A03/images/a03-keys.png" width="800">

The following image shows the UFW firewall activated.

<img src="https://raw.githubusercontent.com/EthanJBailey/4443-MobileApps/main/Assignments/A03/images/a03-ufw.png" width="800">

The following image shows my API up and running with the ufw firewall activated.

<img src="https://github.com/EthanJBailey/4443-MobileApps/blob/main/Assignments/A03/images/a03-api.png" width="800">

