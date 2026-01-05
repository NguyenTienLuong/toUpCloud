from sqlalchemy import func, extract
from hus_bakery_app import db
from hus_bakery_app.models.order import Order
from hus_bakery_app.models.branches import Branch
from hus_bakery_app.models.order_status import OrderStatus


def apply_date_filter(query, model_class, month=None, year=None, day=None):
    """Hàm bổ trợ để áp dụng bộ lọc thời gian vào query"""
    if year:
        query = query.filter(extract('year', model_class.created_at) == year)
    if month:
        query = query.filter(extract('month', model_class.created_at) == month)
    if day:
        query = query.filter(extract('day', model_class.created_at) == day)
    return query

def get_total_revenue_per_branch_service(month=None, year=None):
    query = db.session.query(
        Branch.name,
        func.sum(Order.total_amount).label('total_revenue')
    ).join(Order, Branch.branch_id == Order.branch_id)
    
    # Áp dụng lọc
    query = apply_date_filter(query, Order, month, year)
    
    results = query.group_by(Branch.branch_id).all()
    return [
        {"branch_name": row[0], "total_revenue": float(row[1] or 0)} 
        for row in results
    ]

def get_order_delivery_stats_service(month=None, year=None):
    # Tìm status mới nhất cho từng đơn hàng
    subquery = db.session.query(
        OrderStatus.order_id,
        func.max(OrderStatus.id).label('latest_status_id')
    ).group_by(OrderStatus.order_id).subquery()

    query = db.session.query(
        OrderStatus.status,
        func.count(OrderStatus.order_id)
    ).join(subquery, OrderStatus.id == subquery.c.latest_status_id)\
     .join(Order, Order.order_id == OrderStatus.order_id) # Join với Order để lấy ngày tạo

    # Áp dụng lọc dựa trên ngày tạo đơn hàng
    query = apply_date_filter(query, Order, month, year)

    results = query.group_by(OrderStatus.status).all()
    return [{"status": row[0], "count": row[1]} for row in results]

def get_revenue_by_time_and_branch_service(period='month', month=None, year=None):
    # Nếu có tháng cụ thể -> group theo Ngày. Nếu không có tháng -> group theo Tháng.
    time_extract = extract('day', Order.created_at) if month else extract('month', Order.created_at)
    
    query = db.session.query(
        time_extract.label('time_unit'),
        Branch.name,
        func.sum(Order.total_amount)
    ).join(Order, Branch.branch_id == Order.branch_id)

    query = apply_date_filter(query, Order, month, year)

    results = query.group_by('time_unit', Branch.name).order_by('time_unit').all()

    chart_data = {}
    for time_unit, branch_name, total in results:
        t_unit = int(time_unit)
        if t_unit not in chart_data:
            chart_data[t_unit] = {"time": t_unit}
        chart_data[t_unit][branch_name] = float(total or 0)

    return list(chart_data.values())