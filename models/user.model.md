# User Model 
## Table Name 
'users'

---

## Columns 
|Column Name | Data Type | Description|
|------------|--------------------|---------------------------|
|    id      |     uuid           | Primary Key               |
|    name    |     varchar(100)   | user full name            |
|    email   |     varchar(150)   | Primary Key               |
|    password|     text           | hashed password           |
|    role    |     varchar(20)    |  customer / owner / driver|
| created_at |     timestamp      | Account creation time     |

---

## Constraints 

- 'id' is PRIMARY KEY 
- 'email' is UNIQUE KEY 
- 'name', 'email, 'password', 'role' are NOT NULL
- 'role' must be one of ('customer', 'owner', 'driver')

---

## Relationships 

- One user can own many vehicles(one to many)
- one user i.e customer can book many trips(1-M)
- one user i.e driver can complete many trips

## Code 
create extension if not exists "uuid-ossp";
create table users(
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null unique,
  password text not null, 
  role text check (role in ('customer', 'owner', 'driver')) not null,
  created_at timestamp default now()
);