import { Tabs } from 'antd';
import { authApi } from 'api/authApi';
import { useAppSelector } from 'app/hooks';
import { selectLinesOfUser } from 'components/Layout/homeSlice';
import SetPointCapacity from 'features/User/components/SetPointCapacity/SetPointCapacity';
import SetPointRate from 'features/User/components/SetPointRate/SetPointRate';
import { initialPanes, lineInfo, newItem } from 'models';
import * as React from 'react';
import { BsGear } from 'react-icons/bs';
import { IoLink } from 'react-icons/io5';
import { calculationData, customedHeadrTable } from 'utils/common';
import style from './Dashboard.module.scss';
export interface DashboardProps {}
export default function Dashboard(props: DashboardProps) {
  const { TabPane } = Tabs;
  const lineList = useAppSelector(selectLinesOfUser);
  const [panes, setPanes] = React.useState<initialPanes[]>();
  const [activeKey, setActiveKey] = React.useState<React.Key>();

  React.useEffect(() => {
    if (lineList) {
      let array: initialPanes[] = [];
      lineList.forEach((item) => {
        item.forEach((i) => {
          array = [
            ...array,
            { title: `${i.station}_${i.line}`, content: customedHeadrTable(i.spc), key: i.id },
          ];
        });
      });
      setPanes(array);
    }
  }, [lineList]);

  React.useEffect(() => {
    if (panes) {
      setActiveKey(panes[0].key);
    }
  }, [panes]);

  const [data, setData] = React.useState<lineInfo>();
  React.useEffect(() => {
    (async () => {
      if (activeKey) {
        var token = localStorage.getItem('access_token');
        const response: lineInfo = await authApi.getDeviceInfo({
          id: activeKey,
          token: token,
        });
        setData(response);
        console.log('🚀 ~ file: Dashboard.tsx ~ line 51 ~ response', response);
      }
    })();
  }, [activeKey]);

  const updateLine = (values: newItem, type: boolean) => {
    // var token = localStorage.getItem('access_token');
    // var axios = require('axios');
    // var config = {
    //   method: 'patch',
    //   url: `http://103.149.253.133:7654/api/v1/devices/${activeKey}?token=${token}`,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   data: values,
    // };
    // axios(config)
    //   .then(function (response: any) {
    //     if (type && data) {
    //       calculationData(data.spr, values.Total);
    //     }
    //     console.log('🚀 ~ file: Dashboard.tsx ~ line 72 ~ response', response);
    //   })
    //   .catch(function (error: any) {
    //     console.log(error);
    //   });
    if (data) {
      const spr = data.spr;
      if (type) {
        setData({ spr: spr, spc: calculationData(data.spr, values.Total) });
      }
    }
  };

  const onChange = (activeKey: React.Key) => {
    setActiveKey(activeKey);
  };

  return (
    <>
      {data && (
        <div className={style.root}>
          <Tabs type="editable-card" onChange={onChange} activeKey={activeKey?.toString()}>
            {panes?.map((pane) => (
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
                    <SetPointCapacity
                      content={pane.content}
                      database={data}
                      updateLine={updateLine}
                    />
                  </div>
                  <div className={style.header_admin}>Set point rate (%)</div>
                  <div className={style.table_capacity}>
                    <SetPointRate content={pane.content} database={data} />
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
}
