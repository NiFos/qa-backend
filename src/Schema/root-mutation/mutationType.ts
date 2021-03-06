import { gql } from "apollo-server";

export const RootMutation = gql`
  type RootMutation {
    # Auth
    Login(data: LoginInput): String
    Reg(data: RegInput): String

    # Posting
    CreatePost(data: PostInput): String
    UpdatePost(data: PostInput): String
    DeletePost(id: String): String

    # Category
    CreateCategory(title: String, img: String): String

    # Comments
    CreateComment(data: CommentInput): String
    UpdateComment(data: CommentInput): String
    DeleteComment(id: String): String
    UpvoteComment(id: String, up: Boolean): String
  }
`;
