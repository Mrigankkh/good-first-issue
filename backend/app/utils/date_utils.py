from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

def generate_month_buckets(months_back: int = 6) -> list[tuple[str, str]]:
    """
    Generate date buckets for each month going back `months_back` months from today.
    Each bucket is a tuple (start_date, end_date) in YYYY-MM-DD format.
    """
    today = datetime.utcnow().date()
    buckets = []

    for i in range(months_back):
        end_date = today - relativedelta(months=i)
        start_date = today - relativedelta(months=i+1)

        buckets.append((
            start_date.isoformat(),
            end_date.isoformat()
        ))

    return list(reversed(buckets))
