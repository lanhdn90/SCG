import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import { useAppSelector } from 'app/hooks';
import { Account } from 'models';
import React from 'react';
import { history } from 'utils';
import { selectError, selectIsLoggedIn } from '../../authSlice';
import style from './FormLogin.module.scss';
export default function FormLogin() {
  const [form] = Form.useForm();
  const isLogging = useAppSelector(selectIsLoggedIn);
  const error = useAppSelector(selectError);
  // const dispatch = useAppDispatch();

  const loginUser = (values: Account): void => {
    // dispatch(authActions.login(values));
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      email: `${values.email}`,
      password: `${values.password}`,
    });
    var config = {
      method: 'post',
      url: 'http://192.168.1.11:8000/api/v1/login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    axios(config)
      .then(function (response: any) {
        localStorage.setItem('access_token', response.data.token);
        document.cookie = response.data.token;
        history.push(`/User/Dashboard`);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return (
    <div className={style.form_login}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={(values) => loginUser(values)}
        layout="vertical"
        hideRequiredMark
      >
        <Form.Item
          label={
            <div>
              Email <span style={{ color: 'red' }}>*</span>
            </div>
          }
          name="email"
          rules={[{ required: true, message: 'Please input your Email' }]}
        >
          <Input
            className={style.border_bottom}
            bordered={false}
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="abc@example.com"
          />
        </Form.Item>
        <Form.Item
          label={
            <div>
              Password <span style={{ color: 'red' }}>*</span>
            </div>
          }
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            className={style.border_bottom}
            bordered={false}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            size="large"
            placeholder="Password"
          />
        </Form.Item>
      </Form>
      <div className={style.forgot_password}>
        <div>Forgot password?</div>
      </div>
      {error && <Alert message={error} type="error" />}
      <div className={style.group_btn}>
        <Button loading={isLogging} className={style.btn_login} onClick={() => form.submit()}>
          Sign in
        </Button>
      </div>
      <div className={style.create_account}>
        You don't have an account?&ensp;
        <div>create account</div>
      </div>
    </div>
  );
}
