table! {
    posts (id) {
        id -> Int4,
        user_id -> Int4,
        title -> Varchar,
        content -> Text,
        published -> Bool,
        tags -> Nullable<Array<Text>>,
    }
}

table! {
    users (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(
    posts,
    users,
);
