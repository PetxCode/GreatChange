import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [post, setPost] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:2233");
    if (res) {
      setPost(res.data.data);
      // console.log(res.data.data);
    }
  };

  const postData = async () => {
    const data = { name, description };

    await axios.post("http://localhost:2233", data);
  };

  useEffect(() => {
    fetchData();

    const socket = io("http://localhost:2233");
    socket.on("newPost", (newData) => {
      setPost([...post, newData]);
      console.log("This is the Post: ", post);
    });
    console.log("This is the Post2: ", post);
  }, []);
  return (
    <div>
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Name"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          onClick={() => {
            postData();
            console.log(name, description);
          }}
        >
          Created
        </button>
      </div>
      <div>
        <div>Reading...</div>
      </div>
      <div>
        {post.map(({ name, description, _id }) => (
          <div key={_id}>
            <div>{name}</div>
            <div>{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
