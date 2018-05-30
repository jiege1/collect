import css from './index.less';
import React from 'react';
import ReactDom from 'react-dom';
import Layout from './layout';

console.log('环境变量：', process.env);

ReactDom.render(
  <Layout />,
  document.getElementById('root')
);