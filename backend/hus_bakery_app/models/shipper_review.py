from .. import db
from datetime import datetime


class ShipperReview(db.Model):
    __tablename__ = 'shipper_reviews'

    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', ondelete="CASCADE"), primary_key=True)

    shipper_id = db.Column(db.Integer, db.ForeignKey('shippers.shipper_id', ondelete="CASCADE"))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete="CASCADE"))

    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)