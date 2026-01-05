from sqlalchemy import desc
from hus_bakery_app import db
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_item import OrderItem
from hus_bakery_app.models.products import Product
from hus_bakery_app.models.customer import Customer
from hus_bakery_app.models.order_status import OrderStatus
from hus_bakery_app.models.shipper import Shipper
from hus_bakery_app.models.branches import Branch

def get_order_detail_service(order_id):
    order = Order.query.filter_by(order_id=order_id).first()
    if not order: return None, "Không tìm thấy đơn hàng"

    # Query items tối ưu hơn dùng loop
    items_query = db.session.query(OrderItem, Product) \
        .join(Product, OrderItem.product_id == Product.product_id) \
        .filter(OrderItem.order_id == order_id).all()

    items = []
    for oi, p in items_query:
        items.append({
            "product_name": p.name,
            "quantity": oi.quantity,
            "price": float(p.unit_price),
            "image": p.image_url
        })
    shipper = Shipper.query.filter_by(shipper_id=order.shipper_id).first()
    getBranch = Branch.query.filter_by(branch_id=order.branch_id).first()
    return {
        "order_id": order.order_id,
        "recipient_name": order.recipient_name,
        "address": order.shipping_address,
        "total_money": float(order.total_amount),
        "note": order.note,
        "payment_method": order.payment_method,
        "items": items,
        "phone": order.phone,
        "branch_name": getBranch.name,
        "created_at": order.created_at,
        "shipper_id": order.shipper_id,
        "shipper_name": shipper.name,
    }, None


def delete_order(order_id):
    # Chỉ cho phép xóa nếu đơn hàng thuộc chi nhánh quản lý
    order = Order.query.filter_by(order_id=order_id).first()
    if order:
        db.session.delete(order)
        db.session.commit()
        return True
    return False

def get_all_orders_service(branch_id):
    # 1. Lấy tất cả đơn hàng của chi nhánh
    orders = Order.query.filter_by(branch_id=branch_id).order_by(desc(Order.created_at)).all()

    orders_list = []
    for order in orders:
        # 2. Với mỗi đơn hàng, tìm các sản phẩm thông qua OrderItem và Product
        items = db.session.query(OrderItem, Product) \
            .join(Product, OrderItem.product_id == Product.product_id) \
            .filter(OrderItem.order_id == order.order_id).all()

        status = (
    OrderStatus.query
    .filter_by(order_id=order.order_id)
    .order_by(desc(OrderStatus.updated_at))
    .first()
)
        # 3. Danh sách sản phẩm của đơn hàng này
      

        # 4. Gom tất cả vào thông tin đơn hàng
        orders_list.append({
            "order_id": order.order_id,
            "customer_id": order.customer_id,
            "recipient_name": order.recipient_name,
            "total_amount": float(order.total_amount) if order.total_amount else 0,
            "created_at": order.created_at,
            "status": status.status if status else "Pending",
        })

    return orders_list