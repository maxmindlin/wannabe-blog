use diesel;
use diesel::prelude::*;

use crate::schema::posts;
use crate::schema::posts::dsl::*;

#[derive(Debug, Queryable, Serialize, Deserialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub published: bool,
    pub tags: Vec<String>,
}

impl Post {
    // Return all posts stored
    pub fn all(conn: &PgConnection) -> Vec<Post> {
        posts
            .select(
                (
                    id,
                    title,
                    content,
                    published,
                    tags
                )
            )
            .order(id.desc())
            .get_results::<Post>(conn)
            .expect("Error loading posts")
    }

    // Query for a single result by id
    pub fn find(post_id: i32, conn: &PgConnection) -> Post {
        posts.find(post_id)
            .select(
                (
                    id, 
                    title, 
                    content, 
                    published,
                    tags
                )
            )
            .first::<Post>(conn)
            .expect("Error loading post")
    }

    // Create a new unpublished post
    pub fn insert(post: NewPost, conn: &PgConnection) -> QueryResult<usize> {
        diesel::insert_into(posts::table)
            .values(&post)
            .execute(conn)
    }
}

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[table_name="posts"]
pub struct NewPost {
    pub user_id: i32,
    pub title: String,
    pub content: String,
    pub tags: Option<Vec<String>>
}