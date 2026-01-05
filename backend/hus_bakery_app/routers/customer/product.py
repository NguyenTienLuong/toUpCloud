from flask import Blueprint, jsonify, request
from hus_bakery_app.services.customer.product_services import (
    get_top_3_products_service,
    get_products_by_category_service,
    get_product_details_service,
    get_rating_star_service
)

product_bp = Blueprint('product_bp', __name__)

@product_bp.route("/<int:product_id>", methods=["GET"])
def get_product_details(product_id):
    # Gọi hàm service để lấy dữ liệu
    data = get_product_details_service(product_id)

    if not data:
        return jsonify({"error": "Sản phẩm không tồn tại"}), 404

    product, category_name = data
    avg_star = get_rating_star_service(product_id)
    # Trả về dữ liệu chi tiết dưới dạng JSON
    return jsonify({
        "product_id": product.product_id,
        "name": product.name,
        "price": float(product.unit_price),  # Ép kiểu Numeric về float để tránh lỗi JSON
        "description": product.description,
        "image": product.image_url,
        "category_name": category_name,
        "rating": avg_star
    }), 200
@product_bp.route("/top-selling", methods=["GET"])
def api_get_top_products():
    try:
        top_products = get_top_3_products_service()

        if not top_products:
            return jsonify({"message": "Chưa có dữ liệu bán hàng"}), 200

        return jsonify(top_products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@product_bp.route("/filter", methods=["GET"])
def api_filter_products_by_type():
    cat_id = request.args.get('category_id', type=int)

    if not cat_id:
        return jsonify({"error": "Vui lòng cung cấp category_id"}), 400

    try:
        products = get_products_by_category_service(cat_id)

        result = []
        for p, cat_name in products:
            result.append({
                "product_id": p.product_id,
                "name": p.name,
                "price": float(p.unit_price),
                "category_name": cat_name,
                "image": p.image_url,
                "rating": get_rating_star_service(p.product_id)
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500