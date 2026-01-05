from sqlalchemy import func
from hus_bakery_app import db
from hus_bakery_app.models.customer import Customer
from hus_bakery_app.models.order import Order


def get_all_customers_with_stats_service():
    # Query lấy Customer và sum của total_amount từ bảng Order
    results = db.session.query(
        Customer,
        func.sum(Order.total_amount).label('total_spent')
    ).outerjoin(Order, Customer.customer_id == Order.customer_id) \
        .group_by(Customer.customer_id).all()

    return results


def delete_customer_service(customer_id):
    customer = Customer.query.get(customer_id)
    if customer:
        db.session.delete(customer)  # Xóa đối tượng
        db.session.commit()  # Lưu thay đổi vào DB
        return True
    return False