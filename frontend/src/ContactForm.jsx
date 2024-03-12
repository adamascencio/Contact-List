import { useState } from "react";
import propTypes from "prop-types";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length > 0;
 
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { firstName, lastName, email };
    const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    const res = await fetch(url, options);

    if (res.status !== 201 && res.status !== 200) {
      const data = await res.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input 
          type="text" 
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="text" 
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  )
}

ContactForm.propTypes = {
  existingContact: propTypes.object,
  updateCallback: propTypes.func.isRequired
}

export default ContactForm;