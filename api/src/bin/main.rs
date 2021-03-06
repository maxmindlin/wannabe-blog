#![feature(proc_macro_hygiene, decl_macro)]
#![feature(plugin)]
use blog;
use blog::posts;
use blog::auth;

use rocket::*;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::{Header, ContentType, Method};
use std::io::Cursor;

pub struct CORS();

impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to requests",
            kind: Kind::Response
        }
    }

    fn on_response(&self, request: &Request, response: &mut Response) {
        if request.method() == Method::Options || response.content_type() == Some(ContentType::JSON) {
            response.set_header(Header::new("Access-Control-Allow-Origin", "http://localhost:8080"));
            response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, OPTIONS"));
            response.set_header(Header::new("Access-Control-Allow-Headers", "Content-Type"));
            response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
        }

        if request.method() == Method::Options {
            response.set_header(ContentType::Plain);
            response.set_sized_body(Cursor::new(""));
        }
    }
}

#[get("/")]
fn index() -> &'static str {
    "Greetings"
}

fn main() {
    rocket::ignite()
        .attach(CORS())
        .manage(blog::init_pool())
        .mount("/", routes![index])
        .mount("/posts", posts::handlers::routes())
        .mount("/auth", auth::handlers::routes())
        .launch();
}
