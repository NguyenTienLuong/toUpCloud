from .. import db
from sqlalchemy import func


class Product(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    unit_price = db.Column(db.Numeric(10, 2), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id', ondelete='SET NULL'), nullable=True)

    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.Date, nullable=True)

    def __init__(self, name, description=None, image_url=None, unit_price=None, category_id=None, updated_at=None):
        self.name = name
        self.description = description
        self.image_url = image_url
        self.unit_price = unit_price
        self.category_id = category_id
        self.updated_at = updated_at