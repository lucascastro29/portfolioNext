import fs from "fs"
import { join } from "path"
import type { Post } from "../../models/post"

const postDirectory = join(process.cwd(), "_posts")

type authorInput = {
    name: string
    picture:  string
}
export type CreatePostInput = {
    title: string
    slug: string
    date: string
    coverImage: string
    excerpt: string
    author:authorInput
    ogImageUrl: string
    content: string
    preview?: boolean
}