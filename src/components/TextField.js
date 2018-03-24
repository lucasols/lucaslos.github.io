import React from 'react'; import PropTypes from 'prop-types'; 

// TODO: multiLine

class TextField extends React.Component {
  constructor() {
    super();

    this.state = {
      isValid: true,
    };
  }

  validField = () => {
    const regExp = new RegExp(this.props.regExp);
    const inputLenght = this.input.value.trim().length;

    this.setState({
      isValid: !this.props.regExp ? inputLenght > 0 : regExp.test(this.input.value),
      displayError: inputLenght > 0 ? this.props.errorMsg : "This field can't be blank",
    });
  }

  autoExpand = () => {
    this.input.style.height = '';

    const maxHeight = 80;
    const minHeight = 34;
    let textHeight = this.input.scrollHeight;

    if (textHeight < minHeight) {
      textHeight = minHeight;
    } else if (textHeight > maxHeight) {
      textHeight = maxHeight;
    }

    this.input.style.height = `${textHeight}px`;
  }

  render() {
    const { multiLine, id } = this.props;
    const { isValid } = this.state;
    let textField = null;

    if (!multiLine) {
      textField = (
        <input
          id={id}
          ref={(i) => { this.input = i; }}
          className={`text-field ${!isValid ? 'invalid' : ''}`}
          type="text" onBlur={this.validField}
          required
        />
      );
    } else {
      textField = (
        <textarea
          id={id}
          ref={(i) => { this.input = i; }}
          className={`multiline-field ${!isValid ? 'invalid' : ''}`}
          onBlur={this.validField}
          onChange={this.autoExpand}
          required
        />
      );
    }

    return (
      <div className="field-wrapper">
        { textField }
        <label htmlFor={id} className="floating-label">{ this.props.label }</label>
        <div className="focus-bar" />
        <div className={`validation-error ${!isValid ? 'invalid' : ''}`}>Error: { this.state.displayError }</div>
      </div>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  regExp: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  errorMsg: PropTypes.string.isRequired,
  multiLine: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default TextField;
