# Database structure

|-tokplay <br/>
|---comments <br/>
|-----{ username, videoID, comment, timestamp }<br/>
|---products <br/>
|-----{ productID, videoID, linkProduct, title, price }<br/>
|---videothumbnails <br/>
|-----{ videoID, urlImageThumbnail }<br/>

===================================================

# API Structure

base_uri : localhost:3000 <br/>
base_api : {base_uri}/api <br/>

Add videoThumbnail : {base_api}/videoThumbnails <br/>
Show videoThumbnails : {base_api}/videoThumbnails <br/>

Add product : {base_api}/products <br/>
Show All products : {base_api}/products <br/>
Show product (id) : {base_api}/products/:videoID <br/>

Add comment : {base_api}/comments/submitComment/:videoID <br/>
Show all comments : {base_api}/comments <br/>
Show comment (id) : {base_api}/comments/:videoID <br/>

===================================================

#VideoThumbnails

- Videothumbnail object

```
{
  videoID: string,
  urlImageThumbnail: string,
}
```

## **GET /videoThumbnails**

Returns all videoThumbnails in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  videoThumbnails: [
           {<videoThumbnails_object>},
           {<videoThumbnails_object>},
           {<videoThumbnails_object>}
         ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "VideoThumbnails doesn't exist" }`

## **POST /videoThumbnails**

Creates a new videoThumbnails and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
  {
    urlImageThumbnail: string
  }
```

- **Success Response:**
- **Code:** 201  
  **Content:** `{ <videoThumbnails_object> }`
- **Error Response:**
  - **Code:** 403  
    **Content:** `{ error : "Failed add videoThumbnails" }`

---

#Products

- Products object

```
{
  productID: string
  videoID: string,
  linkProduct: string,
  title: string,
  price: integer,
}
```

## **GET /products**

Returns all products in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  products: [
           {<products_object>},
           {<products_object>},
           {<products_object>}
         ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "products doesn't exist" }`

## **GET /products/:videoID**

Returns the specified products.

- **URL Params**  
  _Required:_ `videoID=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <products_object> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "products doesn't exist" }`

## **POST /products**

Creates a new products and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
  {
		videoID: string,
		linkProduct: string,
		title: string,
		price: integer

  }
```

- **Success Response:**
- **Code:** 201  
  **Content:** `{ <products_object> }`
- **Error Response:**
  - **Code:** 403  
    **Content:** `{ error : "Failed add products" }`

---

#Comments

- Comments object

```
{
  username: string
  videoID: string,
  comment: string,
  timestamp: date,
}
```

## **GET /comments**

Returns all comments in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  comments: [
           {<comments_object>},
           {<comments_object>},
           {<comments_object>}
         ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "Comments doesn't exist" }`

## **GET /comments/:videoID**

Returns the specified comments.

- **URL Params**  
  _Required:_ `videoID=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <comments_object> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "Comments doesn't exist" }`

## **POST /submitComment/:videoID**

Creates a new comments and returns the new object.

- **URL Params**  
  _Required:_ `videoID=[string]`
- **Headers**  
  Content-Type: application/json
- **Data Params**

```
  {
    username: string
    videoID: string,
    comment: string,
  }
```

- **Success Response:**
- **Code:** 201  
  **Content:** `{ message: "Create comment has successfully" }`
- **Error Response:**
  - **Code:** 403  
    **Content:** `{ error : "Failed add comments" }`

===================================================

Restore database :

- mongorestore dump/

Run project :

- npm install
- npm run dev

nb : This command will run code "nodemon index.js"
