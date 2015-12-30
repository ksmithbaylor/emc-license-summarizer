import React from 'react';
import { processLicense } from 'processor';
import RaisedButton from 'material-ui/lib/raised-button';

export default class FileInput extends React.Component {
  render() {
    const { sectionStyle, buttonStyle } = this.props;

    return (
      <div style={sectionStyle}>
        <RaisedButton
          label="OPEN"
          primary={true}
          linkButton={true}
          style={buttonStyle}
        >
          <input
            type="file"
            onChange={this.onChange}
            style={invisibleFileInputStyle}
          />
        </RaisedButton>
        Open a license file from your computer
      </div>
    );
  }

  componentDidMount() {
    this.fileReader = new FileReader();
    this.fileReader.addEventListener('load', this.handleNewFile);
  }

  componentWillUnmount() {
    this.fileReader.removeEventListener('load', this.handleNewFile);
  }

  onChange = (event) => {
    if (event.target.files[0]) {
      this.fileReader.readAsText(event.target.files[0])
    }
  }

  handleNewFile = (event) => {
    // TODO: make timeout a constant
    setTimeout((() => (
      this.props.requestResults(
        processLicense(this.fileReader.result)
      )
    )), 200)
  }
}

const invisibleFileInputStyle = {
  opacity: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  cursor: 'pointer',
  position: 'absolute',
  width: '100%'
};
