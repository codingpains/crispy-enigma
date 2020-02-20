import { connect } from 'react-redux';
import { fetchPeople } from '../../data/actions';
import get from 'lodash/get';

const mapStateToProps = (state) => {
  return {
    people: get(state, 'people.data'),
    prevPage: get(state, 'people.metadata.paging.prevPage'),
    nextPage: get(state, 'people.metadata.paging.nextPage'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPeople: (perPage, page) => {
      dispatch(fetchPeople(perPage, page));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
