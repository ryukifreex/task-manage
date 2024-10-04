import os
import time
import psycopg2


def wait_for_db():
    while True:
        try:
            connection = psycopg2.connect(
                dbname=os.getenv("DB_NAME", "postgres"),
                user=os.getenv("DB_USER", "postgres"),
                password=os.getenv("DB_PASSWORD", "postgres"),
                host=os.getenv("DB_HOST", "db"),
                port=os.getenv("DB_PORT", "5432"),
            )
            connection.close()
            break
        except Exception as e:
            print(f"Database not ready yet: {e}")
            time.sleep(2)


if __name__ == "__main__":
    wait_for_db()
