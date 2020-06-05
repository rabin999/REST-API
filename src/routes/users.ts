import { Router, Request, Response } from "express";
import { UserV1 } from "../user/v1/user"
import { UserV2 } from "../user/v2/user"

const route = Router();
const v1route = Router();
const v2route = Router();

route.get("/users", (request: Request, response: Response) => {
    response.send({
        "user.v1": "http://localhost:3000/v1/users",
        "user.v2": "http://localhost:3000/v2/users",
    });
});

// V1 Users Routes
v1route.get("/v1/users", UserV1.users);

// V2 Users Routes
v2route.get("/v2/users", UserV2.users);

export default {
    route, v1route, v2route
}