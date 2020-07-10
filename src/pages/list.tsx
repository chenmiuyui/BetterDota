import React, {useState, useEffect} from 'react';
import styles from './list.less';
import News from "./components/news/news"
import Insert from "./components/insert/insert"

import { Button, Table, Typography, Modal, Form, Input, message, Affix} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type News = {id: Number, title: string, content: string, username: Number, datetime: string, image: string}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default () => {
  const [form] = Form.useForm();
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [newsList, setNewsList] = useState([{id: 0, title: "", content: "", username: 0, datetime: "", image: ""}])
  const [news, setNews] = useState(null)
  const [editVisible, setEditVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [insertVisible, setInsertVisible] = useState(false)

  useEffect(() => {
    fetch("/api/news/getall")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setNewsList(result)
        setIsLoaded(true)
      },
      (error) => {
        setError(error)
        setIsLoaded(true)
      }
    )
    document.title = "登录"
  }, [])

  const refresh = () => {
    fetch("/api/news/getall")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setNewsList(result)
        setIsLoaded(true)
      },
      (error) => {
        setError(error)
        setIsLoaded(true)
      }
    )
  }

  const showEditModal = (item) => {
    form.setFieldsValue(item)
    console.log(item)
    setNews(item);
    setEditVisible(true);
  };

  const showDeleteModal = (item) => {
    form.setFieldsValue(item)
    console.log(item)
    setNews(item);
    setDeleteVisible(true);
  };

  const handleOk = e => {
    form.validateFields()
    .then(values => {
      fetch("/api/news/update", {
        method: "POST",
        body: JSON.stringify(Object.assign({}, values, {id: news.id}))
      }).then(res => res.json())
      .then(result => {
        if(result.success){
          message.info("修改成功！")
          setEditVisible(false);
          refresh()
        }else{
          message.error(JSON.stringify(result))
        }
      }, error => {
          message.error(JSON.stringify(error))
      })
    })
  };

  const handleCancel = e => {
    setEditVisible(false);
  };
  
  const onFinish = (values: any) => {
    fetch("/api/news/update", {
      method: "POST",
      body: JSON.stringify(Object.assign({}, values, {id: 9}))
    }).then(res => res.json())
    .then(result => {
      if(result.success){
        message.info("修改成功！")
      }else{
        message.error(JSON.stringify(result))
      }
    }, error => {
        message.error(JSON.stringify(error))
    })
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: '修改时间',
      dataIndex: 'datetime',
      key: 'datetime',
      sorter: (a, b) => new Date(a.datetime) - new Date(b.datetime),
      defaultSortOrder: "descend"
    },
    {
      title: '发布用户',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '修改',
      key: 'edit',
      render: (item: News) => <Button type='primary' onClick={() => showEditModal(item)}>修改</Button>,
      width: 100
    },
    {
      title: '删除',
      key: 'edit',
      render: (item: News) => <Button type='primary' onClick={() => showDeleteModal(item)}>删除</Button>,
      width: 100
    }
  ]

  if (error) {
      return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    // window.i = newsList
    return (
      <>
        <Table
          columns = {columns}
          dataSource={newsList}
        />

        <Affix style={{ position: 'fixed', bottom: 50, right: 50 }}>
          <Button type="primary" shape="circle" size="large" style={{width: 50, height: 50, background: "red"}} icon={<PlusOutlined />}
            onClick={() => {setInsertVisible(true)}}/>
        </Affix>

        <Modal
          title="修改新闻"
          visible={editVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="修改"
          cancelText="取消"
        >
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="title" label="标题" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="content" label="内容" rules={[{ required: true }]}>
              <Input.TextArea autoSize={true} />
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
          </Form>
        </Modal>

        <Modal
          title="确定删除么？"
          visible={deleteVisible}
          onOk={() => {
            fetch("/api/news/delete", {
              method: "POST",
              body: JSON.stringify({id: news.id})
            }).then(res => res.json())
            .then(result => {
              if(result.success){
                message.info("删除成功！")
                setDeleteVisible(false);
                fetch("/api/news/getall")
                .then(res => res.json())
                .then(
                  (result) => {
                    console.log(result)
                    setNewsList(result)
                    setIsLoaded(true)
                  },
                  (error) => {
                    setError(error)
                    setIsLoaded(true)
                  }
                )
              }else{
                message.error(JSON.stringify(result))
              }
            }, error => {
                message.error(JSON.stringify(error))
            })
          }}
          onCancel={() => {setDeleteVisible(false)}}
        >
          <p>确认删除么？</p>
        </Modal>
        <Modal
          title="发布新闻"
          visible={insertVisible}
          footer={null}
          onCancel={() => {setInsertVisible(false)}}>
            <Insert refresh={refresh} />
          </Modal>
      </>
      )
  }
};
