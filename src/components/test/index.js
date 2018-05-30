import React from 'react';
import PropTypes from 'prop-types';

export default class Test extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Test
        $END$
      </div>
    );
  }
}