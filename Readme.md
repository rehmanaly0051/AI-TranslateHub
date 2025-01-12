# Language Translator Web Application
Built with HTML, CSS, Tailwind CSS, Django REST Framework, and JavaScript

## Project Setup Instructions

### Frontend Setup

1. **Navigate to Frontend Directory**
    ```bash
    cd translator/frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Compile Tailwind CSS**
    ```bash
    npx tailwindcss -i ./asset/style.css -o ./dist/output.css --watch
    ```

4. **Start Development Server**
    - Install Live Server extension in VS Code
    - Right-click `index.html` and select "Open with Live Server"
    - Frontend will be available at `http://127.0.0.1:5500`

### Backend Setup

1. **Navigate to Project Root**
    ```bash
    cd translator
    ```

2. **Create Virtual Environment**
    ```bash
    python -m venv venv
    source venv/bin/activate  # For Linux/Mac
    venv\Scripts\activate     # For Windows
    ```

3. **Install Python Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4. **Run Migrations**
    ```bash
    python manage.py migrate
    ```

5. **Start Django Server**
    ```bash
    python manage.py runserver
    ```
    Backend will be available at `http://127.0.0.1:8000`

## Development Notes
- Ensure both frontend and backend servers are running simultaneously
- Frontend communicates with backend via REST API endpoints
- Real-time translation updates using JavaScript fetch API
- Responsive UI powered by Tailwind CSS