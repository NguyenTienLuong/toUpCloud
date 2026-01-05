from datetime import datetime
from hus_bakery_app import db
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_item import OrderItem
from hus_bakery_app.models.product_review import ProductReview
from hus_bakery_app.models.shipper_review import ShipperReview
from hus_bakery_app.models.feedback import Feedback

def create_feedback_sigma(user_id, order_id, rating_product, rating_branch, rating_shipper):
    order = Order.query.get(order_id)
    if not order:
        return False, "Đơn hàng không tồn tại."

    if order.customer_id != user_id:
        return False, "Bạn không có quyền đánh giá đơn hàng này."

    existing = Feedback.query.filter_by(order_id=order_id).first()
    if existing:
        return False, "Đơn hàng này đã được đánh giá trước đó."

    try:
        now = datetime.now()

        order_items = OrderItem.query.filter_by(order_id=order_id).all()
        for item in order_items:
            p_review = ProductReview(
                order_item_id=item.order_item_id, # Truyền khóa chính
                product_id=item.product_id,
                customer_id=user_id,
                rating=rating_product,
                created_at=now
            )
            db.session.add(p_review)

        b_feedback = Feedback(
            order_id=order_id,
            branch_id=order.branch_id,
            customer_id=user_id,
            rating=rating_branch
        )
        db.session.add(b_feedback)

        if order.shipper_id:
            s_review = ShipperReview(
                order_id=order_id,
                shipper_id=order.shipper_id,
                customer_id=user_id,
                rating=rating_shipper,
                created_at=now
            )
            db.session.add(s_review)

        db.session.commit()
        return True, "Cảm ơn bạn đã gửi đánh giá đầy đủ!"

    except Exception as e:
        db.session.rollback()
        return False, f"Lỗi hệ thống khi lưu đánh giá: {str(e)}"