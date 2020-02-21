import { connect } from 'react-redux';
import { fetchDuplicatedPeople } from '../../data/actions';
import get from 'lodash/get';

const mapStateToProps = (state) => {
  return {
    duplicatedPeople: get(state, 'duplicatedPeople'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadDuplicatedPeople: () => {
      dispatch(fetchDuplicatedPeople());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
