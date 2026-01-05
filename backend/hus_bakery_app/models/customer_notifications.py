from datetime import datetime
from .. import db

class CustomerNotification(db.Model):
    __tablename__ = 'customer_notification'

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete="CASCADE"))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', ondelete="CASCADE"))
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    order = db.relationship('Order', backref='customer_notifications')