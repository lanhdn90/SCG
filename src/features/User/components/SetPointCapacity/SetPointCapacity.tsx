import { Button, Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { authApi } from 'api/authApi';
import { lineInfo, newItem } from 'models';
import React, { useEffect, useState } from 'react';
export interface SetPointRateProps {
  content: string[];
  database: lineInfo;
  updateLine: (object: newItem, type: boolean) => void;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number';
  record: newItem;
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
  const inputNode = <InputNumber disabled={title !== 'Total' ? true : false} />;

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

export default function SetPointCapacity(props: SetPointRateProps) {
  const { content, database, updateLine } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<newItem[]>([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    setData([database.spc]);
  }, [database]);

  const isEditing = (record: newItem) => record.key === editingKey;

  const edit = (record: Partial<newItem> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as newItem;
      updateLine(row, true);
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

  const columns = content.map((item, i) => {
    if (i === content.length - 1) {
      return {
        title: item,
        dataIndex: item,
        render: (_: any, record: newItem) => {
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
      onCell: (record: newItem) => ({
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
