// app/(actions)/createPost.ts
'use server'

import { prisma } from '../lib/prisma'
import { auth } from '../components/configurations/auth'

export async function createPost(
  content: string,
  desc?: string,
): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthenticated')

  await prisma.post.create({
    data: {
      userId: session.user.id,           
      content,
      desc: desc ?? content.slice(0, 255),
      published: false,
    },
  })
}
