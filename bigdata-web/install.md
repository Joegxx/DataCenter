# bigdata-web

### nginx��װ
* ������
yum -y install zlib zlib-devel openssl openssl--devel pcre pcre-devel
* ���ؽ�ѹ
wget http://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxvf nginx-1.14.0.tar.gz
* ���밲װ
./configure --prefix=/opt/app/home/nginx/usr/local/nginx
make && make install
* ����
sbin/nginx

* �����ļ�nginx.conf
```
worker_processes  1;




events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen       8100;
        server_name  localhost;

        location / {
            root   webapp;
            index  index_prod.html;
	    try_files $uri $uri/ /index_prod.html =404;
        }

		location ^~ /whtc/ {
            proxy_pass   http://10.100.16.75:8181;
        }
		location ^~ /noauth/msg/ {
                        proxy_connect_timeout 13s;
                        proxy_send_timeout 13s;
                        proxy_read_timeout 13s;
            proxy_pass   http://10.100.16.43:8597;
        }
		location ^~ /cbr/ {
                        proxy_connect_timeout 13s;
                        proxy_send_timeout 13s;
                        proxy_read_timeout 13s;
            proxy_pass   http://localhost:12321;
        }

		location ^~ /msg/ {
                        proxy_connect_timeout 13s;
                        proxy_send_timeout 13s;
                        proxy_read_timeout 13s;
            proxy_pass   http://10.100.16.43:8597;
        }


        location ^~ /sys/ {
            proxy_pass   http://10.100.16.20:8084;
        }
		location ^~ /open/cbr/ {
                        proxy_connect_timeout 13s;
                        proxy_send_timeout 13s;
                        proxy_read_timeout 13s;
            proxy_pass   http://10.100.16.43:18086;
        }
		location ^~ /dist/appraiser/ {
                        proxy_connect_timeout 13s;
                        proxy_send_timeout 13s;
                        proxy_read_timeout 13s;
            proxy_pass   http://10.100.16.43:8377/appraiser/;
        }

		location ^~ /dbms {
                        proxy_connect_timeout 30s;
                        proxy_send_timeout 30s;
                        proxy_read_timeout 600s;
            proxy_pass   http://10.100.16.83:19999/dbms/;
        }

		location ^~ /sys/config/ {
			proxy_connect_timeout 3s;
			proxy_send_timeout 3s;
			proxy_read_timeout 3s;
				proxy_pass   http://10.100.16.20:8084;
		}

        location ^~ /deploy {
                        proxy_connect_timeout 30s;
                        proxy_send_timeout 30s;
                        proxy_read_timeout 600s;
            proxy_pass   http://10.100.16.20:18012/deploy;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```

### bigdata-web��װ
��nodejs�汾 6.0.0������
npm install
npm run build

�½��ļ��� mkdir webapp
��dist,index_prod.html,realreport�ƶ���webappĿ¼��
��webapp �ƶ���nginxĿ¼�£�/opt/app/home/nginx/usr/local/nginx��
���� http://ip:8100/web/cbr  ����