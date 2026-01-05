from .. import db

class CouponCustomer(db.Model):
    __tablename__ = 'coupons_customer'

    coupon_id = db.Column(db.Integer, db.ForeignKey('coupons.coupon_id', ondelete="CASCADE"), primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete="CASCADE"), primary_key=True)

    status = db.Column(db.String(50))
    used_at = db.Column(db.DateTime)

