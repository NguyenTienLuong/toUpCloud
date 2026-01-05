from hus_bakery_app import db
from datetime import datetime


class OrderStatus(db.Model):
    __tablename__ = 'order_status'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # Khóa ngoại trỏ đến order_id của bảng orders
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', ondelete="CASCADE"), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Định nghĩa relationship tại đây sẽ tự động tạo 'status_history' trong class Order
    order = db.relationship('Order', backref=db.backref('status_history', lazy=True, cascade="all, delete-orphan"))