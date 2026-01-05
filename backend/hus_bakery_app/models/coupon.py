from .. import db

class Coupon(db.Model):
    __tablename__ = 'coupons'

    coupon_id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text)
    discount_percent = db.Column(db.Integer)
    discount_value = db.Column(db.Numeric(10,2))
    discount_type = db.Column(db.String(20))
    min_purchase = db.Column(db.Numeric(10,2))
    max_discount = db.Column(db.Numeric(10,2))
    begin_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    rank = db.Column(db.String(20))

    def get_discount_percent(self):
        return self.discount_percent

    def get_min_purchase(self):
        return self.min_purchase

    def get_max_discount(self):
        return self.max_discount


