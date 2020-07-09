import React, {useEffect} from 'react';
import styles from './login.less';

import { Form, Input, Button, message } from 'antd';
import {history} from 'umi';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    fetch("//localhost/betterdota/api/login", {
      method: "POST",
      body: JSON.stringify(values)
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      if(result.success){
        message.info("登录成功")
        history.push("/list")
      }else{
        if(result.code == 1){
          message.error("用户名不存在")
        }else if(result.code == 2){
          message.error("密码错误")
        }
      }
    }, error => {
        console.log("e ", error)
    })
  }

  return (<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
    <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="password" label="密码" rules={[{ required: true }]}>
      <Input.Password />
    </Form.Item>
    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        登录
      </Button>
    </Form.Item>
  </Form>
  );
}
