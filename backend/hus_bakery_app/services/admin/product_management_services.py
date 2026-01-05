from sqlalchemy import desc
from hus_bakery_app import db
from hus_bakery_app.models.products import Product
from hus_bakery_app.services.customer.product_services import get_rating_star_service

def get_all_products_admin_service():
    # Sắp xếp giảm dần theo ngày tạo để hiện sản phẩm mới nhất lên đầu
    products = Product.query.order_by(desc(Product.created_at)).all()

    return [{
        "product_id": p.product_id,
        "name": p.name,
        "category": p.category_id,  # Hoặc join bảng Category để lấy tên
        "unit_price": float(p.unit_price) if p.unit_price is not None else 0.0,
        "description": p.description,
        "rating": get_rating_star_service(p.product_id),  # Giả sử mặc định 5.0
        "image": p.image_url
    } for p in products]
