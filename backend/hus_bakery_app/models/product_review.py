from .. import db
from datetime import datetime


class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    order_item_id = db.Column(db.Integer, db.ForeignKey('order_items.order_item_id', ondelete="CASCADE"),
                              primary_key=True)

    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id', ondelete="CASCADE"))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete="CASCADE"))

    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)