# Django-React Translator Application

### Project Screenshots

![Directory Structure](image-2.png)
*Directpry Structure Example*

![Translation Interface](image.png)
*Main Translation Interface*

![Django Admin Interface](image-1.png)
*Django Admin Interface*

## Setup Instructions

### Backend Setup (Django)

1. Create a virtual environment:
```bash
python -m venv env
```

2. Activate the virtual environment:
- Windows:
```bash
.\env\Scripts\activate
```
- Linux/Mac:
```bash
source env/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Navigate to translator directory:
```bash
cd translator
```

5. Run Django server:
```bash
Also apply Migrations on that in worst case
if its not running 
python manage.py makemigrations
python manage.py migrate

Then run the server
python manage.py runserver
```
Server will run on `http://localhost:8000`

### Frontend Setup (React)

1. Open a new terminal and navigate to frontend directory:
```bash
cd translator/frontend
```

2. Install npm dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## Project Structure
```
Make a folder ```translator_project``` and then 
go to that directory and create env. and activate it 
and after activating it just create translator project 
using django .....

translator_project/
├── env/                 # Python virtual environment (separate)
├── translator/          # Django project folder
│   ├── manage.py
│   ├── translator/      # Django project configuration
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── api/            # Django app folder
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── urls.py
│       └── views.py
├── frontend/           # React/Next.js frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.js
└── requirements.txt    # Python dependencies

```

## Important Notes
- Keep both backend and frontend servers running simultaneously
- Backend API and Frontend must be running on different ports
- Make sure all dependencies are installed before running the servers