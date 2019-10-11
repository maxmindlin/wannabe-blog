// Houses routes under the `/posts` namespace

use rocket::*;
use rocket_contrib::json::{Json, JsonValue};

use crate::posts::models::{NewPost, Post};
use crate::DbConn;

#[get("/")]
fn all(conn: DbConn) -> Json<Vec<Post>> {
    Json(Post::all(&conn))
}

#[get("/show/<post_id>")]
fn show(post_id: i32, conn: DbConn) -> Json<Post> {
    Json(Post::find(post_id, &conn))
}

#[post("/new", format = "application/json", data = "<body>")]
fn new(body: Json<NewPost>, conn: DbConn) -> JsonValue {
    Post::insert(body.into_inner(), &conn).expect("Error creating post");
    json!({ "status": "OK" })
}

pub fn routes() -> Vec<rocket::Route> {
    routes![all, show, new]
}
