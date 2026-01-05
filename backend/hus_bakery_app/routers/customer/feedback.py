from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from hus_bakery_app.services.customer.feedback_services import create_feedback_sigma

feedback_bp = Blueprint('feedback', __name__, url_prefix='/api/feedback')


@feedback_bp.route('/add', methods=['POST'])
@jwt_required()
def add_feedback():
    identity = get_jwt_identity()
    user_data = json.loads(identity) if isinstance(identity, str) else identity
    user_id = user_data.get('id')

    data = request.get_json()

    order_id = data.get('order_id')
    rating_product = data.get('rating_product')
    rating_branch = data.get('rating_branch')
    rating_shipper = data.get('rating_shipper')

    if order_id is None or any(r is None for r in [rating_product, rating_branch, rating_shipper]):
        return jsonify({"status": "fail", "message": "Vui lòng nhập đầy đủ thông tin đánh giá"}), 400

    success, message = create_feedback_sigma(
        user_id=user_id,
        order_id=order_id,
        rating_product=rating_product,
        rating_branch=rating_branch,
        rating_shipper=rating_shipper
    )

    if success:
        return jsonify({"status": "success", "message": message}), 201

    return jsonify({"status": "fail", "message": message}), 400