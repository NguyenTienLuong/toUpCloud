from hus_bakery_app import db
from datetime import datetime
from hus_bakery_app.models.coupon import Coupon
from hus_bakery_app.models.coupon_custom import CouponCustomer
from hus_bakery_app.models.customer import Customer
from hus_bakery_app.services.customer.account_services import get_customer_rank_service


def get_all_coupons_service():
    return Coupon.query.all()


def add_coupon_service(data):
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

def edit_coupon_service(coupon_id, data):
    coupon = Coupon.query.get(coupon_id)
    if coupon:
        # Cập nhật các trường dựa trên tên biến trong Model coupon.py
        coupon.discount_value = data.get('discount_value', coupon.discount_value)
        coupon.begin_date = data.get('begin_date', coupon.begin_date)
        coupon.end_date = data.get('end_date', coupon.end_date)
        coupon.status = data.get('status', coupon.status)

        db.session.commit()
        return coupon
    return None


def delete_coupon_service(coupon_id):
    coupon = Coupon.query.get(coupon_id)
    if coupon:
        db.session.delete(coupon)
        db.session.commit()
        return True
    return False