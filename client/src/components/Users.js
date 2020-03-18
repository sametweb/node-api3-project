import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  console.log(users);

  return users.map(user => (
    <React.Fragment key={user.id}>
      <Link to={`/${user.id}`}>
        <h1>{user.name}</h1>
      </Link>
      <div>
        {Number(props.match.params.id) === user.id ? (
          <UserPosts id={user.id} />
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  ));
};

const UserPosts = ({ id }) => {
  const [userPosts, setUsersPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}/posts`)
      .then(res => setUsersPosts(res.data));
  }, []);
  return userPosts.map(post => <h5>{post.text}</h5>);
};

export default Users;
