# nginx-configure-file-for-multiple-host-names
![Screenshot](Write%20the%20Nginx%20configure%20file%20for%20Multiple%20Host%20Names%20for%20three%20servers%20on%C2%A0AWS.jpg)

Demo

![Screenshot](Write%20the%20Nginx%20configure%20file%20for%20Multiple%20Host%20Names%20for%20three%20servers%20on%C2%A0AWS.gif)

```
events {
    # empty placeholder
}

http {

    server {
        listen 80;
        server_name student.bjtechlife.com;

        location / {
            proxy_pass http://frontend;
        }
    }

    server {
        listen 80;
        server_name api.student.bjtechlife.com;

        location / {
            proxy_pass http://backend;
        }

    }

    upstream frontend {
        server 172.31.1.104:3000; # Server 2 private IP address
    }

    upstream backend {
        server 172.31.1.104:5000; # Server 2 private IP address
    }
}
```

## Now, test the code and reload the server.

```
# Test the nginx config file is right formate
sudo nginx -t

# Now restart the nginx server
sudo nginx -s reload
```

## Now, access the URL for the demo. URL like this
```
http://student.bjtechlife.com/
```
```
http://api.student.bjtechlife.com/
```
if you want to learn details <a href="https://medium.com/@bjnandi/write-the-nginx-configure-file-for-multiple-host-names-for-three-servers-on-aws-8ed1550fc6cb">click here</a>