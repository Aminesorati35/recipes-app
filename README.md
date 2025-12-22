# Recipe App (Laravel + React)

A full-stack Recipe App with **Laravel backend** and **React frontend**.  

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

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
cd backend
composer install
cp .env.example .env

```
### 2. Update .env with your database info:
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=recipe_app
  DB_USERNAME=root
  DB_PASSWORD=YOUR_DB_PASSWORD

### 3. Update .env with your database info:
```bash
php artisan key:generate
