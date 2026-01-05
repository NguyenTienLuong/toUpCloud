from .. import db

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', ondelete="CASCADE"))
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id', ondelete="SET NULL"))

    quantity = db.Column(db.Integer)
    price = db.Column(db.Numeric(10,2))
