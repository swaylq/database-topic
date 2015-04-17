## PHP+MySQL

### User
| desc | method | URL | param | return |
|------|--------|-----|-------|--------|
| login | POST | /service/user/login | ['name', 'pwd'] | Response |
| logout | GET | /service/user/logout | - | Response |

### Book
| desc | method | URL | param | return |
|------|--------|-----|-------|--------|
| list | GET | /service/book/list | ['page', 'number'] | Response |
| detail | GET | /service/book/detail/{book_id} | - | Response |

### Order
| desc | method | URL | param | return |
|------|--------|-----|-------|--------|
| list | GET | /service/order/all | ['page', 'number'] | Response |
| detail | GET | /service/order/detail/{order_id} | - | Response |
| create | POST | /service/order/create | ['consignee_name', 'consignee_address', 'books'] | Response |
