import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
  
const Edit = () => {
  const emptyForm = { name: "", position: "", level: "", records: [] }
  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({ emptyForm });
  
  useEffect(() => {
    const fetchData = async () => {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/record/${id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
      }
      const record = await response.json();
      if (!record) { 
        window.alert(`Record with id ${id} not found.`); 
        navigate("/"); 
      }
      setForm(record);
    } 
    fetchData();
  }, [params.id, navigate]);
  
  // methods to update the state properties
  const updateForm = (value) => setForm((prev) => ({ ...prev, ...value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    const editedPerson = { name: form.name, position: form.position, level: form.level }
    // send a POST request to update the data in the database
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: { 'Content-Type': 'application/json' },
    });  
    navigate("/");
  }  
  // display the form that takes input from the user to update the data
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text" className="form-control" id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position: </label>
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
        <br />  
        <div className="form-group">
          <input type="submit" value="Update Record" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default Edit;