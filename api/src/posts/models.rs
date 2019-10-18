use diesel;
use diesel::prelude::*;
use diesel::dsl;
use chrono;
use chrono::prelude::*;

use crate::schema::posts;
use crate::schema::posts::dsl::*;

#[derive(Debug, AsChangeset, Queryable, Serialize, Deserialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub published: bool,
    pub date_published: Option<NaiveDateTime>,
    pub tags: Vec<String>,
    pub preview: String
}

impl Post {
    // Return all recent published posts
    pub fn all(conn: &PgConnection) -> Vec<Post> {
        posts
            .select((id, title, content, published, date_published, tags, preview))
            .filter(published.eq(true))
            .order(date_published.desc())
            .limit(4)
            .get_results::<Post>(conn)
            .expect("Error loading posts")
    }

    // Query for a single result by id
    pub fn find(post_id: i32, conn: &PgConnection) -> Post {
        posts
            .find(post_id)
            .select((id, title, content, published, date_published, tags, preview))
            .first::<Post>(conn)
            .expect("Error loading post")
    }

    // Query for all posts with a given array of tags
    pub fn find_tag(target_tags: Vec<String>, conn: &PgConnection) -> Vec<Post> {
        posts
            .select((id, title, content, published, date_published, tags, preview))
            .filter(tags.contains(target_tags))
            .order(id.desc())
            .get_results::<Post>(conn)
            .expect("Error finding posts")
    }

    // Create a new unpublished post
    pub fn insert(post: NewPost, conn: &PgConnection) -> QueryResult<usize> {
        diesel::insert_into(posts::table)
            .values(&post)
            .execute(conn)
    }

    // Update an existing post
    pub fn update(post: Post, conn: &PgConnection) -> QueryResult<usize> {
        diesel::update(posts.find(post.id))
            .set(&post)
            .execute(conn)
    }

    // Set a post to published status
    pub fn publish(post_id: i32, conn: &PgConnection) -> QueryResult<usize> {
        diesel::update(posts.find(post_id))
            .set((
                posts::published.eq(true),
                posts::date_published.eq(dsl::now),
            ))
            .execute(conn)
    }
}

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[table_name = "posts"]
pub struct NewPost {
    pub user_id: i32,
    pub title: String,
    pub content: String,
    pub tags: Option<Vec<String>>,
    pub preview: String
}
