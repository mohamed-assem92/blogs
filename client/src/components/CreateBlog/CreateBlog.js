import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'antd/es/input';
import Form from 'antd/es/form';
import Button from 'antd/es/button';
import notification from 'antd/es/notification';
import { blogsAPI } from '../../api/blogs';

const { TextArea } = Input;

const CreateBlog = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      await blogsAPI.create({
        title: values.blogTitle,
        authorName: values.userName,
        mainImageURL: values.blogImage,
        body: values.blogBody,
      });
      notification.success({
        message: "Your Blog Submitted Successfully",
      });
    } catch (error) {
      notification.error({
        message: "Failed to Submitt Blog",
      });
    } finally {
      form.resetFields();
      setSubmitting(false);
      history.push(`/blogs`);
    }
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
            message: 'Please input your name',
          },
        ]}
        hasFeedback
        name="userName"
      >
        <Input size="large" placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please input blog\'s title',
          },
        ]}
        hasFeedback
        name="blogTitle"
      >
        <Input size="large" placeholder="Blog Title" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please input blog\'s image url',
          },
          {
            type: "url",
            message: "This field must be a valid url.",
          },
        ]}
        hasFeedback
        name="blogImage"
      >
        <Input size="large" placeholder="Blog Main Image" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Please add your blog body',
          },
        ]}
        hasFeedback
        name="blogBody"
      >
        <TextArea rows={4} placeholder="Blog Body" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Create Blog
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
