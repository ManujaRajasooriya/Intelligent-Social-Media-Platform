// import mongoose from 'mongoose';
// // import { children } from 'react';
// import { boolean } from 'zod';

// const threadSchema = new mongoose.Schema({
//     text: {type: String, required: true},
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     community:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Community'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }, 
//     parentId: {
//         type: String,
//     },
//     children: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Thread'
//     }
// ],
// });

// const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

// export default Thread;

import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;