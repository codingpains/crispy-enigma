import { connect } from 'react-redux';
import { fetchEmailLetterFrequencies } from '../../data/actions';
import get from 'lodash/get';

const mapStateToProps = (state) => {
  return {
    frequencies: get(state, 'emailLetterFrequencies'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadFrequencies: () => {
      dispatch(fetchEmailLetterFrequencies());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
