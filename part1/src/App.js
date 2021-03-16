import "./styles.css";
import { Notes } from "./Notes.js";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((respone) => {
      const { data } = respone;
      setNotes(data);
    });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", noteToAddToState)
      .then((respone) => {
        const { data } = respone;
        setNotes((prevNotes) => prevNotes.concat(data));
      });

    setNewNote("");
  };

  return (
    <div>
      <h1>Notas</h1>
      <ul>
        {notes.map((note) => (
          <Notes key={note.id} {...note} />
        ))}
      </ul>

      <div>
        <input type="text" onChange={handleChange} value={newNote} />
        <button onClick={handleClick}>Crear nota</button>
      </div>
    </div>
  );
};

export default App;
