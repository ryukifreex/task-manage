FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . .
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# for develop
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# for production
# CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.:8000"]
