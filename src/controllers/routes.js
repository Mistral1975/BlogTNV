

import likeNumbers from "./likeNumbers.js";


/******************************************** */

import checkAuthorizationMiddleware from "../middleware/checkAuthorizationMiddleware.js";
import idParamValidator from "../validators/idParamValidator.js";
import registerController from "./registerController.js";
import confirmController from "./confirmRegistrationController.js";
import loginController from "./loginController.js";
import addPost from "./addPost.js";
import updatePost from "./updatePost.js";
import removePost from "./removePost.js";
import getList from "./getList.js";
import getListByTags from "./getListByTags.js";
import registerUserValidator from "../validators/registerUserValidator.js";
import confirmValidator from "../validators/confirmRegistrationValidator.js";
import loginValidator from "../validators/loginValidator.js";
import addValidator from "../validators/addValidator.js";
import updateValidator from "../validators/updateValidator.js";
import tagsParamValidator from "../validators/tagsParamValidator.js";
import getPost from "./getPost.js";
import addComment from "./addComment.js";
import addCommentValidator from "../validators/addCommentValidator.js";
import idCommentValidator from "../validators/idCommentValidator.js";
import updateCommentsValidator from "../validators/updateCommentsValidator.js";
import updateComments from "./updateComments.js";
import removeComments from "./removeComments.js";
import getCommentsByPostId from "./getCommentsByPostId.js";


const setup = app => {

    app.get('/like', checkAuthorizationMiddleware, likeNumbers); //recuperare numero like
   


    
    /********** REGISTRAZIONE UTENTE **********/
    app.post('/user', registerUserValidator, registerController); // Registrazione utente
    app.get('/user/:id/confirm/:token', confirmValidator, confirmController); // Conferma registazione utente

    /********** LOGIN UTENTE **********/
    app.post('/login', loginValidator, loginController); //Login utente

    /********** POST **********/
    app.post('/posts', checkAuthorizationMiddleware, addValidator, addPost); //aggiungere post
    app.patch('/posts/:id', checkAuthorizationMiddleware, updateValidator, updatePost); //aggiorna i post
    app.delete('/posts/:id', checkAuthorizationMiddleware, idParamValidator, removePost); //cancellazione post
    app.get('/list', getList); //recuperare la lista di tutti i post del blog con i relativi commenti
    app.get('/posts/tags/:tags', tagsParamValidator, getListByTags);
    app.get('/:id', idParamValidator, getPost);

    /********** COMMENTI **********/
    app.post('/posts/:id/comments', checkAuthorizationMiddleware, addCommentValidator, addComment); //aggiungere commenti
    app.patch('/posts/:id/comments/:commentId', checkAuthorizationMiddleware, updateCommentsValidator, updateComments); //aggiorna i commenti
    app.delete('/posts/:id/comments/:commentId', checkAuthorizationMiddleware, idCommentValidator, removeComments); //cancellazione commenti
    app.get('/posts/:id/comments', idParamValidator, getCommentsByPostId); //recuperare lista commenti
    
    app.use((err, req, res, next) => {
        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                type: err.type,
                message: err.error.toString()
            })
        }
    })
}

export default setup;