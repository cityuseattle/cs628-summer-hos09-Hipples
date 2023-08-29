import { useState } from "react";
import { useNavigate } from "react-router";
 
const Create = () => {
  const navigate = useNavigate();
  const emptyForm = { name: "", position: "", level: "" }
  const [form, setForm] = useState({ emptyForm });
  // method to update the state properties
  const updateForm = (value) => setForm(
    (prev) => ({ ...prev, ...value})
  ); 
  // method to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    // when a POST request is sent to /create URL, we add a new record to the database
    const newPerson = { ...form }
    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson)
    }).catch((error) => window.alert(error));
    setForm({ emptyForm });
    navigate("/");
  } 
  // display the form that takes the input from the user
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" className="form-control" id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input 
            type="text" className="form-control" id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })} />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input" type="radio" name="positionOptions"
              id="positionIntern" value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })} />
            <label htmlFor="positionIntern" className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input" type="radio" name="positionOptions"
              id="positionJunior" value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })} />
            <label htmlFor="positionJunior" className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input" type="radio" name="positionOptions"
              id="positionSenior" value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })} />
            <label htmlFor="positionSenior" className="form-check-label">Senior</label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create person" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default Create;