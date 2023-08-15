# Tokplay

Tokplay adalah aplikasi web untuk memutar video menggunakan pemutar Youtube. Aplikasi ini menggunakan MERN stack dengan dukungan vite untuk frontend dan websocket untuk menampilkan komentar secara realtime.

# Cara menjalankannya

- Frontend

```
cd frontend
npm install
npm run dev
```

- Backend

```
cd backend
npm install
npm run dev
```

# Struktur database

|-tokplay <br/>
|---comments <br/>
|-----{ username, videoID, comment, timestamp }<br/>
|---products <br/>
|-----{ productID, videoID, linkProduct, title, price }<br/>
|---videothumbnails <br/>
|-----{ videoID, urlImageThumbnail }<br/>
