import React from 'react';
import PropTypes from 'prop-types'
import Pagination from '../pagination';
import PersonRow from './person-row';
import { ConnectedEmailLettersModal } from '../email-letters-modal';
import './style.scss';

const modalId = 'lettersModal';

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
    return this.props.people.map(person => <PersonRow key={person.id} {...person} />);
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

  renderButtons() {
    return (
      <div className="buttons-container">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`#${modalId}`}>
          See email letters count
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="people-table">
        <div className="table-toolbar">
          {this.renderPagination()}
          {this.renderButtons()}
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Job Title</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPeople()}
          </tbody>
        </table>
        <ConnectedEmailLettersModal modalId={modalId}/>
      </div>
    )
  }
};

export default PeopleTable;
