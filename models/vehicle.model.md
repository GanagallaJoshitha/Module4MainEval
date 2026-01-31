# Vehicle Model 
## Table Name 
'vehicles'

---

## Columns 
|Column Name  | Data Type | Description|
|-------------|--------------------|---------------------------|
|    id       |     uuid           | Primary Key               |
|   owner_id  |     uuid           | foreign key to users.id   |
| vehicle_name|     varchar(100)   | Vehicle Name              |
|vehicle_number|     varchar(50)   | Registration Number       |
|    capacity    |     integer     |  Load Capacity            |
| is_available |     boolean       | Availability              |
| created_at   |    timestamp      | When added                |
---

## Constraints 

- 'id' is PRIMARY KEY 
- 'owner_id' is FOREIGN KEY to users(id)
- 'vehicle_number' is UNIQUE
- 'is_available' default is TRUE

---

## Relationships 

- Many vehicles belong to one user(owner)
- one vehicle can be used in many trips.