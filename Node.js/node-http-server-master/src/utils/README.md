# Node.js HTTP Server

This repository shows how to create a Node.js HTTP from Scrath, implementing basic routing but trying to get the necessary functionality to show how this type of application works under the hood.

## Requirements:

Node.js 18.16.x or greater.

## Running the server

To run the application in production mode you can use the next command:

```bash
npm run start
```

To run the application in development mode you can use the next command:

```bash
npm run start:dev
```

Note: The application in development mode use the Node.js native watch feature to reload the application after file changes.

enpoints

(/users)✅
GET /users

request example:
GET /users
response example:
Status: 200 OK
Content-Type: application/json
[
{
"id": 1,
"first_name": "Elton",
"last_name": "Avard",
"email": "eavard0@themeforest.net",
"gender": "Male"
},
{
"id": 2,
"first_name": "Vera",
"last_name": "Khomich",
"email": "vkhomich1@smh.com.au",
"gender": "Female"
}
]
GET /users/:id ✅

Parameters:
id (num) - user's id.
Exempel request:
GET /users/2
Response request:
Status: 200 OK
Content-Type: application/json
{
"id": 2,
"first_name": "Vera",
"last_name": "Khomich",
"email": "vkhomich1@smh.com.au",
"gender": "Female"
}

POST /users ✅
Create new user
Parameters:
{
"first_name":
"last_name":
"email":
"gender":
}

request exempel:
POST /users
{
"first_name": "Viktoria",
"last_name": "Lyaskovets",
"email": "lyaska@example.com",
"gender": "Female"
}

respond exempel:
Status: 201 Created
Content-Type: application/json
{
"id": 22,
"first_name": "Viktoria",
"last_name": "Lyaskovets",
"email": "lyaska@example.com",
"gender": "Female"
}

PATCH /users/:id ✅
Update information by users id.

parameters:
id (num) - users id.
Body request:

{
"first_name":
"last_name":
"email":
"gender":
}
Request example:
PATCH /users/3
{
"first_name": "Leonid",
"gender": "Male"
}

Respons example:
Status: 200 OK
Content-Type: application/json
{
"id": 3,
"first_name": "Leonid",
"last_name": "Bellspel",
"email": "tratattata@boston.com",
"gender": "Male"
}

DELETE /users/:id ✅
Delete user by id

Parameters:
id (num) - User's id.

Request example:
DELETE /users/22

Response example:
Status: 200 OK
Content-Type: application/json
{
"id": 22,
"first_name": "Alena",
"last_name": "Ismailova",
"email": "aleisma@example.com",
"gender": "Female"
}

Posts enpoints (/posts)
GET /posts ✅

Response exempel:
Status: 200 OK
Content-Type: application/json
[
{
"post_id": 1,
"user_id": 1,
"post_text": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
"post_date": "2/6/2021",
"likes": 98810,
"comments": 9696,
"hashtags": "#followme",
"location": "Fanhu",
"post_image": "https://robohash.org/rerumautea.png?size=50x50&set=set1"
},
{
"post_id": 2,
"user_id": 2,
"post_text": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
"post_date": "8/6/2021",
"likes": 99317,
"comments": 9730,
"hashtags": "#picoftheday",
"location": "Xinbu",
"post_image": "https://robohash.org/repellatsedquam.png?size=50x50&set=set1"
}
]
GET /posts/:id ✅

Parameters:
id (num) - Post's id.
Request exampel:

GET /posts/2
Respond exampel:
Status: 200 OK
Content-Type: application/json
{
"post_id": 2,
"user_id": 2,
"post_text": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
"post_date": "8/6/2021",
"likes": 99317,
"comments": 9730,
"hashtags": "#picoftheday",
"location": "Xinbu",
"post_image": "https://robohash.org/repellatsedquam.png?size=50x50&set=set1"
}

POST /posts ✅
Create new post

Request body:
{
"user_id":
"post_text":
"post_date":
"likes":
"comments":
"hashtags":
"location":
"post_image":
}

Exempel request:
POST /posts
Content-Type: application/json
{
"user_id": 1,
"post_text": "Det finns en viktig information här.",
"post_date": "16/06/2023",
"likes": 5,
"comments": 3,
"hashtags": "#info",
"location": "Örebro",
"post_image": "https://content.r9cdn.net/rimg/dimg/74/65/15f677a7-city-46875-1731292d141.jpg?crop=true&width=1366&height=768&xhint=1211&yhint=773"
}

response exempel:
Status: 201 Created
Content-Type: application/json
{
"post_id": 21,
"user_id": 1,
"post_text": "Det finns en viktig information här.",
"post_date": "16/06/2023",
"likes": 5,
"comments": 3,
"hashtags": "#info",
"location": "Örebro",
"post_image": "https://content.r9cdn.net/rimg/dimg/74/65/15f677a7-city-46875-1731292d141.jpg?crop=true&width=1366&height=768&xhint=1211&yhint=773"
}

PATCH /posts/:id
Update post's information by post's id.

Parameters:
id (num) - Posts id.
Body request:

{

    "user_id":
    "post_text":
    "post_date":
    "likes":
    "comments":
    "hashtags":
    "location":
    "post_image":

}

Request example:
PATCH /posts/18
{
"post_text": "Now here is another text.",
"post_date": "6/16/2023"
}

Response example:
Status: 200 OK
Content-Type: application/json
{
"post_id": 18,
"user_id": 18,
"post_text": "Now here is another text.",
"post_date": "6/16/2023",
"likes": 77125,
"comments": 2767,
"hashtags": "#instagood",
"location": "Knurów",
"post_image": "https://robohash.org/nobisrerumvelit.png?size=50x50&set=set1"
}

DELETE /posts/:id ✅
Remove post by id

Parameters:
id (num) - Post's id.
Example request:
DELETE /posts/22

Example response:
Status: 200 OK
Content-Type: application/json
{
"post_id": 22,
"user_id": 18,
"post_text": "Некоторые умные мысли.",
"post_date": "16/06/2023",
"likes": 4,
"comments": 1,
"hashtags": "#russian",
"location": "Pskov",
"post_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/3_string_prim_balalaika.png/800px-3_string_prim_balalaika.png"
}
