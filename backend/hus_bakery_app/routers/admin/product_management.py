from flask import Blueprint, jsonify, request
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from hus_bakery_app.services.admin.product_management_services import  get_all_products_admin_service

product_admin_bp = Blueprint('product_admin', __name__)

@product_admin_bp.route('/products', methods=['GET'])
@jwt_required()
def list_products():
    identity = json.loads(get_jwt_identity())
    if identity.get("role") != 'employee':
        return jsonify({"error": "Bạn không có quyền truy cập danh sách sản phẩm quản trị"}), 403

    products = get_all_products_admin_service()
    return jsonify(products), 200