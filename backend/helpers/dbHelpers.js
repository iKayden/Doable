// It needs to be changed completely!

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjects = () => {
    const query = {
      text: 'SELECT * FROM projects',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };


  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (name, avatar, email, password) => {
    const query = {
      text: `INSERT INTO users (name, avatar, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, avatar, email, password]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  };

  return {
    getUsers,
    getProjects,
    getUserByEmail,
    addUser,
    getUsersPosts
  };
};
