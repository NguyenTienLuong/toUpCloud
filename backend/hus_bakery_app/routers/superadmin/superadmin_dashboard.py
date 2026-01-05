from flask import Blueprint, jsonify, request
from hus_bakery_app.services.superadmin.superadmin_dashboard_services import (
    get_total_revenue_per_branch_service,
    get_order_delivery_stats_service,
    get_revenue_by_time_and_branch_service
)
import json
from flask_jwt_extended import jwt_required, get_jwt_identity

superadmin_dashboard_bp = Blueprint('superadmin_dashboard_bp', __name__)


@superadmin_dashboard_bp.route('/revenue_per_branch', methods=['GET'])
@jwt_required()
def get_revenue_per_branch():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    data = get_total_revenue_per_branch_service(month=month, year=year)
    return jsonify({"success": True, "data": data}), 200


@superadmin_dashboard_bp.route('/order_stats', methods=['GET'])
@jwt_required()
def get_order_stats():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403

    """Lấy thống kê trạng thái các đơn hàng (đang giao, đã giao, hủy...)"""
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    data = get_order_delivery_stats_service(month=month, year=year)
    return jsonify({"success": True, "data": data}), 200


@superadmin_dashboard_bp.route('/revenue_chart', methods=['GET'])
@jwt_required()
def get_revenue_chart():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền thực hiện thao tác này"}), 403
    """
    Lấy dữ liệu doanh thu theo thời gian để vẽ biểu đồ
    Param: period (month/week) - mặc định là month
    """
    period = request.args.get('period', 'month')
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    data = get_revenue_by_time_and_branch_service(period, month, year)
    return jsonify({"success": True, "data": data}), 200