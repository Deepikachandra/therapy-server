import { Mongoose } from 'mongoose';
import Post from '../models/Post';

export const getPosts = async (req,res)=>{
  try{
    const getPosts = await Post.find();
    res.status(200).json(getPosts)
  }catch(err){
    res.status(404).json({message:err});
  }
}

export const  savePosts = async (req,res)=>{
  const post = new Post({
    creator: req.body.creator,
    title: req.body.title,
    message: req.body.message,
    tags: req.body.tags,
    selectedFile: req.body.selectedFile
  });

  try{
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  }catch(err){
    res.status(409).json({message:err});
  }
}

export const getPostsWithId = async (req,res) => {
  try{
  const post = await Post.findById(req.params.postId);
  res.json(post);
  }catch(err){
    res.json({message:err});
  }
}

export const deletePostsWithId = async (req,res) => {
  try{
    const removedPost = await Post.deleteOne({_id: req.params.postId })
    //const removedPost = await Post.findByIdAndDelete({_id: req.params.postId })
  res.json(removedPost)
  }catch(err){
    res.json({message:err});
  }
}

export const updatePostsWithId = async (req,res) => {
  const { postId: _id } = req.params;
  const post = req.body;

  //if(!Mongoose.Types.ObjectId.isValid(_id)) return res.send(404).send('No post with that id');
  try{
  // const updatedPost = await Post.updateOne(
  //   {_id: req.params.postId}, 
  //   {$set: post}
  //   )

    const updatedPost = await Post.findByIdAndUpdate(_id,post, { new: true });
  res.json(updatedPost)
  }catch(err){
    res.json({message:err});
  }
}

export const likePost = async (req,res) => {
  const { postId: _id } = req.params;
  //if(!Mongoose.Types.ObjectId.isValid(_id)) return res.send(404).send('No post with that id');
   try{
    const post = await Post.findById(req.params.postId);
    const updatedPost = await Post.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, { new: true });
  res.json(updatedPost);
  }catch(err){
    res.json({message:err});
  }
}
