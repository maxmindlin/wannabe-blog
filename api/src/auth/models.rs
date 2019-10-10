use diesel;
use diesel::prelude::*;

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

#[derive(Debug, Insertable)]
#[table_name="users"]
pub struct NewUser {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String, 
}