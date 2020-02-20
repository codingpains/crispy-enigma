import React from 'react';
import PropTypes from 'prop-types';

const PER_PAGE = 25;

class Pagination extends React.PureComponent {
  static propTypes = {
    onPageChange: PropTypes.func.isRequired,
    nextPage: PropTypes.number,
    prevPage: PropTypes.number,
  }

  static defaultProps = {
    nextPage: null,
    prevPage: null,
  }

  get nextPage() {
    return this.props.nextPage;
  }

  get prevPage() {
    return this.props.prevPage;
  }

  goToNextPage = () => this.props.onPageChange(PER_PAGE, this.nextPage);
  goToPrevPage = () => this.props.onPageChange(PER_PAGE, this.prevPage);

  render() {
    return (
      <nav aria-label="people-table-pagination">
        <ul className="pagination">
        <li className={`page-item ${this.prevPage ? '' : 'disabled'}`}>
          <a className="page-link"
            href="#"
            onClick={this.goToPrevPage}>
            Previous
          </a>
        </li>
        <li className={`page-item ${this.nextPage ? '' : 'disabled'}`}>
          <a className="page-link"
            href="#"
            onClick={this.goToNextPage}
            >
            Next
          </a>
        </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
