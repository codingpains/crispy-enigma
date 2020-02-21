import React from 'react';
import PropTypes from 'prop-types';
import first from 'lodash/first';
import './style.scss';

class DuplicatedPeopleModal extends React.PureComponent {
  static propTypes = {
    duplcatedPeople: PropTypes.array,
  };

  static defaultProps = {
    duplicatedPeople: [],
  };

  constructor(props) {
    super(props);
    this.props.onLoadDuplicatedPeople();
  }

  get people() {
    return this.props.duplicatedPeople;
  }

  renderDuplicatedPeopleTable() {
    return  (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Person</th>
            <th scope="col">Potential duplicates</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPeople()}
        </tbody>
      </table>
    );
  }

  renderPeople() {
    return this.people.map(relation => {
      const person = first(relation), dups = relation.slice(1);
      return (
        <tr key={`${first(relation).emailAddress}`}>
          <td>{printPerson(person)}</td>
          <td>{dups.map(dup => printPerson(dup)).join()}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="modal fade duplicated-people-modal" id={this.props.modalId} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>These people might be duplicated</h5>
              {this.renderDuplicatedPeopleTable()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const printPerson = (person) => {
  return `<${person.firstName} ${person.lastName}> ${person.emailAddress}`;
}

export default DuplicatedPeopleModal;
