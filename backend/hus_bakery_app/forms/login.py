from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired,Email

class LoginForm(FlaskForm):
    class Meta:
        csrf = False

    email = StringField('Email', validators=[
        DataRequired(message='Vui lòng nhập email'),
        Email(message='Email không hợp lệ')
    ])

    password = PasswordField('Password', validators=[
        DataRequired(message='Vui lòng nhập mật khẩu')
    ])

    submit = SubmitField('Login')