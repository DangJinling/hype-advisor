import smtplib
from email.mime.text import MIMEText
from email_config.models import EmailConfig


def send_mail(recv, subject, content):
    emailConfigList = EmailConfig.objects.all()
    if len(emailConfigList) > 0:
        emailConfig = emailConfigList[0]
        email_user = emailConfig.email_user
        email_pwd = emailConfig.email_pwd
        email_host = emailConfig.email_host
        email_port = emailConfig.email_port
        # email_user = 'ngo-skt@outlook.com'
        # email_pwd = 'ngo@sktlab'
        # email_host = 'smtp-mail.outlook.com'
        # email_port = 587

        msg = MIMEText(content, 'html')
        msg['Subject'] = subject  # 邮件主题
        msg['From'] = email_user  # 发送者账号
        msg['To'] = recv  # 接收者账号列表
        smtp = smtplib.SMTP(email_host, port=email_port)  # 连接邮箱，传入邮箱地址，和端口号，smtp的端口号是25
        smtp.ehlo()  # 向Gamil发送SMTP 'ehlo' 命令
        smtp.starttls()
        smtp.login(email_user, email_pwd)  # 发送者的邮箱账号，密码
        smtp.sendmail(email_user, recv, msg.as_string())
        # 参数分别是发送者，接收者，第三个是把上面的发送邮件的内容变成字符串
        smtp.quit()  # 发送完毕后退出smtp
        print('email send success.')


# email_user = 'dangjinling_1012@126.com'  # 发送者账号
# title = '测试邮件标题'
# content = '这里是邮件内容'
# send_mail('dangjinling_1012@126.com', title, content)


