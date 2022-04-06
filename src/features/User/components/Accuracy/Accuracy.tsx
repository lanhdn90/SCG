import { Button, Input, Popconfirm } from 'antd';
import * as React from 'react';

export interface  AccuracyProps {
}

export default function Accuracy (props:  AccuracyProps) {
  return (
    <div>
      <Popconfirm
                title={
                  <div style={{ width: '250px', height: '100px' }}>
                    <p style={{ fontSize: '18px' }}>accuracy</p>
                    <Input placeholder="Please Enter Auth Code!" />
                  </div>
                }
                // onConfirm={() => save(record.key)}
                // onVisibleChange={() => setIsAuth(!isAuth)}
              >
                <Button
                  type="link"
                  onClick={() =>
                    console.log(
                      '🚀 ~ file: SetPointCapacity.tsx ~ line 77 ~ useEffect ~ isAuth',
                    //   isAuth
                    )
                  }
                >
                  Save
                </Button>
              </Popconfirm>
    </div>
  );
}
