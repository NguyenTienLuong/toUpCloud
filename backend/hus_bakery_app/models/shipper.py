from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class Shipper(db.Model):
    __tablename__ = 'shippers'

    shipper_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(150))
    status = db.Column(db.String(50))
    salary = db.Column(db.Numeric(10,2))
    branch_id = db.Column(db.Integer, db.ForeignKey('branches.branch_id', ondelete='SET NULL'))
    password = db.Column(db.String(200))

    def __init__(self, shipper_id,name, phone, email, salary, branch_id):
        self.shipper_id= shipper_id
        self.name = name
        self.phone = phone
        self.email = email
        self.salary = salary
        self.branch_id = branch_id
        self.status = 'active'

    def set_password(self, password):
        self.password= generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_id(self):
        return self.shipper_id