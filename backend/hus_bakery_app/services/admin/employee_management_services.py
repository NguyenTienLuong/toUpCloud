from hus_bakery_app import db
from hus_bakery_app.models.employee import Employee
from werkzeug.security import generate_password_hash


def get_all_employees_service(branch_id=None): # Thêm tham số branch_id vào đây
    query = Employee.query
    if branch_id:
        query = query.filter(Employee.branch_id == branch_id)
    return query.all()


def add_employee_service(data):
    new_emp = Employee(
        employee_id=data.get('employee_id'),
        employee_name=data.get('employee_name'),
        role_name=data.get('role_name'),
        email=data.get('email'),
        password=generate_password_hash(data.get('password')),  # Hash mật khẩu bảo mật
        salary=data.get('salary'),
        branch_id=data.get('branch_id')
    )
    new_emp.status = data.get('status', 'active')

    db.session.add(new_emp)
    db.session.commit()
    return new_emp


def edit_employee_service(emp_id, data):
    emp = Employee.query.get(emp_id)
    if emp:
        emp.employee_name = data.get('employee_name', emp.employee_name)
        emp.role_name = data.get('role_name', emp.role_name)
        emp.email = data.get('email', emp.email)
        emp.salary = data.get('salary', emp.salary)
        emp.status = data.get('status', emp.status)
        emp.branch_id = data.get('branch_id', emp.branch_id)

        if data.get('password'):
            emp.set_password(data.get('password'))

        db.session.commit()
        return emp
    return None


def delete_employee_service(emp_id):
    emp = Employee.query.get(emp_id)
    if emp:
        db.session.delete(emp)
        db.session.commit()
        return True
    return False