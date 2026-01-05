from hus_bakery_app.models.branches import Branch
from hus_bakery_app.models.coupon_custom import CouponCustomer
from hus_bakery_app.models.customer import Customer
from hus_bakery_app.models.employee import Employee
from hus_bakery_app.models.products import Product
from hus_bakery_app.models.coupon import Coupon
from datetime import datetime
from hus_bakery_app import db
from hus_bakery_app.services.customer.account_services import get_customer_rank_service
from hus_bakery_app.services.customer.product_services import get_rating_star_service

#============================BRANCH==================================

def add_branch_service(data):
    manager_id = data.get('manager_id')
    # Tạo đối tượng Branch mới với đầy đủ các trường từ file branches.py
    new_branch = Branch(
        name=data.get('name'),
        address=data.get('address'),
        phone=data.get('phone'),
        email=data.get('email'),
        mapSrc=data.get('mapSrc'),
        lat=data.get('lat'),
        lng=data.get('lng'), # Lưu ý: Model dùng 'lng', không phải 'lon'
        manager_id=data.get('manager_id')
    )

    if manager_id:
        employee = Employee.query.get(manager_id)
        if employee:
            employee.role_name = 'Quản lý'
            employee.branch_id = new_branch.branch_id
        else:
            pass
    db.session.add(new_branch)
    db.session.commit()
    return new_branch


def update_branch_service(branch_id, data):
    branch = Branch.query.get(branch_id)
    if not branch:
        return None

    # Lấy ID quản lý cũ và mới
    old_manager_id = branch.manager_id
    new_manager_id = data.get('manager_id')

    # Chỉ thực hiện hoán đổi nếu có sự thay đổi người quản lý
    if new_manager_id and new_manager_id != old_manager_id:

        # 1. Chuyển quản lý cũ thành 'Nhân viên'
        if old_manager_id:
            old_manager = Employee.query.get(old_manager_id)
            if old_manager:
                old_manager.role_name = 'Nhân viên'

        # 2. Chuyển nhân viên mới thành 'Quản lý'
        new_manager = Employee.query.get(new_manager_id)
        if new_manager:
            new_manager.role_name = 'Quản lý'
            # Cập nhật luôn chi nhánh làm việc cho quản lý mới nếu cần
            new_manager.branch_id = branch_id

    # 3. Cập nhật các trường thông tin của chi nhánh
    branch.name = data.get('name', branch.name)
    branch.address = data.get('address', branch.address)
    branch.phone = data.get('phone', branch.phone)
    branch.email = data.get('email', branch.email)
    branch.mapSrc = data.get('mapSrc', branch.mapSrc)
    branch.lat = data.get('lat', branch.lat)
    branch.lng = data.get('lng', branch.lng)
    branch.manager_id = new_manager_id if new_manager_id else branch.manager_id

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e

    return branch

def delete_branch_service(branch_id):
    branch = Branch.query.get(branch_id)
    if not branch:
        return False, "Không tìm thấy chi nhánh."

    try:
        # Bước 1: Trước khi xóa chi nhánh, cần xử lý quản lý chi nhánh đó
        # (Chuyển quản lý đó về lại làm nhân viên bình thường)
        if branch.manager_id:
            manager = Employee.query.get(branch.manager_id)
            if manager:
                manager.role_name = 'Nhân viên'

        # Bước 2: Xóa chi nhánh
        db.session.delete(branch)
        db.session.commit()
        return True, "Xóa chi nhánh thành công."

    except Exception as e:
        db.session.rollback()
        # Lỗi thường gặp: Chi nhánh vẫn còn nhân viên hoặc đơn hàng liên quan
        return False, "Không thể xóa chi nhánh này vì vẫn còn nhân viên hoặc dữ liệu đơn hàng liên quan."

def get_branch_detail_service(branch_id):
    # Lấy thông tin chi tiết chi nhánh theo ID
    branch = Branch.query.get(branch_id)
    if not branch:
        return None

    return {
        "branch_id": branch.branch_id,
        "name": branch.name,
        "address": branch.address,
        "phone": branch.phone,
        "email": branch.email,
        "mapSrc": branch.mapSrc,
        "lat": float(branch.lat) if branch.lat else None,
        "lng": float(branch.lng) if branch.lng else None,
        "manager_id": branch.manager_id
    }

def get_branch_manager_info_service(branch_id):
    result = db.session.query(
        Branch.name.label('branch_name'),
        Employee.employee_id,
        Employee.employee_name,
        Employee.email,
        Employee.role_name,
        Employee.status
    ).join(Employee, Branch.manager_id == Employee.employee_id)\
     .filter(Branch.branch_id == branch_id).first()

    if not result:
        return None

    return {
        "branch_name": result.branch_name,
        "manager_id": result.employee_id,
        "manager_name": result.employee_name,
        "email": result.email,
        "role": result.role_name,
        "status": result.status
    }

#=============================EMPOLYEE====================================
def create_employee_service(data):
    # Khởi tạo theo đúng __init__ của model Employee
    new_emp = Employee(
        employee_id=data.get('employee_id'),
        employee_name=data.get('employee_name'),
        role_name="Quản lý",
        email=data.get('email'),
        password=None,  # Sẽ set qua set_password
        salary=data.get('salary'),
        branch_id=data.get('branch_id')
    )
    # Gán trạng thái (không có trong init nhưng có trong columns)
    new_emp.status = data.get('status', 'Active')

    # Hash mật khẩu
    if data.get('password'):
        new_emp.set_password(data.get('password'))

    db.session.add(new_emp)
    db.session.commit()
    return new_emp


def update_employee_service(emp_id, data):
    emp = Employee.query.get(emp_id)
    if not emp: return None

    emp.employee_name = data.get('employee_name', emp.employee_name)
    emp.role_name = 'Quản lý'
    emp.email = data.get('email', emp.email)
    emp.salary = data.get('salary', emp.salary)
    emp.status = data.get('status', emp.status)
    emp.branch_id = data.get('branch_id', emp.branch_id)

    if data.get('password'):
        emp.set_password(data.get('password'))

    db.session.commit()
    return emp

def delete_employee_service(employee_id):
    employee = Employee.query.get(employee_id)
    if not employee:
        return False, "Không tìm thấy nhân viên"

    try:
        from hus_bakery_app.models.branches import Branch

        # 1. Tìm tất cả chi nhánh mà nhân viên này đang quản lý
        managed_branches = Branch.query.filter_by(manager_id=employee_id).all()

        if managed_branches:
            for branch in managed_branches:
                # Gỡ bỏ quyền quản lý (để có thể xóa nhân viên mà không vi phạm ràng buộc dữ liệu)
                branch.manager_id = None

            # Cập nhật thay đổi cho các chi nhánh trước khi xóa nhân viên
            db.session.flush()

            # 2. Xóa vĩnh viễn nhân viên
        db.session.delete(employee)
        db.session.commit()
        return True, "Đã gỡ quyền quản lý và xóa nhân viên thành công"

    except Exception as e:
        db.session.rollback()
        # Thường là lỗi IntegrityError do nhân viên đã có trong lịch sử đơn hàng/shipper
        return False, f"Lỗi hệ thống: {str(e)}. Nếu nhân viên đã có lịch sử đơn hàng, hãy dùng tính năng 'Nghỉ việc' thay vì xóa."

#=============================PRODUCT==============================================

def get_all_products_service():
    products = Product.query.order_by(Product.product_id.desc()).all()

    result = []
    for product in products:
        result.append({
            "product_id": product.product_id,
            "name": product.name,
            "description": product.description,
            "image_url": product.image_url,
            "unit_price": float(product.unit_price) if product.unit_price else 0,
            "category_id": product.category_id,
            "created_at": product.created_at.strftime('%Y-%m-%d %H:%M:%S') if product.created_at else None,
            "updated_at": product.updated_at.isoformat() if product.updated_at else None,
            "rating": get_rating_star_service(product.product_id)
        })
    return result

def add_product_service(data):
    new_product = Product(
        name=data.get('name'),
        description=data.get('description'),
        image_url=data.get('image_url'),
        unit_price=data.get('unit_price'),
        category_id=data.get('category_id'),
        updated_at=datetime.now().date()
    )
    db.session.add(new_product)
    db.session.commit()
    return new_product


def update_product_service(product_id, data):
    product = Product.query.get(product_id)
    if not product: return None

    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)
    product.unit_price = data.get('unit_price', product.unit_price)
    product.category_id = data.get('category_id', product.category_id)
    product.updated_at = datetime.now().date()  # Cập nhật ngày chỉnh sửa

    db.session.commit()
    return product

def delete_product_service(product_id):
    product = Product.query.get(product_id)
    if not product:
        return False

    try:
        db.session.delete(product)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        # Nếu sản phẩm đã có trong đơn hàng (OrderItem), Database sẽ báo lỗi khóa ngoại
        print(f"Lỗi khi xóa sản phẩm: {str(e)}")
        return False

#=================================COUPONS===========================================

def create_coupon_service(data):
    # 1. Tạo Coupon mới
    new_coupon = Coupon()
    new_coupon.description = data.get('description')
    new_coupon.discount_percent = data.get('discount_percent')
    new_coupon.discount_value = data.get('discount_value')
    new_coupon.discount_type = data.get('discount_type')
    new_coupon.min_purchase = data.get('min_purchase', 0)
    new_coupon.max_discount = data.get('max_discount')
    new_coupon.begin_date = data.get('begin_date')
    new_coupon.end_date = data.get('end_date')
    new_coupon.status = data.get('status', 'Active')
    new_coupon.rank = data.get('rank', 'Đồng')  # Gán rank từ data truyền vào
    new_coupon.created_at = datetime.now()
    new_coupon.updated_at = datetime.now()

    db.session.add(new_coupon)
    db.session.flush()  # Để lấy được new_coupon.coupon_id trước khi commit

    all_customers = Customer.query.all()

    # 2. Dùng list comprehension để lọc những người có rank thỏa mãn
    target_customers = [
        c for c in all_customers
        if get_customer_rank_service(c.customer_id) == new_coupon.rank
    ]

    for customer in target_customers:
        assignment = CouponCustomer(
            coupon_id=new_coupon.coupon_id,
            customer_id=customer.customer_id,
            status='unused'
        )
        db.session.add(assignment)

    db.session.commit()
    return new_coupon


def update_coupon_service(coupon_id, data):
    coupon = Coupon.query.get(coupon_id)
    if not coupon: return None

    coupon.description = data.get('description', coupon.description)
    coupon.discount_percent = data.get('discount_percent', coupon.discount_percent)
    coupon.discount_value = data.get('discount_value', coupon.discount_value)
    coupon.discount_type = data.get('discount_type', coupon.discount_type)
    coupon.min_purchase = data.get('min_purchase', coupon.min_purchase)
    coupon.max_discount = data.get('max_discount', coupon.max_discount)
    coupon.begin_date = data.get('begin_date', coupon.begin_date)
    coupon.end_date = data.get('end_date', coupon.end_date)
    coupon.status = data.get('status', coupon.status)
    coupon.updated_at = datetime.now()

    db.session.commit()
    return coupon

def delete_coupon_service(coupon_id):
    coupon = Coupon.query.get(coupon_id)
    if not coupon:
        return False

    try:
        # Tùy chọn 1: Xóa vĩnh viễn (Hard Delete)
        db.session.delete(coupon)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        # Nếu mã đã được áp dụng vào Đơn hàng (Order), Database sẽ chặn xóa do ràng buộc khóa ngoại
        print(f"Lỗi khi xóa coupon: {str(e)}")
        return False


