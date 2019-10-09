# hype-advisor

hype-advisor/client对应 前台代码， /service 对应后台代码

1. 打开终端， cd service，安装依赖
pip3 install django-cors-headers
pip3 install djangorestframework
pip3 install django-rest-knox

2. 生出数据库表
python3 manage.py makemigrations
python3 manage.py migrate

3. python3 manage.py runserver 启动后台服务


4. 重新打开一终端， cd client，安装前台依赖 ： npm install

5. 输入 npm start 启动前台服务

6. 链接mysql数据库，在service/settings.py 中添加mysql的配置
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'hypedb',
            'USER': 'root',
            'PASSWORD': '123456',
            'HOST': '127.0.0.1',
            'PORT': '3306',
        }
    }

7. 邮件配置，在service/settings.py 中添加邮箱配置
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_USE_TLS = True
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    DEFAULT_FROM_EMAIL = 'dev.ngorganize@gmail.com'
    EMAIL_HOST_USER = 'dev.ngorganize@gmail.com'
    EMAIL_HOST_PASSWORD = 'NgoDev201('

