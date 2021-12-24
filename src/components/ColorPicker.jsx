import React from "react";
import { CirclePicker } from "react-color";

class ColorPicker extends React.Component {
  state = {
    background: "#fff",
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <div className="justify-content-center">
        <CirclePicker
          color={this.state.background}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    );
  }
}

export default ColorPicker;
