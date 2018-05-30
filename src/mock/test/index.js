import Mock, { Random } from 'mockjs';

Mock.mock(/mock.test/, request => {

  return Mock.mock({
    msg: 'test',
  });
});
