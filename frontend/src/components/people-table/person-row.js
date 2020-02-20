import React from 'react';

const PersonRow = (person) => (
  <tr>
    <th scope="row">{person.id}</th>
    <td>{[person.firstName, person.lastName].join(' ')}</td>
    <td>{person.emailAddress}</td>
    <td>{person.title}</td>
  </tr>
);

export default PersonRow;
