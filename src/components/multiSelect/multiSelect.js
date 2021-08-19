
import { Component, Children, PropTypes} from 'react';
import {  Select, Option, utils,getToggledOptions} from 'selectly';


class CheckboxOption extends Component {
  render() {
    const { value, isChecked, children } = this.props
    return (
      <Option className="react-select-option" value={value}>
        <input
          type="checkbox"
          className="react-select-option__checkbox"
          defaultValue={null}
          checked={isChecked}
        />
        <div className="react-select-option__label">
          {children}
        </div>
      </Option>
    )
  }
}

class CheckboxMultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: 'Select a color',
      currentValues: []
    }
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(value) {
    this.setState({
      currentValues: getToggledOptions(this.state.currentValues, value)
    })
  }

  render() {
    const { defaultValue, currentValues } = this.state

    return (
      <Select
        classPrefix="react-select"
        multiple
        onChange={this._handleChange}
      >
        <button className="react-select-trigger">
          { currentValues.length > 0
            ? currentValues.join(', ')
            : defaultValue
          }
        </button>
        <div className="react-select-menu">
          <ul className="react-select-options">
            <CheckboxOption value="red" isChecked={currentValues.indexOf('red') > -1}>
              Red
            </CheckboxOption>
            <CheckboxOption value="green" isChecked={currentValues.indexOf('green') > -1}>
              Green
            </CheckboxOption>
            <CheckboxOption value="blue" isChecked={currentValues.indexOf('blue') > -1}>
              Blue
            </CheckboxOption>
          </ul>
        </div>
      </Select>
    )
  }
}

export default CheckboxMultiSelect;