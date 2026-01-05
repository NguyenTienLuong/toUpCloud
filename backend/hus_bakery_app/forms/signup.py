from wtforms import Form, StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from ..models.customer import Customer

class SignupForm(Form):
    name = StringField('Username', validators=[
        DataRequired(message='Vui lòng nhập tên đăng nhập'),
        Length(max=50, message='Tên đăng nhập tối đa 50 ký tự')
    ])

    email = StringField('Email', validators=[
        DataRequired(message='Vui lòng nhập email'),
        Email(message='Email không hợp lệ')
    ])

    phone = StringField('Phone', validators=[
        DataRequired(message='Vui lòng nhập số điện thoại'),
        Length(min=10, max=10, message='Số điện thoại phải có đúng 10 số')
    ])

    password = PasswordField('Password', validators=[
        DataRequired(message='Vui lòng nhập mật khẩu'),
        Length(min=6, message='Mật khẩu phải có ít nhất 6 ký tự'),
        EqualTo('confirm', message='Mật khẩu không khớp')
    ])

    confirm = PasswordField('Repeat Password', validators=[
        DataRequired(message='Vui lòng xác nhận mật khẩu')
    ])


    def validate_email(self, email):
        if Customer.query.filter_by(email=email.data).first():
            raise ValidationError('Email đã được sử dụng')
