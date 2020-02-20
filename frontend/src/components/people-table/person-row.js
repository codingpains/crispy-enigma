import React from 'react';

const PersonRow = (person) => (
  <tr>
    <td>{[person.firstName, person.lastName].join(' ')}</td>
    <td>{person.emailAddress}</td>
    <td>{person.title}</td>
  </tr>
);

export default PersonRow;
