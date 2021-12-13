# Mohamed Assem's Backend Task

## About
This backend application built using Fastify, Typescript and Redis for caching
---

## Start
### Install packages `yarn`

### Run application `npm run dev`

### Swagger
`http://localhost:8000/docs`

---

## API's
---

### Get all blogs with pagination
`http://localhost:8000/blogs/?limit=10&offset=0`

**Accepts**: `limit` and `offset` as query string params

**Method**: GET

**Returnes**: Array of blogs objects and pagination data
```
{
    "docs": [
        {
            "_id": "61b574a3847cd9bf7741faa6",
            "title": "New One",
            "authorName": "Mo Assem",
            "mainImageURL": "https://media.istockphoto.com/photos/camel-and-the-pyramids-in-giza-picture-id1139238705?b=1&k=20&m=1139238705&s=170667a&w=0&h=xq2ykORROSwHdQyhtKEtHD6PSO4vTa197NRgOWZl2vk=",
            "body": "Egypt is very beautiful country",
            "createdAt": "2021-12-12T04:03:47.157Z",
            "updatedAt": "2021-12-12T04:03:47.157Z"
        },
        {
            "_id": "61b57507900328b5f340b649",
            "title": "Egypt is Great",
            "authorName": "Mo Assem",
            "mainImageURL": "https://media.istockphoto.com/photos/camel-and-the-pyramids-in-giza-picture-id1139238705?b=1&k=20&m=1139238705&s=170667a&w=0&h=xq2ykORROSwHdQyhtKEtHD6PSO4vTa197NRgOWZl2vk=",
            "body": "Egypt is a very beautiful country",
            "createdAt": "2021-12-12T04:05:27.703Z",
            "updatedAt": "2021-12-12T04:05:27.703Z"
        }
    ],
    "totalDocs": 2,
    "offset": 0,
    "limit": 5,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
}
```
---

### Get blog by ID
`http://localhost:8000/blogs/{BLOG_ID}`

**Accepts**: `blogId` as param

**Method**: GET

**Returnes**: blog object
```
{
    "_id": "61b57507900328b5f340b649",
    "title": "Egypt is Great",
    "authorName": "Mo Assem",
    "mainImageURL": "https://media.istockphoto.com/photos/camel-and-the-pyramids-in-giza-picture-id1139238705?b=1&k=20&m=1139238705&s=170667a&w=0&h=xq2ykORROSwHdQyhtKEtHD6PSO4vTa197NRgOWZl2vk=",
    "body": "Egypt is a very beautiful country",
    "createdAt": "2021-12-12T04:05:27.703Z",
    "updatedAt": "2021-12-12T04:05:27.703Z"
}
```
---

### Create New Blog
`http://localhost:8000/blogs`

**Accepts**: `blogObject` as body
```
{
  "title": "Egypt is Great fash5",
  "authorName": "Mo Assem",
  "mainImageURL": "https://media.istockphoto.com/photos/camel-and-the-pyramids-in-giza-picture-id1139238705?b=1&k=20&m=1139238705&s=170667a&w=0&h=xq2ykORROSwHdQyhtKEtHD6PSO4vTa197NRgOWZl2vk=",
  "body": "Egypt is a very beautiful country"
}
```

**Method**: POST

**Returnes**: Blog object
```
{
    "title": "Egypt is Great",
    "authorName": "Mo Assem",
    "mainImageURL": "https://media.istockphoto.com/photos/camel-and-the-pyramids-in-giza-picture-id1139238705?b=1&k=20&m=1139238705&s=170667a&w=0&h=xq2ykORROSwHdQyhtKEtHD6PSO4vTa197NRgOWZl2vk=",
    "body": "Egypt is a very beautiful country",
    "_id": "61b577e96f412f78b7ec30b8",
    "createdAt": "2021-12-12T04:17:45.490Z",
    "updatedAt": "2021-12-12T04:17:45.490Z",
    "__v": 0
}
```

### Get all Comments of Blog with pagination
`http://localhost:8000/comments/{BLOG_ID}?limit=10&offset=0`

**Accepts**: `limit` and `offset` as query string params

**Method**: GET

**Returnes**: Array of comments objects and pagination data
```
{
    "docs": [
        {
            "_id": "61b5752b900328b5f340b64c",
            "blogId": "61b57507900328b5f340b649",
            "authorName": "Mo",
            "body": "sdasdasd",
            "createdAt": "2021-12-12T04:06:03.978Z",
            "updatedAt": "2021-12-12T04:06:03.978Z"
        },
        {
            "_id": "61b575b56f412f78b7ec30b3",
            "blogId": "61b57507900328b5f340b649",
            "authorName": "Mo",
            "body": "yes it is",
            "createdAt": "2021-12-12T04:08:21.335Z",
            "updatedAt": "2021-12-12T04:08:21.335Z"
        }
    ],
    "totalDocs": 2,
    "offset": 0,
    "limit": 100,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
}
```


### Create New Comment for Blog
`http://localhost:8000/comments`

**Accepts**: `commentObject` as body
```
{
  "blogId": "61b57507900328b5f340b649",
  "authorName": "Mo",
  "body": "yes it is"
}
```

**Method**: POST

**Returnes**: Comment object
```
{
    "blogId": "61b57507900328b5f340b649",
    "authorName": "Mo",
    "body": "yes it is",
    "_id": "61b578bf6f412f78b7ec30ba",
    "createdAt": "2021-12-12T04:21:19.306Z",
    "updatedAt": "2021-12-12T04:21:19.306Z",
    "__v": 0
}
```