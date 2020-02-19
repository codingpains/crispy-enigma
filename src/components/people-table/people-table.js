import React from 'react';

class PeopleTable extends React.PureComponent {
  get people() {
      return [
        { id: 1, name: 'Jon Snow', email: 'winteriscomming@gmail.com', jobTitle: 'Lord Commander' },
        { id: 2, name: 'Varys', email: 'spider@kingslanding', jobTitle: 'Master of whispers' },
        { id: 3, name: 'Jora Mormonth', email: 'ilovedanny@gmail.com', jobTitle: 'Friendzone expert'},
      ];
  }

  renderPeople() {
    return this.people.map(person => (
      <tr>
        <th scope="row">{person.id}</th>
        <td>{person.name}</td>
        <td>{person.email}</td>
        <td>{person.jobTitle}</td>
      </tr>
    ));
  }

  render() {
    return (
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Job Title</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPeople()}
        </tbody>
      </table>
    )
  }
};

export default PeopleTable;
