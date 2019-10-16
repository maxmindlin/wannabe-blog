use diesel;
use diesel::prelude::*;
// use std::collections::hash_map::DefaultHasher;
// use std::hash::{Hash, Hasher};

use crate::schema::users;
use crate::schema::users::dsl::*;

#[derive(Debug, Queryable, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String, 
}

impl User {
    pub fn fetch_by_user_pass(email_: &str, pass_: &str, conn: &PgConnection) -> Option<User> {
        let res = users
            .filter(email.eq(email_))
            .filter(password.eq(pass_))
            .order(id.desc())
            .first::<User>(conn);
        match res {
            Ok(user) => Some(user),
            Err(_) => None
        }
    }
}

#[derive(Debug, Insertable)]
#[table_name="users"]
pub struct NewUser {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String, 
}
