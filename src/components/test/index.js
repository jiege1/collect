import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';

export default class Test extends React.Component {

  static propTypes = {
    content: PropTypes.string,
  };

  static defaultProps = {
    content: 'test',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={css.content}>
        {this.props.content}
      </div>
    );
  }
}