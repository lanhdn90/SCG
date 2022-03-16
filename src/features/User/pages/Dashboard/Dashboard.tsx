import { Tabs } from 'antd';
import SetPointCapacity from 'features/User/components/SetPointCapacity/SetPointCapacity';
import { initialPanes } from 'models';
import * as React from 'react';
import { IoLink } from 'react-icons/io5';
import style from './Dashboard.module.scss';
import { BsGear } from 'react-icons/bs';
import SetPointRate from 'features/User/components/SetPointRate/SetPointRate';
export interface DashboardProps {}
export default function Dashboard(props: DashboardProps) {
  const { TabPane } = Tabs;
  const [panes, setPanes] = React.useState<initialPanes[]>([
    { title: 'Line 1', content: 'Content of Line 1', key: '1' },
    { title: 'Line 2', content: 'Content of Line 2', key: '2' },
    {
      title: 'Line 3',
      content: 'Content of Line 3',
      key: '3',
    },
  ]);
  const [activeKey, setActiveKey] = React.useState<React.Key>(panes[1].key);

  const onChange = (activeKey: React.Key) => {
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey: any, action: string) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const add = () => {
    const activeKey = `${panes.length + 1}`;
    const newPanes = [...panes];
    newPanes.push({
      title: `Line ${panes.length + 1}`,
      content: `Content of Line ${panes.length + 1}`,
      key: activeKey,
    });
    setPanes(newPanes);
    setActiveKey(activeKey);
  };

  const remove = (targetKey: any) => {
    let newActiveKey = activeKey;
    let lastIndex: number = 0;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(activeKey);
  };

  return (
    <div className={style.root}>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey.toString()}
        onEdit={onEdit}
      >
        {panes.map((pane) => (
          <TabPane
            tab={
              <div className={style.header_tabs}>
                <IoLink size={20} />
                &ensp;
                {pane.title}
              </div>
            }
            key={pane.key}
          >
            <div className={style.content}>
              <div className={style.header_line}>
                <div></div>
                <div className={style.title_header}>{pane.title}</div>
                <BsGear size={20} />
              </div>
              <div className={style.header_admin}>Set point capacity (t/h)</div>
              <div className={style.table_capacity}>
                <SetPointCapacity />
              </div>
              <div className={style.header_admin}>Set point rate (%)</div>
              <div className={style.table_capacity}>
                <SetPointRate />
              </div>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
