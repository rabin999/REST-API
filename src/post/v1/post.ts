import { Request } from "express";
import PostV1Data from "../../data/postv1_data";

export namespace PostV1 {
    
    /**
     * Fetch all posts
     * 
     * @param  {any} request
     * @param  {any} response
     */
    export function all(request: any, response: any) {
        console.log(`[get] all posts`);
        response.send({
            posts: PostV1Data
        })
    }

    /**
     * Get post detail
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function detail(request: Request, response: any) {
        let id: number = parseInt(request.params.id, 10);
        let foundPost = {};
        
        console.log(`[${request.method}] detail of post id: ${id}`);
        
        for(let post of PostV1Data) {
            if (post.id == id) {
                foundPost = post;
                break;
            }
        }

        response.send({
            posts: foundPost
        })
    }

    /**
     * Create a new post
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function create(request: Request, response: any) {
        const body = request.body

        console.log(`[${request.method}] create a new post`);
        response.status(201).send({
            posts: body
        })
    }

    /**
     * Update specific post fields
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function updateField(request: Request, response: any) {
        console.log(`[patch] updating post field`);
        response.send({
            posts: PostV1Data
        })
    }

    /**
     * Update post
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function update(request: Request, response: any) {
        const params = request.params;
        console.log(params)
        console.log(`[put] updating post`);
        response.send({
            posts: PostV1Data
        })
    }
    
    /**
     * Remove post
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function remove(request: Request, response: any) {
        const params = request.params;
        console.log(params)
        console.log(`[delete] remove post`);
        response.send({
            posts: PostV1Data
        })
    }

}