import { Button, Form, Input } from 'antd';
import { newItem } from 'models';
import * as React from 'react';
import style from './Accuracy.module.scss';
export interface AccuracyProps {
  updateLine: (object: newItem, type: number, code: string) => void;
  setIsAuth: (value: boolean) => void;
  cancel: () => void;
  isAuth: boolean;
  objectValue: newItem | undefined;
  content: number
}

export default function Accuracy(props: AccuracyProps) {
  const { setIsAuth, isAuth, cancel, updateLine, objectValue, content } = props;
  const [form] = Form.useForm();

  const editLine = (values: any): void => {
    objectValue && updateLine(objectValue, content, values.code);
    console.log('Log: ~ file: Accuracy.tsx ~ line 19 ~ editLine ~ objectValue', objectValue);
    console.log('Log: ~ file: Accuracy.tsx ~ line 14 ~ editLine ~ values', values);
    cancel();
    form.resetFields();
  };

  return (
    <div className={style.root}>
      <Form form={form} onFinish={(values) => editLine(values)} layout="vertical" hideRequiredMark>
        <Form.Item name="code" rules={[{ required: true, message: 'Please enter code!' }]}>
          <Input size="large" placeholder="Please enter code!" />
        </Form.Item>
      </Form>
      <div className={style.group_btn}>
        <Button
          onClick={() => {
            setIsAuth(!isAuth);
            form.resetFields();
          }}
        >
          Cancel
        </Button>
        <Button className={style.save_btn} type="primary" onClick={() => form.submit()}>
          Save
        </Button>
      </div>
    </div>
  );
}
