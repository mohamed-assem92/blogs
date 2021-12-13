import React from 'react';
import Input from 'antd/es/input';
import Form from 'antd/es/form';
import Button from 'antd/es/button';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Commenter = ({
  handleSubmitt, submitting,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.resetFields();
    handleSubmitt(values);
  };

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
      onFinish={onFinish}
      name="Add Comment"
      form={form}
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please add your comment',
          },
        ]}
        hasFeedback
        name="userComment"
      >
        <TextArea rows={2} placeholder="Comment" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
        hasFeedback
        name="userName"
      >
        <Input size="large" placeholder="Full Name" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Submit Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Commenter;
