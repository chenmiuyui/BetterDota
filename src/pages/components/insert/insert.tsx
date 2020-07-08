import React from 'react';
import styles from './insert.less';

import { Form, Input, Button, message } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default (props: any) => {
  const [form] = Form.useForm();

  const onGenderChange = (value: any) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        return;
    }
  };

  const onFinish = (values: any) => {
    fetch("//localhost/betterdota/api/news/insert", {
      method: "POST",
      body: JSON.stringify(Object.assign({}, values, {userid: 1}))
    }).then(res => res.json())
    .then(result => {
      if(result.success){
        message.info("新建成功")
        props.refresh()
      }else{
        message.error("创建失败")
      }
    }, error => {
        message.error("创建失败")
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="内容" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="image" label="图片">
        <Input />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) => {
          return getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};
