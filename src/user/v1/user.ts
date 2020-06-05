import { Request, Response } from "express";
import UserV1Data from "../../data/userv1_data";

export namespace UserV1 {

    export function users(request: Request, response: Response) {
        response.send({
            users: UserV1Data
        })
    }

}