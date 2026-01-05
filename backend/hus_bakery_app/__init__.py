import os
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS
from dotenv import load_dotenv
from flask_mail import Mail

load_dotenv()
db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()


def create_app():
    app = Flask(__name__)
    CORS(
        app,
        supports_credentials=True,
        resources={
            r"/api/*": {
                "origins": ["http://localhost:3000", "http://localhost:3001"],
                "allow_headers": ["Content-Type", "Authorization"],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
            }
        }
    )

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = ('Hus Bakery', os.environ.get('MAIL_USERNAME'))
    app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)

    from hus_bakery_app.routers.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')
    from hus_bakery_app.routers.customer.order_process import order_bp
    app.register_blueprint(order_bp, url_prefix='/api')
    from hus_bakery_app.routers.customer.feedback import feedback_bp
    app.register_blueprint(feedback_bp, url_prefix='/api/feedback')
    from hus_bakery_app.routers.customer.account import account_bp
    app.register_blueprint(account_bp, url_prefix="/api/account")
    from hus_bakery_app.routers.customer.product import product_bp
    app.register_blueprint(product_bp, url_prefix="/api/product")
    from hus_bakery_app.routers.customer.customer_notification import customer_noti_bp
    app.register_blueprint(customer_noti_bp, url_prefix='/api/notification')


    from hus_bakery_app.routers.admin.dashboard import dashboard_bp
    app.register_blueprint(dashboard_bp, url_prefix='/api/admin/dashboard')
    from hus_bakery_app.routers.admin.order_management import order_admin_bp
    app.register_blueprint(order_admin_bp, url_prefix='/api/admin/order_management')
    from hus_bakery_app.routers.admin.product_management import product_admin_bp
    app.register_blueprint(product_admin_bp, url_prefix='/api/admin/product_management')
    from hus_bakery_app.routers.admin.customer_management import customer_admin_bp
    app.register_blueprint(customer_admin_bp, url_prefix='/api/admin/customer_management')
    from hus_bakery_app.routers.admin.employee_management import employee_admin_bp
    app.register_blueprint(employee_admin_bp, url_prefix='/api/admin/employee_management')
    from hus_bakery_app.routers.admin.coupon_management import coupon_admin_bp
    app.register_blueprint(coupon_admin_bp, url_prefix='/api/admin/coupon_management')
    from hus_bakery_app.routers.admin.shipper_management import shipper_admin_bp
    app.register_blueprint(shipper_admin_bp, url_prefix='/api/admin/shipper_management')


    from hus_bakery_app.routers.shipper.shipper_notifications import shipper_notifications_bp
    app.register_blueprint(shipper_notifications_bp, url_prefix='/api/shipper/notifications')
    from hus_bakery_app.routers.shipper.statistics import shipper_stats_bp
    app.register_blueprint(shipper_stats_bp, url_prefix='/api/shipper/statistics')

    from hus_bakery_app.routers.superadmin.superadmin_dashboard import superadmin_dashboard_bp
    app.register_blueprint(superadmin_dashboard_bp, url_prefix='/api/superadmin/dashboard')
    from hus_bakery_app.routers.superadmin.edit import admin_mgmt_bp
    app.register_blueprint(admin_mgmt_bp, url_prefix='/api/superadmin')

    @app.route("/test_db")
    def test_db():
        try:
            db.session.execute(text('SELECT 1'))
            return "Kết nối cơ sở dữ liệu **thành công**!"
        except Exception as e:
            return f"Kết nối thất bại. Lỗi: {e}"

    with app.app_context():
        from .models.categories import Category
        from .models.products import Product
        from .models.branches import Branch
        from .models.branch_product import BranchProduct
        from .models.cart_item import CartItem
        from .models.coupon import Coupon
        from .models.coupon_custom import CouponCustomer
        from .models.customer import Customer
        from .models.employee import Employee
        from .models.feedback import Feedback
        from .models.order import Order
        from .models.order_item import OrderItem
        from .models.order_status import OrderStatus
        from .models.product_review import ProductReview
        from .models.shipper import Shipper
        from .models.shipper_review import ShipperReview
        db.create_all()

    return app