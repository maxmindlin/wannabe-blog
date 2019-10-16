// Houses routes under the `/posts` namespace

use rocket::*;
use rocket_contrib::json::{Json, JsonValue};

use crate::posts::models::{NewPost, Post};
use crate::auth::ApiKey;
use crate::DbConn;

#[get("/")]
fn all(conn: DbConn) -> Json<Vec<Post>> {
    Json(Post::all(&conn))
}

#[get("/<tag>", rank = 2)]
fn fetch_tags(tag: String, conn: DbConn) -> Json<Vec<Post>> {
    Json(Post::find_tag(vec![tag], &conn))
}

#[get("/<post_id>", rank = 1)]
fn fetch(post_id: i32, conn: DbConn) -> Json<Post> {
    Json(Post::find(post_id, &conn))
}

#[post("/new", format = "application/json", data = "<body>", rank = 1)]
fn new(body: Json<NewPost>, _key: ApiKey, conn: DbConn) -> JsonValue {
    Post::insert(body.into_inner(), &conn).expect("Error creating post");
    json!({ "status": "OK" })
}

#[post("/new", format = "application/json", rank = 2)]
fn new_unauth() -> JsonValue {
    json!({ "status": "failure", "message": "unauthorized"})
}

#[patch("/update", format = "application/json", data = "<body>")]
fn update(body: Json<Post>, conn: DbConn) -> JsonValue {
    Post::update(body.into_inner(), &conn).expect("Error updating post");
    json!({ "status": "OK" })
}

#[patch("/publish/<post_id>")]
fn publish(post_id: i32, conn: DbConn) -> JsonValue {
    Post::publish(post_id, &conn).expect("Error publishing post");
    json!({ "status": "OK" })
}

pub fn routes() -> Vec<rocket::Route> {
    routes![all, fetch_tags, fetch, new, new_unauth, update, publish]
}
