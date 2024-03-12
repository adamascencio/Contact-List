import { ContactType } from "./types/ContactType";
import PropTypes from 'prop-types';

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const deleteContact = async(contact) => {
    const url = `http://127.0.0.1:5000/delete_contact/${contact.id}`;
    const options = {
      method: "DELETE"
    }
    const res = await fetch(url, options);

    if (res.status !== 200) {
      const data = await res.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  }

  return (
    <div>
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button onClick={() => updateContact(contact)}>Edit</button>
                <button onClick={() => deleteContact(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(ContactType).isRequired,
  updateContact: PropTypes.func.isRequired,
  updateCallback: PropTypes.func.isRequired
}

export default ContactList;