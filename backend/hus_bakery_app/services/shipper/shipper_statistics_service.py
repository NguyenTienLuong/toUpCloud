from sqlalchemy import func, desc
from hus_bakery_app import db
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_item import OrderItem
from hus_bakery_app.models.order_status import OrderStatus
from hus_bakery_app.models.shipper_review import ShipperReview


# 1. Hàm đếm tổng số đơn hàng
def count_total_orders(shipper_id):
    count = db.session.query(func.count(Order.order_id)) \
        .filter(Order.shipper_id == shipper_id).scalar()
    return count if count else 0


# 2. Hàm đếm đơn thành công
def count_successful_orders(shipper_id):
    # Join OrderStatus để check trạng thái "Hoàn thành"
    count = db.session.query(func.count(Order.order_id)) \
        .join(OrderStatus, Order.order_id == OrderStatus.order_id) \
        .filter(
        Order.shipper_id == shipper_id,
        OrderStatus.status == "Đã giao"  # Sửa lại nếu DB lưu chuỗi khác (VD: "completed")
    ).scalar()
    return count if count else 0


# 3. Hàm đếm đơn thất bại (Hủy / Từ chối / Không thành công)
def count_failed_orders(shipper_id):
    count = db.session.query(func.count(Order.order_id)) \
        .join(OrderStatus, Order.order_id == OrderStatus.order_id) \
        .filter(
        Order.shipper_id == shipper_id,
        OrderStatus.status.in_(["Không thành công"])
    ).scalar()
    return count if count else 0


# 4. Hàm tính điểm đánh giá trung bình
def calculate_avg_rating(shipper_id):
    avg = db.session.query(func.avg(ShipperReview.rating)) \
        .filter(ShipperReview.shipper_id == shipper_id).scalar()

    # Làm tròn 1 chữ số thập phân (VD: 4.8)
    return round(float(avg), 1) if avg else 0.0

def get_shipper_all_order_history(shipper_id, page, per_page):
    """
    Lấy danh sách đơn hàng đã giao thành công (Có phân trang)
    """
    finished_status = ["Đã giao", "Không thành công"]
    # 1. Query đơn hàng Hoàn thành, sắp xếp mới nhất
    query = db.session.query(Order).join(
        OrderStatus, Order.order_id == OrderStatus.order_id
    ).filter(
        Order.shipper_id == shipper_id,
        OrderStatus.status.in_(finished_status)
    ).order_by(desc(Order.created_at))

    # 2. Phân trang
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    orders = pagination.items

    history_list = []

    for order in orders:
        # a. Đếm số món trong đơn
        item_count = db.session.query(func.count(OrderItem.order_item_id))\
            .filter(OrderItem.order_id == order.order_id).scalar() or 0

        # b. Lấy Rating (nếu có)
        rating_val = 0
        if order.customer_id:
            review = ShipperReview.query.filter_by(
                shipper_id=shipper_id,
                customer_id=order.customer_id
            ).first()
            if review:
                rating_val = review.rating

        # c. Format kết quả
        history_list.append({
            "order_id": order.order_id,
            "quantity_text": f"{item_count} sản phẩm",
            "total_amount": float(order.total_amount),
            "shipping_address": order.shipping_address,
            "status": "Đã giao",
            "rating": rating_val, # Số sao (1-5)
            "created_at": order.created_at.strftime("%d/%m/%Y")
        })

    return {
        "data": history_list,
        "pagination": {
            "total_records": pagination.total,
            "total_pages": pagination.pages,
            "current_page": page,
            "per_page": per_page
        }
    }