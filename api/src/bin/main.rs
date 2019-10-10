#![feature(proc_macro_hygiene, decl_macro)]
#![feature(plugin)]
use blog::posts;
use blog;

use rocket::*;
// use rocket_contrib::json::Json;

#[get("/")]
fn index() -> &'static str {
    "Greetings"
}

fn main() {
    rocket::ignite()
        .manage(blog::init_pool())
        .mount("/", routes![index])
        .mount("/posts", posts::handlers::routes())
        .launch();
}
