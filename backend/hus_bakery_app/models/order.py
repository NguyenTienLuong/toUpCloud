from .. import db

class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete="SET NULL"))
    branch_id = db.Column(db.Integer, db.ForeignKey('branches.branch_id', ondelete="SET NULL"))
    shipper_id = db.Column(db.Integer, db.ForeignKey('shippers.shipper_id', ondelete="SET NULL"))
    coupon_id = db.Column(db.Integer, db.ForeignKey('coupons.coupon_id', ondelete="SET NULL"))

    total_amount = db.Column(db.Numeric(10,2))
    recipient_name = db.Column(db.String(200))
    shipping_address = db.Column(db.Text)
    payment_method = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)
    # status_entry = db.relationship('OrderStatus', backref='order', uselist=False)
    phone = db.Column(db.String(20))
    note = db.Column(db.Text)