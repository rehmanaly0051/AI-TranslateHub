# Use an official Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy only the requirements file to leverage Docker caching
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend project to the container
COPY . /app/

# Expose port 8000 for Django
EXPOSE 8000

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Collect static files (if needed, you can skip this if you are not using static files)
RUN python manage.py collectstatic --noinput

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
