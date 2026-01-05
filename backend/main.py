import datetime
from hus_bakery_app import create_app, db
from flask_apscheduler import APScheduler
from hus_bakery_app.models.coupon import Coupon

app = create_app()


def auto_update_coupon_status():
    with app.app_context():
        now = datetime.now()
        # Tìm các coupon hết hạn và đang active
        expired_coupons = Coupon.query.filter(
            Coupon.end_date < now,
            Coupon.status == 'active'
        ).all()

        if expired_coupons:
            for cp in expired_coupons:
                cp.status = 'Expired'
            db.session.commit()
            print(f"[{now}] Hệ thống tự động: Đã cập nhật {len(expired_coupons)} coupon hết hạn.")
        else:
            print(f"[{now}] Hệ thống tự động: Không có coupon nào mới hết hạn.")

scheduler = APScheduler()
if __name__ == '__main__':
    scheduler.add_job(
        id='daily_coupon_check',
        func=auto_update_coupon_status,
        trigger='cron',
        hour=0,
        minute=0
    )

    scheduler.init_app(app)
    scheduler.start()
    app.run(host='0.0.0.0', port=5000, debug=True)