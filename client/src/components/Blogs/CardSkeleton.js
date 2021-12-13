import React from 'react';
import Card from 'antd/es/card';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

const CardSkeleton = () => (
  <Row gutter={[48, 48]} style={{ marginTop: '9rem' }}>
    <Col span={2} />
    <Col xs={24} xl={4} key="1">
      <Card loading style={{ width: 250, height: 300 }} />
    </Col>
    <Col xs={24} xl={4} key="2">
      <Card loading style={{ width: 250, height: 300 }} />
    </Col>
    <Col xs={24} xl={4} key="3">
      <Card loading style={{ width: 250, height: 300 }} />
    </Col>
    <Col xs={24} xl={4} key="4">
      <Card loading style={{ width: 250, height: 300 }} />
    </Col>
    <Col xs={24} xl={4} key="5">
      <Card loading style={{ width: 250, height: 300 }} />
    </Col>
  </Row>
);

export default CardSkeleton;
