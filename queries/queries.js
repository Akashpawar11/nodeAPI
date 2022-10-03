const queries = {
    view_all: 'SELECT * FROM users',
    view_particular: 'SELECT * FROM users where id=?',
    post_user: "INSERT INTO users values (?,?,?,?,?) ",
    update_user: "UPDATE users SET name=?, email=?, contact=? ,role=? WHERE id=?",
    delete_user: 'DELETE FROM users WHERE id = ?',
    delete_all: 'DELETE FROM users'
}

module.exports = queries;