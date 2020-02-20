import { connect } from 'react-redux';
import { fetchPeople } from '../../data/actions';

const mapStateToProps = (state) => {
  return {
    people: state.people.data,
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
