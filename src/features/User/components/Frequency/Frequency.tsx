import { Button, Form, InputNumber, Popconfirm, Popover, Table, Typography } from 'antd';
import { lineInfo, newItem } from 'models';
import React, { useEffect, useState } from 'react';
import Accuracy from '../Accuracy/Accuracy';
export interface FrequencyTableProps {
  frequency: string[];
  database: lineInfo;
  updateLine: (object: newItem, type: number, code: string) => void;
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
  const inputNode = <InputNumber />;

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

export default function FrequencyTable(props: FrequencyTableProps) {
  const { frequency, database, updateLine } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<newItem[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [objectValue, setObjectValue] = useState<newItem | undefined>(undefined);

  useEffect(() => {
    setData(database.freq ? [database.freq] : []);
  }, [database]);

  const isEditing = (record: newItem) => record.key === editingKey;

  const edit = (record: Partial<newItem> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
    setObjectValue(undefined);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as newItem;
      setObjectValue(row);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = frequency.map((item, i) => {
    if (i === frequency.length - 1) {
      return {
        title: item,
        dataIndex: item,
        width: '221.2px',
        render: (_: any, record: newItem) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Popover
                title={<div style={{ textAlign: 'center' }}>Accuracy</div>}
                content={
                  <Accuracy
                    setIsAuth={setIsAuth}
                    isAuth={isAuth}
                    cancel={cancel}
                    updateLine={updateLine}
                    objectValue={objectValue}
                    content={3}
                  />
                }
                trigger="click"
                visible={isAuth}
                onVisibleChange={() => setIsAuth(!isAuth)}
              >
                <Button type="link" onClick={() => save(record.key)}>
                  Save
                </Button>
              </Popover>
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
