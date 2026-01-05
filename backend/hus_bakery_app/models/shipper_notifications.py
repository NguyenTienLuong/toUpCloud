from datetime import datetime
from .. import db


class ShipperNotification(db.Model):
    __tablename__ = 'shipper_notification'  # Đổi tên bảng tại đây

    id = db.Column(db.Integer, primary_key=True)
    shipper_id = db.Column(db.Integer, db.ForeignKey('shippers.shipper_id', ondelete="CASCADE"))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', ondelete="CASCADE"))
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Quan hệ để lấy dữ liệu từ bảng Order (chứa cột note và shipping_address)
    order = db.relationship('Order', backref='shipper_notifications')