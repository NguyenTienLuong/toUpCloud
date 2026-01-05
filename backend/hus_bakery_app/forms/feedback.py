from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, NumberRange, Length

class FeedbackForm(FlaskForm):
    # Frontend bắt buộc phải gửi order_id để biết đang đánh giá đơn nào
    order_id = IntegerField('Order ID', validators=[DataRequired()])

    # Điểm đánh giá bắt buộc từ 1 đến 5
    rating = IntegerField('Rating', validators=[
        DataRequired(),
        NumberRange(min=1, max=5, message="Vui lòng đánh giá từ 1 đến 5 sao")
    ])

    # Bình luận tùy chọn, tối đa 500 ký tự
    comment = TextAreaField('Comment', validators=[
        Length(max=500, message="Bình luận không quá 500 ký tự")
    ])