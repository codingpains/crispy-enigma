import React from 'react';
import PropTypes from 'prop-types'

class PeopleTable extends React.PureComponent {
  static propTypes = {
    people: PropTypes.array,
    onLoadPeople: PropTypes.func.isRequired,
  };

  static defaultProps = {
    people: [],
  };

  constructor(props) {
    super(props);
    this.props.onLoadPeople();
  }

  renderPeople() {
    return this.props.people.map(person => (
      <tr>
        <th scope="row">{person.id}</th>
        <td>{[person.firstName, person.lastName].join(' ')}</td>
        <td>{person.emailAddress}</td>
        <td>{person.title}</td>
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
