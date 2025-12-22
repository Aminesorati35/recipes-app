# Recipe App (Laravel + React)

A full-stack Recipe App with **Laravel backend** and **React frontend**.  

## Internet connection is required to install dependencies and run the project 
---

## Technologies Used

- **Frontend:** React, Tailwind CSS  
- **Backend:** Laravel 10, PHP 8.2  
- **Database:** MySQL  

---

## Prerequisites

- [PHP 8+](https://www.php.net/downloads)  
- [Composer](https://getcomposer.org/)  
- [Node.js + npm](https://nodejs.org/en/download/)  
- [MySQL](https://dev.mysql.com/downloads/)

---

# Getting Started
## Please Make Sure Internet Is Wokinr



### 1. Clone the repository


    git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
    cd YOUR_REPO

## Backend Laravel

### 1. Laravel Configuration
    
    cd backend
    composer install
    cp .env.example .env


### 2. Copy .env.example to .env and configure the database:
    cp .env.example .env

### 3. Update .env with your database info:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=recipe_app
    DB_USERNAME=root
    DB_PASSWORD=YOUR_DB_PASSWORD

### 4. Update .env with your database info:

    php artisan key:generate

### 5. Run migrations:

    php artisan migrate

### 6. Storage Link:

    php artisan storage:link

### 7. Start the backend server:
    
    php artisan serve


## Frontend React

### 1. Open a new terminal and go to the frontend folder:
    
    cd frontend

### 2. Install dependencies:

    npm install

### 3. Start the React development server:
    npm run dev



## Project Overview

This project is a **full-stack Recipe App** built with **Laravel** for the backend and **React** for the frontend. It allows users to browse recipes, filter by categories, and view detailed recipe information. Admins can manage recipes and categories via a dashboard.  

### Features:

#### 1. Recipes
- Each recipe contains:
  - Ingredients
  - Steps / instructions
  - Additional information (preparation time, servings, etc.)
- Recipes can be filtered by **category**.  
- Users can click on any recipe to view the **single recipe page** with all details.  
- There is a **View Recipes** button in the hero section that takes users to a page listing all recipes with filters.

#### 2. Categories
- Each recipe belongs to a category.  
- Users can filter recipes by category to quickly find relevant recipes.  

#### 3. Admin Dashboard
- Accessible via a **link in the footer** of the main site (Admin button).  
- Admins can:
  - **Add new recipes**  
  - **Edit existing recipes**  
  - **Delete recipes**  
  - **Add, edit, and delete categories**  
- The dashboard is built to manage all data securely.  

#### 4. Security
- Laravel **Sanctum** is used for authentication and security.  
- Admin actions require login

#### 5. How it Works
1. **User Interaction**:
   - Users visit the homepage and see featured recipes.
   - Use the **View Recipes** button to see all recipes and apply category filters.
   - Click on any recipe to view full details.
2. **Admin Interaction**:
   - Scroll to the footer and click the **Admin Dashboard link**.
   - Login with admin credentials to access the dashboard.
   - From the dashboard, admins can add, edit, or delete recipes and categories.
3. **Data Flow**:
   - React frontend communicates with the Laravel backend API.
   - Backend handles CRUD operations and stores data in **MySQL**.
   - Uploaded images and recipe information are served to the frontend automatically.

This setup ensures that **all recipes, categories, and images you added are immediately available** in the frontend without needing additional insertions.
