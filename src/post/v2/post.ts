import { Request, Response } from "express";
import PostV2Data from "../../data/postv2_data";

export namespace PostV2 {

    export function all(request: any, response: any) {
        console.log(`[get] all posts`);
        // response.set("Cache-Control", "public, max-age=3600");
        // response.set('Cache-Control', 'no-cache');
        response.send({
            posts: PostV2Data
        })
    }


    export function detail(request: Request, response: any) {
        let id: number = parseInt(request.params.id, 10);

        console.log(`[${request.method}] detail of post id: ${id}`);
        let foundPost = {};

        // finding post
        for(let post of PostV2Data) {
            if (post.id == id) {
                foundPost = post;
                break;
            }
        }

        response.send({
            posts: foundPost
        })
    }


    export function updateField(request: any, response: any) {
        console.log(`[patch] updating post field`);
        // response.set("Cache-Control", "public, max-age=3600");
        // response.set('Cache-Control', 'no-cache');
        response.send({
            posts: PostV2Data
        })
    }

    export function update(request: any, response: any) {
        const params = request.params;
        console.log(params)
        console.log(`[put] updating post`);
        // response.set("Cache-Control", "public, max-age=3600");
        // response.set('Cache-Control', 'no-cache');
        response.send({
            posts: PostV2Data
        })
    }

    export function remove(request: any, response: any) {
        const params = request.params;
        console.log(params)
        console.log(`[delete] remove post`);
        
        response.send({
            posts: PostV2Data
        })
    }

}

