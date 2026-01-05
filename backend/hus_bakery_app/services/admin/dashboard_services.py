from hus_bakery_app import db
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.order_item import OrderItem
from hus_bakery_app.models.order_status import OrderStatus
from hus_bakery_app.models.products import Product
from sqlalchemy import func, extract, desc
from datetime import datetime, timedelta

def total_order_of_month(month=None, year=None, branch_id=None):
    """
    Đếm tổng số đơn hàng theo tháng, năm và chi nhánh (nếu có)
    """
    query = Order.query

    # Filter theo tháng
    if month:
        query = query.filter(extract('month', Order.created_at) == month)
    # Filter theo năm
    if year:
        query = query.filter(extract('year', Order.created_at) == year)
    # Filter theo chi nhánh
    if branch_id:
        query = query.filter(Order.branch_id == branch_id)

    return query.count()

def total_amount_of_month(month=None, year=None, branch_id=None):
    query = Order.query

    if month:
        query = query.filter(extract('month', Order.created_at) == month)
    if year:
        query = query.filter(extract('year', Order.created_at) == year)
    if branch_id:
        query = query.filter(Order.branch_id == branch_id)

    return query.with_entities(func.sum(Order.total_amount)).scalar() or 0


def total_customer_of_month(month, year):
    res = db.session.query(func.count(Order.customer_id.distinct())).filter(
        extract('month', Order.created_at) == month,
        extract('year', Order.created_at) == year
    ).scalar()

    return res if res else 0


def total_product_of_month(month, year):
    res = db.session.query(func.sum(OrderItem.quantity)) \
        .join(Order, Order.order_id == OrderItem.order_id) \
        .filter(
        extract('month', Order.created_at) == month,
        extract('year', Order.created_at) == year
    ).scalar()

    return int(res) if res else 0


def get_weekly_revenue_overview():
    # 1. Xác định ngày bắt đầu của tuần hiện tại (Thứ 2)
    today = datetime.now()
    start_of_week = today - timedelta(days=today.weekday())
    start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)

    # 2. Truy vấn tổng doanh thu theo từng ngày trong tuần
    # Lọc các đơn hàng từ start_of_week đến nay
    weekly_data = db.session.query(
        func.date(Order.created_at).label('date'),
        func.sum(Order.total_amount).label('daily_total')
    ).filter(
        Order.created_at >= start_of_week
    ).group_by(
        func.date(Order.created_at)
    ).all()

    # 3. Chuẩn bị danh sách nhãn (Thứ) và giá trị mặc định là 0
    days_map = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    revenue_dict = {(start_of_week + timedelta(days=i)).date(): 0 for i in range(7)}

    # 4. Đổ dữ liệu từ Database vào dictionary
    for row in weekly_data:
        if row.date in revenue_dict:
            revenue_dict[row.date] = float(row.daily_total)

    # 5. Định dạng lại dữ liệu để trả về cho Frontend (như biểu đồ yêu cầu)
    chart_data = []
    total_week = 0
    for i, (date, amount) in enumerate(sorted(revenue_dict.items())):
        chart_data.append({
            "label": days_map[i],
            "amount": amount,
            "display": f"{amount / 1000000:.1f}M" if amount > 0 else "0"
        })
        total_week += amount

    return {
        "total_revenue": total_week,
        "total_display": f"{total_week / 1000000:.1f}Mđ",
        "details": chart_data
    }



def get_order_status_distribution(month=None, year=None, branch_id=None):
    """
    Thống kê phân phối trạng thái đơn hàng theo tháng, năm và chi nhánh.
    """
    # 1. Lấy các ID trạng thái mới nhất cho mỗi đơn hàng
    latest_status_ids = db.session.query(
        func.max(OrderStatus.id)
    )

    if month:
        latest_status_ids = latest_status_ids.filter(extract('month', OrderStatus.updated_at) == month)
    if year:
        latest_status_ids = latest_status_ids.filter(extract('year', OrderStatus.updated_at) == year)
    if branch_id:
        latest_status_ids = latest_status_ids.join(Order, Order.order_id == OrderStatus.order_id)\
                                           .filter(Order.branch_id == branch_id)

    latest_status_ids = latest_status_ids.group_by(OrderStatus.order_id)

    # 2. Thống kê số lượng theo trạng thái hiện tại
    status_counts = db.session.query(
        OrderStatus.status,
        func.count(OrderStatus.id)
    ).filter(
        OrderStatus.id.in_(latest_status_ids)
    ).group_by(OrderStatus.status).all()

    # 3. Chuẩn hóa dữ liệu theo nhóm hiển thị
    stats = {
        "Completed": 0,  # Đã giao
        "Pending": 0,    # Đang xử lý
        "Shipping": 0,   # Đang giao
        "Cancelled": 0   # Không hoàn thành
    }

    total = 0
    for status_name, count in status_counts:
        if status_name == "Đã giao":
            stats["Completed"] += count
        elif status_name == "Đang xử lý":
            stats["Pending"] += count
        elif status_name == "Đang giao":
            stats["Shipping"] += count
        elif status_name == "Không thành công":
            stats["Cancelled"] += count
        total += count

    # 4. Tính % để hiển thị progress bar
    result = []
    for key, value in stats.items():
        percentage = (value / total * 100) if total > 0 else 0
        result.append({
            "name": key,
            "value": value,
            "percentage": round(percentage, 1)
        })

    return {
        "total_orders": total,
        "distribution": result
    }


def get_top_selling_products(month=None, year=None, branch_id=None, limit=5):
    """
    Lấy top sản phẩm bán chạy theo số lượng, lọc theo tháng, năm và chi nhánh.
    """
    query = db.session.query(
        Product.name,
        Product.image_url,
        func.sum(OrderItem.quantity).label('total_quantity'),
        func.sum(OrderItem.quantity * OrderItem.price).label('total_revenue')
    ).join(Product, OrderItem.product_id == Product.product_id)\
     .join(Order, Order.order_id == OrderItem.order_id)

    # Lọc theo branch_id
    if branch_id:
        query = query.filter(Order.branch_id == branch_id)
    # Lọc theo tháng/năm
    if month:
        query = query.filter(extract('month', Order.created_at) == month)
    if year:
        query = query.filter(extract('year', Order.created_at) == year)

    results = query.group_by(Product.product_id)\
                   .order_by(desc('total_quantity'))\
                   .limit(limit)\
                   .all()

    max_qty = results[0].total_quantity if results else 1

    top_products = []
    for row in results:
        top_products.append({
            "name": row.name,
            "image": row.image_url,
            "orders": int(row.total_quantity),
            "revenue": f"{float(row.total_revenue) / 1000000:.1f}Mđ",
            "percentage": round((row.total_quantity / max_qty) * 100)
        })

    return top_products


from sqlalchemy import func, extract
from hus_bakery_app.models.customer import Customer
from hus_bakery_app import db
from datetime import datetime


def get_customer_growth_service():
    # 1. Lấy năm hiện tại
    current_year = datetime.now().year

    # 2. Truy vấn: Đếm số lượng tài khoản khách hàng được tạo theo từng tháng trong năm nay
    growth_data = db.session.query(
        extract('month', Customer.created_at).label('month'),
        func.count(Customer.customer_id).label('count')
    ).filter(
        extract('year', Customer.created_at) == current_year
    ).group_by('month').order_by('month').all()

    # 3. Danh sách nhãn tháng (Khớp với biểu đồ Jan -> Jun)
    month_labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    # Khởi tạo dictionary với giá trị mặc định là 0 cho 12 tháng
    full_year_stats = {i: 0 for i in range(1, 13)}

    # 4. Cập nhật dữ liệu từ Database vào dictionary
    for row in growth_data:
        full_year_stats[int(row.month)] = row.count

    # 5. Định dạng dữ liệu trả về cho Frontend (Lấy 6 tháng đầu năm theo ảnh thiết kế)
    final_data = []
    for month_num in range(1, 7):
        final_data.append({
            "month": month_labels[month_num - 1],
            "customers": full_year_stats[month_num]
        })

    return final_data