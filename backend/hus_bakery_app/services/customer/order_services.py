import requests
import math
from datetime import datetime
from sqlalchemy import desc
from hus_bakery_app import db

# Models
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_item import OrderItem
from hus_bakery_app.models.cart_item import CartItem
from hus_bakery_app.models.products import Product
from hus_bakery_app.models.branches import Branch
from hus_bakery_app.models.shipper import Shipper
from hus_bakery_app.models.order_status import OrderStatus
from hus_bakery_app.models.coupon import Coupon
from hus_bakery_app.models.coupon_custom import CouponCustomer
from hus_bakery_app.models.shipper_notifications import ShipperNotification


# --- SECTION A: UTILS & HELPERS ---
def geocode_address(address):
    try:
        url = "https://nominatim.openstreetmap.org/search"
        params = {"q": address, "format": "json", "limit": 1}
        res = requests.get(url, params=params, headers={"User-Agent": "Mozilla/5.0"}, timeout=5)
        data = res.json()
        if not data: return None, None
        return float(data[0]["lat"]), float(data[0]["lon"])
    except:
        return None, None


def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


# --- SECTION B: CLIENT ORDER CREATION ---
def create_order(customer_id, recipient_name, payment_method, total_amount, phone, branch_id, shipping_address,
                 note=None, coupon_id=None):
    selected_items = CartItem.query.filter_by(customer_id=customer_id, selected=True).all()
    if not selected_items:
        return None, "Giỏ hàng rỗng hoặc chưa chọn sản phẩm"

    if coupon_id:
        cc = CouponCustomer.query.filter_by(customer_id=customer_id, coupon_id=coupon_id, status="unused").first()
        if cc:
            cc.status = "used"
            cc.used_at = datetime.now()

    # 5. Tính phí ship (Tìm branch gần nhất)

    # 6. Tìm Shipper (Optional)
    shipper = Shipper.query.filter_by(branch_id=branch_id, status="Đang hoạt động").first()
    if shipper:
        shipper.status = "busy"
    elif not shipper:
        return None, "Không có shipper nào đang sẵn sàng!"
    # 7. Lưu Order
    try:
        new_order = Order(
            customer_id=customer_id,
            branch_id=branch_id,
            shipper_id=shipper.shipper_id if shipper else None,
            coupon_id=coupon_id,
            shipping_address=shipping_address,
            phone=phone,
            payment_method=payment_method,
            recipient_name=recipient_name,
            total_amount=total_amount,
            note=note,  # Lưu ý: check lại tên cột trong DB là total_money hay total_amount
            created_at=datetime.now(),
        )
        db.session.add(new_order)
        db.session.flush()  # Để lấy order_id ngay
        statusForOrder = OrderStatus(
            order_id=new_order.order_id,
            status="Đang xử lý",
            updated_at=datetime.now(),
        )
        db.session.add(statusForOrder)

        new_notification = ShipperNotification(
            shipper_id=shipper.shipper_id,
            order_id=new_order.order_id,
            is_read=False,
            created_at=datetime.now()
        )

        db.session.add(new_notification)

        # 8. Lưu Order Items và Xóa Cart
        for item in selected_items:
            product = Product.query.get(item.product_id)
            order_item = OrderItem(
                order_id=new_order.order_id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=product.unit_price
            )
            db.session.add(order_item)
            db.session.delete(item)

        db.session.commit()

        return new_order, "Đặt hàng thành công"
    except Exception as e:
        db.session.rollback()
        import traceback
        traceback.print_exc()  # Nó sẽ in chi tiết dòng nào bị lỗi, lỗi gì
        return None, f"Lỗi hệ thống: {str(e)}"


# --- SECTION C: ADMIN ORDER MANAGEMENT (Đã di chuyển từ cart_services sang đây) ---

def get_all_orders_service(status=None, page=1, per_page=10):
    query = Order.query
    if status:
        query = query.filter_by(status=status)
    query = query.order_by(desc(Order.created_at))

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    result = []
    for order in pagination.items:
        result.append({
            "order_id": order.order_id,
            "customer_name": order.recipient_name,
            "total_money": float(order.total_money),
            "status": order.status,
            "created_at": order.created_at.strftime('%Y-%m-%d %H:%M'),
            "shipper_id": order.shipper_id,
            "address": order.shipping_address
        })
    return {
        "orders": result,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    }


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


def update_order_status_service(order_id, new_status):
    order = Order.query.get(order_id)
    if not order: return False, "Order not found"
    order.status = new_status
    db.session.commit()
    return True, "Updated"


def assign_shipper_service(order_id, shipper_id):
    order = Order.query.get(order_id)
    shipper = Shipper.query.get(shipper_id)
    if not order or not shipper: return False, "Data invalid"

    order.shipper_id = shipper_id
    order.status = 'shipping'
    db.session.commit()
    return True, f"Assigned to {shipper.full_name}"