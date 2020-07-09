# tyba-test-nodejs

# Docker configuration

```
docker-compose build api
docker-compose up
```

### **END POINTS OF API**

1. http://localhost:3000/login
2. http://localhost:3000/signup
3. http://localhost:3000/transaction

### **PAYLOAD END POINTS**

`End point:` _http://localhost:3000/login_

`Method:` **POST**

`Payload:`

```json
{
  "email": "admin@rdcr.com",
  "password": "prueba123"
}
```

---

`End point:` _http://localhost:3000/signup_

`Method:` **POST**

`Payload:`

```json
{
  "email": "admin@rdcr.com",
  "password": "prueba123",
  "name": "Rubén Carrascal"
}
```

---

`End point:` _http://localhost:3000/transaction_

`Method:` **POST**

`Headers:` **token**

`Payload:`

```json
{
  "lat": "12.91285",
  "lng": "100.87808"
}
```

---

`End point:` _http://localhost:3000/transaction_

`Method:` **GET**

`Headers:` **token**

Hecho con ❤️ por [Rubén Carrascal](https://krrskl.github.io/)
