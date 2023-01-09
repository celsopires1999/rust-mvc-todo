use super::db::Db;

// region:      Todo Types
#[derive(sqlx::FromRow, Debug, Clone)]
pub struct Todo {
    pub id: i64,  // match bigint in the database
    pub cid: i64, // creator id
    pub title: String,
}
// endregion:   Todo Types

// region:       TodoMac
pub struct TodoMac;
impl TodoMac {
    pub async fn list(db: &Db) -> Result<Vec<Todo>, sqlx::Error> {
        let sql = "SELECT id, cid, title FROM todo ORDER BY id DESC";

        // build the sqlx-query
        let query = sqlx::query_as(&sql);
        // execute the query
        let todos = query.fetch_all(db).await?;

        Ok(todos)
    }
}
// endregion:   TodoMac

#[cfg(test)]
#[path = "../__tests__/model_todo.rs"]
mod tests;