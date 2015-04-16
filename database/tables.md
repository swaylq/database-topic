## Tables

### users

| column name | type | description |
|-------------|------|-------------|
|  id  |  int   |  primary key  |
| name | varchar | user name |
| password | varchar | password hash |


### books

| column name | type | description |
|-------------|------|-------------|
|  id  |  int   |  primary key  |
| name | varchar | book name |
| author | varchar | author's name |
| price | decimal(8,2) | price |
| cover | varchar | cover of the book |
| intro | varchar | introduction |


### orders

| column name | type | description |
|-------------|------|-------------|
|  id  |  int   |  primary key  |
| assignee_name | varchar |  |
| assignee_address | varchar |  |
| created_at | time stamp | created time | 


### order_books

| column name | type | description |
|-------------|------|-------------|
|  id  |  int   |  primary key  |
| order_id | int | - |
| book_id | int | - |
| number | int | count of books |
| price | decimal(8,2) | price |