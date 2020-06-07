import { Request } from "express";
import PostV1Data from "../../data/postv1_data";
import PostDTO from "../../interfaces/post"

export namespace PostV1 {

    /**
     * Find Post by Post ID
     * @param  {} id
     * @returns PostDTO
     */
    function findById(id, includeResult = true) : PostDTO | Boolean {
        for(let post of PostV1Data) {
            if (post.id === id) {
                return includeResult ? post : true;
            }
        }
        return false;
    };

    function postNotFound(response, id) {
        return response.status(404).send({ message: `Post id ${id} not found.` });
    }

    /**
     * Fetch all Posts
     * 
     * @param  {any} request
     * @param  {any} response
     */
    export function all(request: any, response: any) {
        console.log(`[${request.method}] all Posts`);

        response.send({
            posts: PostV1Data
        });
    }
    
    /**
     * Get Post detail
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function detail(request: Request, response: any) {
        let id: number = parseInt(request.params.id, 10);
        let post = findById(id);
        
        console.log(`[${request.method}] detail of Post id: ${id}`);

        if (post === false) {
            return postNotFound(response, id);
        }

        response.send({
            data: post
        })
    }

    /**
     * Create a new Post
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function create(request: Request, response: any) {
        const body = request.body
        const id: number = parseInt(body.id, 10);
        const conflictedPost = findById(id, false);
        
        console.log(`[${request.method}] create a new Post.`);
        console.dir(body)
        console.log()

        // resource already exists | conflicted resource
        if (!!conflictedPost) {
            return response.status(409).send({
                message: `Post id ${id} is already exists.`
            });
        }

        response.status(201).send({
            posts: body
        })
    }

    /**
     * Update specific post fields
     * Request Method: PATCH -> update/modify the collection itself 
     * https://www.restapitutorial.com/lessons/httpmethods.html
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function updateField(request: Request, response: any) {
        let id: number = parseInt(request.params.id, 10);
        console.log(`[${request.method}] modifing Post fields`);

        // checking request body has data to modify resource collection itself.
        // works for both json and url encoded request body
        if (!(request.body && Object.keys(request.body).length)) {
            return response.status(422).send({
                message: `Unable to process operation with requested body.`
            }); 
        }

        let post = findById(id);
        
        if(post === false) {
            return postNotFound(response, id);
        }

        response.send({
            data: { ...post, ...request.body }
        });
    }

    /**
     * Update post
     * Request Method: PUT -> update/replace every resource in the entire collection. 
     * https://www.restapitutorial.com/lessons/httpmethods.html
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function update(request: Request, response: any) {
        let id: number = parseInt(request.params.id, 10);
        console.log(`[${request.method}] replacing Post fields`);
        const requiredFields = ["userId", "id", "title", "body"];

        // check request data keys in order to replace resource entire collection
        if (JSON.stringify(requiredFields) !== JSON.stringify(Object.keys(request.body))) {
            return response.status(422).send({
                message: `Operation terminated, use PATCH method to modify resource collection.`
            });
        }

        let post = findById(id);
        
        if(post === false) {
            return postNotFound(response, id);
        }

        response.send({
            data: {...post, ...request.body }
        });
    }
    
    /**
     * Remove post
     * 
     * @param  {Request} request
     * @param  {any} response
     */
    export function remove(request: Request, response: any) {
        let id: number = parseInt(request.params.id, 10);
        let post = findById(id);
        
        console.log(`[${request.method}] remove Post of id: ${id}`);
        
        if (post === false) {
            return postNotFound(response, id);
        }

        response.send({
            message: 'Post deleted successfully.'
        })
    }

}