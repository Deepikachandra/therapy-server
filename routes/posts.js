import express from 'express';
import Post from '../models/Post';
import { getPosts, savePosts, getPostsWithId, deletePostsWithId, updatePostsWithId,
  likePost} from '../controllers/posts.js'
const router = express.Router();

// GET BACK ALL POSTS
router.get('/', getPosts)

//SUBMIT A POST
router.post('/', savePosts)

//GET SPECIFIC POST
router.get('/:postId', getPostsWithId)

//DELETE A SPECIFIC POST
router.delete('/:postId', deletePostsWithId)

//UPDATE A SPECIFIC POST
router.patch('/:postId', updatePostsWithId)

router.patch('/:postId/likePost', likePost)

export default router;