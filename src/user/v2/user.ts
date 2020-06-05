import { Request, Response } from "express";
import UserV2Data from "../../data/userv2_data";

export namespace UserV2 {

    export function users(request: Request, response: Response) {
        response.send({
            users: UserV2Data
        })
    }

}