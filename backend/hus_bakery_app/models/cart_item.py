from .. import db

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    selected = db.Column(db.Boolean, default=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete="CASCADE"), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id', ondelete="CASCADE"), primary_key=True)
    quantity = db.Column(db.Integer)

    def __init__(self, customer_id, product_id, quantity):
        self.customer_id = customer_id
        self.product_id = product_id
        self.quantity = quantity

