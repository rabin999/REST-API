import { Router, Request, Response } from "express";
import { PostV1 } from "../post/v1/post"
import { PostV2 } from "../post/v2/post";

const route = Router();
const v1route = Router();
const v2route = Router();

route.get("/posts", (request: Request, response: Response) => {
    response.send({
        "post.v1": "http://localhost:3000/v1/posts",
        "post.v2": "http://localhost:3000/v2/posts",
    });
});

// V1 Posts Routes
v1route.get("/v1/posts", PostV1.all);
v1route.get("/v1/posts/:id", PostV1.detail);
v1route.post("/v1/posts", PostV1.create);
v1route.patch("/v1/posts/:id", PostV1.updateField);
v1route.put("/v1/posts/:id", PostV1.update);
v1route.delete("/v1/posts/:id", PostV1.remove);

// V2 Posts Routes
v2route.get("/v2/posts", PostV2.all);
v1route.get("/v2/posts/:id", PostV2.detail);
v1route.patch("/v2/posts/:id", PostV2.updateField);
v1route.put("/v2/posts/:id", PostV2.update);
v1route.delete("/v2/posts/:id", PostV2.remove);

export default { route, v1route, v2route };