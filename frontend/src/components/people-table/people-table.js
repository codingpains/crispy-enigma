import React from 'react';
import PropTypes from 'prop-types'
import Pagination from '../pagination';

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
      <tr key={person.id}>
        <th scope="row">{person.id}</th>
        <td>{[person.firstName, person.lastName].join(' ')}</td>
        <td>{person.emailAddress}</td>
        <td>{person.title}</td>
      </tr>
    ));
  }

  renderPagination() {
    return (
      <Pagination
        onPageChange={this.props.onLoadPeople}
        prevPage={this.props.prevPage}
        nextPage={this.props.nextPage}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderPagination()}
        <table className="table table-striped">
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
      </React.Fragment>
    )
  }
};

export default PeopleTable;
