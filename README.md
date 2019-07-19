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

