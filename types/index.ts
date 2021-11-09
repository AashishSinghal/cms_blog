// Types for PostCard Component
type IPost = {
  title: string;
  excerpt: string;
};

export interface IPostCard {
  post: IPost;
}

// Types for PostWidget Component
export interface IPostWidget {
  categories?: string[];
  slug?: string;
}

// Types for PostDetail Component
export interface IPostDetail {
  post: any;
}
// Types for Author Component
export interface IAuthor {
  author: any;
}
// Types for Comments Component
export interface IComments {
  slug: any;
}
// Types for CommentsForm Component
export interface ICommentsForm {
  slug: any;
}
