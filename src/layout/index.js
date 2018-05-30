import React from 'react';
import PropTypes from 'prop-types';
import css from './index.less';
import Test from 'components/test';
import ajax from 'common/utils/ajax';
import { Button } from 'antd';

export default class Layout extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let data = await ajax.query({url: 'test', params: {}});
    console.log(data);
  }

  render() {
    return (
      <div className={css.layout}>
        Layout
        <Test content="This is a component!"/>
        <Button type="primary">Primary</Button>
        <p className={css.p}>
          这是在测试热更新！
        </p>
      </div>
    );
  }
}