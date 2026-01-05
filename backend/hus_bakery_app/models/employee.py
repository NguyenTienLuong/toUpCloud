from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class Employee(db.Model):
    __tablename__ = 'employees'

    employee_id = db.Column(db.Integer, primary_key=True)
    employee_name = db.Column(db.String(200))
    role_name = db.Column(db.String(100))
    email = db.Column(db.String(150))
    password = db.Column(db.String(200))
    salary = db.Column(db.Numeric(10,2))
    status = db.Column(db.String(50))
    branch_id = db.Column(db.Integer, db.ForeignKey('branches.branch_id', ondelete='SET NULL'))

    def __init__(self, employee_id, employee_name, role_name, email, password, salary, branch_id):
        self.employee_id = employee_id
        self.employee_name = employee_name
        self.role_name = role_name
        self.email = email
        self.password = password
        self.salary = salary
        self.branch_id = branch_id

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_id(self):
        return self.employee_id