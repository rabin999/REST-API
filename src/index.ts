import express, { Request, Response } from "express";
import compression from "compression";
import fs from "fs";

// Create Express Server
const app = express();

// Express Configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by');
// app.disable('etag')

// Enable Compression
app.use(compression());

/*
--------------
 Routes
--------------
*/
import PostRoutes from "./routes/posts"
import UserRoutes from "./routes/users"


app.get("/", (_: Request, response: Response) => {
    console.log("getting API root endpoints")
    response.send({
        "post": "http://localhost:3000/posts",
        "user": "http://localhost:3000/users",
    });
});

app.use("/", [
    PostRoutes.route,
    PostRoutes.v1route,
    PostRoutes.v2route,
    UserRoutes.route,
    UserRoutes.v1route,
    UserRoutes.v2route
]);

/* 
    HATEOAS implementation

    The system is effectively a finite state machine, and the response to each request contains 
    the information necessary to move from one state to another; no other information should be necessary.
*/
app.get("/hateoas", function (request: Request, response: Response) {
    response.send({
        "orderID": 3,
        "productID": 2,
        "quantity": 4,
        "orderValue": 16.60,
        "links": [
            {
                "rel": "customer",
                "href": "https://adventure-works.com/customers/3",
                "action": "GET",
                "types": ["text/xml", "application/json"]
            },
            {
                "rel": "customer",
                "href": "https://adventure-works.com/customers/3",
                "action": "PUT",
                "types": ["application/x-www-form-urlencoded"]
            },
            {
                "rel": "customer",
                "href": "https://adventure-works.com/customers/3",
                "action": "DELETE",
                "types": []
            },
            {
                "rel": "self",
                "href": "https://adventure-works.com/orders/3",
                "action": "GET",
                "types": ["text/xml", "application/json"]
            },
            {
                "rel": "self",
                "href": "https://adventure-works.com/orders/3",
                "action": "PUT",
                "types": ["application/x-www-form-urlencoded"]
            },
            {
                "rel": "self",
                "href": "https://adventure-works.com/orders/3",
                "action": "DELETE",
                "types": []
            }]
    });
});

// pagination and sorting implemenation 
app.get("/books", function (request: Request, response: Response) {
    response.send(request.query)
})

// partial response implemenation
const filePath: string = "/home/devrabin/Documents/code-research/rest-api/src/data/big-file.json"
const buffer = fs.readFileSync(filePath)
const totalFileSize: number = fs.statSync(filePath).size

app.get("/partial-response", function (request: Request, response: Response) {
    if (!request.headers.range) {
        response.status(416).end('Range header is not specified');
    }

    const range: string[] = request.headers.range.replace(/bytes=/, "").split("-");
    let [start, end]: Array<number> = range.map(data => Number(data));
    const chunksize = end - start;

    /* 
        Header Exaplanation
        Content Length = header gives the total size of resource
        Accept Range = indicates that the corresponding GET operation supports partial results.
        Range = header indicates the part of a document that the server should return

        // The first request fetches the first 2500 bytes by using the Range Header
        // A subsequent request from the client application can retrive the remainder of the resource.
    */
    response
        .set({
            'Content-Range': `bytes ${start}-${end}/${totalFileSize}`,
            'Accept-Ranges': "bytes",
            'Content-Length': chunksize,
            'Content-Type': "application/json; charset=utf-8"
        })
        .status(206)
        .end(buffer.slice(start, end));
})

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});