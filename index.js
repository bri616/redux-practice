import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { bindActionCreators, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Select from 'react-select';

// React component
class BriSelect extends Component {
    render() {
        const { selectedValue, options, onChange } = this.props
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={selectedValue}
                    options={options}
                    onChange={onChange}
                />
                <span>{JSON.stringify(selectedValue)}</span>
            </div>
        );
    }
}

class Counter extends Component {
  render() {
    const { value, onIncreaseClick, onDecreaseClick, onResetClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={onDecreaseClick}>Decrease</button>
        <button onClick={onResetClick}>Reset</button>
      </div>
    );
  }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired,
    onDecreaseClick: PropTypes.func.isRequired,
    onResetClick: PropTypes.func.isRequired
}

// Action
const onChange = (selectedValue) => ({
    type: 'change-select',
    selectedValue: selectedValue
});

// Reducer:
function briselect(state={selectedValue: null}, action) {
    switch(action.type){
        case 'change-select':
            return { selectedValue: action.selectedValue };
        default:
            return state;
    }
}


// Store:
let store = createStore(briselect)

// Map Redux state to component props
function mapStateToProps(state)  {
  return {
    selectedValue: state.selectedValue
  };
}

// Map Redux actions to component props
//function mapDispatchToProps(dispatch) {
    //return {
        //onChange: (selectedValue) => dispatch(onChange(selectedValue)),
    //}
//}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({onChange: onChange}, dispatch)
}

// Connected Component:
let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(BriSelect);

ReactDOM.render(
  <Provider store={store}>
      <App
          options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' }
          ]}
      />
  </Provider>,
  document.getElementById('root')
);
