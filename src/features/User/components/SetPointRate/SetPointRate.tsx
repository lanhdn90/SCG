import { Button, Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
export interface SetPointRateProps {}

interface Item {
  key: string;
  ClinkeVCM: number;
  ClinkeSG1: number;
  ClinkeSG2: number;
  Gypsum1: number;
  Gypsum2: number;
  NDBlackstone: number;
  FlyAsh: number;
  Total: number;
  Mapei: number;
}

const originData: Item[] = [];
for (let i = 0; i < 1; i++) {
  originData.push({
    key: i.toString(),
    ClinkeVCM: i + 1 * 1,
    ClinkeSG1: i + 1 * 2,
    ClinkeSG2: i + 1 * 3,
    Gypsum1: i + 1 * 4,
    Gypsum2: i + 1 * 5,
    NDBlackstone: i + 1 * 6,
    FlyAsh: i + 1 * 7,
    Total: i + 1 * 8,
    Mapei: i + 1 * 9,
  });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <InputNumber disabled={title === 'Total' ? true : false} />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function SetPointRate(props: SetPointRateProps) {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log('🚀 ~ file: SetPointRate.tsx ~ line 86 ~ edit ~ record', record);
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const clo = [
    'ClinkeVCM',
    'ClinkeSG1',
    'ClinkeSG2',
    'Gypsum1',
    'Gypsum2',
    'NDBlackstone',
    'FlyAsh',
    'Total',
    'Mapei',
    'Action',
  ];

  const columns = clo.map((item, i) => {
    if (i === clo.length - 1) {
      return {
        title: item,
        dataIndex: item,
        render: (_: any, record: Item) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <Button type="link">Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
      };
    } else
      return {
        title: item,
        dataIndex: item,
        editable: true,
      };
  });

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
}
