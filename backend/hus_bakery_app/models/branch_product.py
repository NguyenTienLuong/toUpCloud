from .. import db

class BranchProduct(db.Model):
    __tablename__ = 'branch_products'

    branch_id = db.Column(db.Integer, db.ForeignKey('branches.branch_id', ondelete="CASCADE"), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id', ondelete="CASCADE"), primary_key=True)

    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
