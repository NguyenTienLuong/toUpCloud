from flask import Blueprint, jsonify, request
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.services.admin.dashboard_services import (
    total_order_of_month,
    total_amount_of_month,
    total_customer_of_month,
    total_product_of_month,
    get_order_status_distribution,
    get_top_selling_products,
    get_customer_growth_service
)

dashboard_bp = Blueprint('dashboard', __name__)


@dashboard_bp.route('/total_orders', methods=['GET'])
@jwt_required()
def api_get_order_stats():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền truy cập dữ liệu thống kê"}), 403
    # Lấy tham số month và year từ query string (ví dụ: /api/stats/orders?month=12&year=2025)
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    # Kiểm tra nếu thiếu tham số
    if not month or not year:
        return jsonify({"error": "Vui lòng cung cấp cả month và year"}), 400

    total = total_order_of_month(month, year)

    return jsonify({
        "month": month,
        "year": year,
        "total_orders": total
    }), 200


@dashboard_bp.route('/total_amount_for_month', methods=['POST'])
@jwt_required()
def api_get_total_amount():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Truy cập bị từ chối"}), 403

    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)
    branch_id = request.args.get('branch_id', type=int)  # 🔹 thêm branch_id

    if not month or not year:
        return jsonify({"error": "Thiếu thông tin tháng hoặc năm"}), 400

    # Gọi hàm service đã tối ưu, truyền branch_id nếu có
    total = total_amount_of_month(month, year, branch_id)
    
    return jsonify({
        "month": month,
        "year": year,
        "branch_id": branch_id,       # 🔹 trả về branch_id để debug
        "total_amount": total
    }), 200

@dashboard_bp.route('/total_customer_of_month', methods=['POST'])
@jwt_required()
def api_get_total_customer():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Truy cập bị từ chối"}), 403

    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    if not month or not year:
        return jsonify({"error": "Thiếu thông tin tháng hoặc năm"}), 400

        # Gọi hàm service đã tối ưu ở trên
    total = total_customer_of_month(month, year)

    return jsonify({
        "month": month,
        "year": year,
        "total_customers": total
    }), 200


@dashboard_bp.route('/total_product_of_month', methods=['POST'])
@jwt_required()
def api_get_total_product():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Truy cập bị từ chối"}), 403

    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    if not month or not year:
        return jsonify({"error": "Thiếu thông tin tháng hoặc năm"}), 400

        # Gọi hàm service đã tối ưu ở trên
    total = total_product_of_month(month, year)

    return jsonify({
        "month": month,
        "year": year,
        "total_products": total
    }), 200




# ------------------------------
# Top Selling Products
# ------------------------------
@dashboard_bp.route('/top-products', methods=['GET'])
@jwt_required()
def api_top_products():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Truy cập bị từ chối"}), 403

    # Lấy params từ query string: ?month=1&year=2026&branch_id=2
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)
    branch_id = request.args.get('branch_id', type=int)

    try:
        data = get_top_selling_products(month=month, year=year, branch_id=branch_id)
        return jsonify({
            "success": True,
            "data": data
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ------------------------------
# Order Status Distribution
# ------------------------------
@dashboard_bp.route('/order-status-distribution', methods=['GET'])
@jwt_required()
def api_order_status_distribution():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Truy cập bị từ chối"}), 403

    # Lấy params từ query string
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)
    branch_id = request.args.get('branch_id', type=int)

    try:
        data = get_order_status_distribution(month=month, year=year, branch_id=branch_id)
        return jsonify({
            "success": True,
            "data": data
        }), 200
    except Exception as e:
        import traceback
        print(traceback.format_exc()) 
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@dashboard_bp.route('/customer-growth', methods=['GET'])
@jwt_required()
def api_customer_growth():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Truy cập bị từ chối"}), 403

    try:
        growth_stats = get_customer_growth_service()

        return jsonify({
            "success": True,
            "data": growth_stats
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Lỗi hệ thống: {str(e)}"
        }), 500