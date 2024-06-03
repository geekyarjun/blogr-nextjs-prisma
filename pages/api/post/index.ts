// import { getSession, getServerSession } from 'next-auth/react';
import { getServerSession } from "next-auth"
import prisma from '../../../lib/prisma';
import { options } from "../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;
  const session = await getServerSession(req, res,options);
  console.log('title, content',title, content, session?.user)
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}