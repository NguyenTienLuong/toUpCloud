from datetime import datetime
from hus_bakery_app.models.order_status import OrderStatus
from hus_bakery_app.models.shipper import Shipper
from hus_bakery_app.models.order import Order
from hus_bakery_app import db
from hus_bakery_app.models.customer_notifications import CustomerNotification


def update_status_order(order_id, status):
    try:
        new_status = OrderStatus(
            order_id=order_id,
            status=status,
            updated_at=datetime.now()
        )
        db.session.add(new_status)

        if status in ["Đã giao", "Không thành công"]:
            order = Order.query.get(order_id)
            if order and order.shipper_id:
                shipper = Shipper.query.get(order.shipper_id)
                if shipper:
                    shipper.status = "Đang hoạt động"
        if status == "Đã giao":
            new_customer_noti = CustomerNotification(
                customer_id=order.customer_id,  # Lấy từ thông tin đơn hàng
                order_id=order_id,
                is_read=False,
                created_at=datetime.now()
            )
            db.session.add(new_customer_noti)
        db.session.commit()
        return True, "Cập nhật trạng thái đơn hàng thành công"
    except Exception as e:
        db.session.rollback()
        return False, str(e)