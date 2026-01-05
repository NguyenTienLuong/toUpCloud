from hus_bakery_app import db
from hus_bakery_app.models.customer_notifications import CustomerNotification
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_status import OrderStatus
from sqlalchemy import desc

def check_pending_reviews_for_customer(customer_id):
    """
    Lấy danh sách các đơn hàng chờ khách hàng đánh giá.
    Trả về created_at dưới dạng đối tượng datetime gốc.
    """
    pending_notifications = CustomerNotification.query.filter_by(
        customer_id=customer_id,
        is_read=False
    ).order_by(desc(CustomerNotification.created_at)).all()

    notifications = []

    for noti in pending_notifications:
        notifications.append({
            "id": noti.id,
            "order_id": noti.order_id,
            "message": "Bạn có đơn hàng chưa đánh giá, hãy chia sẻ cảm nhận nhé! ⭐",
            "created_at": noti.created_at,
            "note": noti.order.note if noti.order else "",
            "is_read": False
        })

    return notifications

def mark_customer_notification_read(order_id):
    """
    Đánh dấu thông báo đã đọc dựa trên order_id.
    """
    notification = CustomerNotification.query.filter_by(order_id=order_id, is_read=False).first()
    if notification:
        notification.is_read = True
        db.session.commit()
        return True
    return False

def get_new_success_order_notification(customer_id):
    latest_order = db.session.query(Order, OrderStatus.status)\
        .join(OrderStatus, Order.order_id == OrderStatus.order_id)\
        .filter(Order.customer_id == customer_id)\
        .order_by(desc(OrderStatus.updated_at)).first()

    if latest_order:
        order_obj, current_status = latest_order

        if current_status == "Đã giao":
            return {
                "order_id": order_obj.order_id,
                "status": current_status,
                "message": f"Đơn hàng #{order_obj.order_id} đã giao thành công! Chúc bạn ngon miệng. ❤️",
                "can_review": True
            }

    return None

from sqlalchemy import desc

def get_all_success_order_notifications(customer_id, page=1, per_page=10):
    """
        Lấy tất cả bản ghi từ bảng customer_notification của một khách hàng.
        """
    # 1. Truy vấn từ bảng CustomerNotification
    query = CustomerNotification.query.filter_by(customer_id=customer_id) \
        .order_by(desc(CustomerNotification.created_at))

    # 2. Phân trang
    paginated_data = query.paginate(page=page, per_page=per_page, error_out=False)

    # 3. Format dữ liệu trả về
    notifications = []
    for notif in paginated_data.items:
        notifications.append({
            "id": notif.id,
            "order_id": notif.order_id,
            "is_read": notif.is_read,
            "created_at": notif.created_at,
        })

    return {
        "items": notifications,
        "total_pages": paginated_data.pages,
        "current_page": paginated_data.page,
        "total_items": paginated_data.total
    }