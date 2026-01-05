from hus_bakery_app import db
from hus_bakery_app.models.cart_item import CartItem
from hus_bakery_app.models.products import Product
from hus_bakery_app.models.coupon import Coupon
from hus_bakery_app.models.coupon_custom import CouponCustomer
from datetime import datetime


# ==========================
# 1. ADD TO CART
# ==========================
def add_to_cart(customer_id, product_id, quantity=1):
    item = CartItem.query.filter_by(customer_id=customer_id, product_id=product_id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(
            customer_id=customer_id,
            product_id=product_id,
            quantity=quantity,
            # Mặc định thêm vào là chọn luôn
        )
        db.session.add(item)

    db.session.commit()
    return item


# ==========================
def update_cart_quantity(customer_id, product_id, quantity):
    item = CartItem.query.filter_by(
        customer_id=customer_id,
        product_id=product_id
    ).first()

    if not item:
        return None

    try:
        if quantity <= 0:
            db.session.delete(item)
            db.session.commit()
            return "deleted"

        item.quantity = quantity
        db.session.commit()
        return item

    except Exception:
        db.session.rollback()
        return None


# ==========================
# 2. UPDATE SELECTED (Chọn/Bỏ chọn món)
# ==========================
def update_selected(customer_id, product_id, selected: bool):
    item = CartItem.query.filter_by(customer_id=customer_id, product_id=product_id).first()
    if not item:
        return None

    item.selected = selected
    db.session.commit()
    return item


# ==========================
# 3. GET CART (Lấy danh sách giỏ hàng)
# ==========================
def get_cart(customer_id):
    # Join bảng CartItem và Product để lấy thông tin chi tiết
    results = db.session.query(CartItem, Product) \
        .join(Product, CartItem.product_id == Product.product_id) \
        .filter(CartItem.customer_id == customer_id).all()

    items_data = []
    total_estimated = 0

    for cart_item, product in results:
        item_total = cart_item.quantity * float(product.unit_price)
        if cart_item.selected:
            total_estimated += item_total

        items_data.append({
            "product_id": product.product_id,
            "product_name": product.name,
            "image": product.image_url,
            "price": float(product.unit_price),
            "quantity": cart_item.quantity,

        })

    return {
        "items": items_data,
        "total_estimated": total_estimated
    }


def remove_from_cart(customer_id, product_id):
    item = CartItem.query.filter_by(
        customer_id=customer_id,
        product_id=product_id
    ).first()

    if not item:
        return False

    try:
        db.session.delete(item)
        db.session.commit()
        return True
    except Exception:
        db.session.rollback()
        return False


# ==========================
# 4. COUPON SERVICES
# ==========================
def coupon_of_customer(customer_id):
    # Lấy danh sách coupon của khách (kèm thông tin chi tiết coupon)
    results = db.session.query(CouponCustomer, Coupon) \
        .join(Coupon, CouponCustomer.coupon_id == Coupon.coupon_id) \
        .filter(CouponCustomer.customer_id == customer_id) \
        .filter(CouponCustomer.status == 'unused').all()  # Chỉ lấy cái chưa dùng

    data = []
    for cc, coupon in results:
        # Kiểm tra hạn sử dụng
        if coupon.end_date and coupon.end_date < datetime.today().date():
            continue

        data.append({
            "coupon_id": coupon.coupon_id,
            # "code": coupon.code,
            "description": coupon.description,
            "discount_type": coupon.discount_type,
            "discount_value": coupon.discount_value,
            "discount_percent": coupon.discount_percent,
            "min_purchase": float(coupon.min_purchase),
            "max_discount": float(coupon.max_discount or coupon.discount_value or 0),
            "end_date": coupon.end_date.strftime('%Y-%m-%d') if coupon.end_date else None
        })
    return data


def coupon_info(coupon_id):
    coupon = Coupon.query.get(coupon_id)
    if not coupon:
        return None
    return {
        "coupon_id": coupon.coupon_id,
        # "code": coupon.code,
        "min_purchase": float(coupon.min_purchase),
        "description": coupon.description
    }