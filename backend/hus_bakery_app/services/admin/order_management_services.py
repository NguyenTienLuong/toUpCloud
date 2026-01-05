from sqlalchemy import desc
from hus_bakery_app import db
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_item import OrderItem
from hus_bakery_app.models.products import Product
from hus_bakery_app.models.customer import Customer
from hus_bakery_app.models.order_status import OrderStatus

def order_detail(order_id, branch_id):
    # Lọc đơn hàng phải khớp cả order_id và branch_id của quản lý
    order = Order.query.filter_by(order_id=order_id, branch_id=branch_id).first()
    if not order:
        return None

    results = (db.session.query(OrderItem, Product)
               .join(Product, OrderItem.product_id == Product.product_id)
               .filter(OrderItem.order_id == order_id)).all()

    order_items_list = []
    for item, product in results:
        order_items_list.append({
            "product_name": product.name,
            "quantity": item.quantity,
            "price_at_purchase": float(item.price),
            "total_item_price": float(item.price * item.quantity),
            "branch": order.branch_id,
            "image": product.avatar
        })
    return order_items_list

def delete_order(order_id, branch_id):
    # Chỉ cho phép xóa nếu đơn hàng thuộc chi nhánh quản lý
    order = Order.query.filter_by(order_id=order_id, branch_id=branch_id).first()
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

        status = OrderStatus.query.filter_by(order_id=order.order_id).first()
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