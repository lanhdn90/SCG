import { Modal, Tabs } from 'antd';
import { authApi } from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectLinesOfUser } from 'components/Layout/homeSlice';
import FrequencyTable from 'features/User/components/Frequency/Frequency';
import History from 'features/User/components/History/History';
import { historyActions } from 'features/User/components/History/historySlice';
import SetPointCapacity from 'features/User/components/SetPointCapacity/SetPointCapacity';
import SetPointRate from 'features/User/components/SetPointRate/SetPointRate';
import { initialPanes, lineInfo, newItem } from 'models';
import * as React from 'react';
import { BsTable } from 'react-icons/bs';
import { IoLink } from 'react-icons/io5';
import {
  calculationDataSPC,
  calculationDataSPR,
  customedHeadrFrequencyTable,
  customedHeadrTable
} from 'utils/common';
import style from './Dashboard.module.scss';
export interface DashboardProps {}
export default function Dashboard(props: DashboardProps) {
  const { TabPane } = Tabs;
  const lineList = useAppSelector(selectLinesOfUser);
  const [panes, setPanes] = React.useState<initialPanes[]>();
  const [activeKey, setActiveKey] = React.useState<React.Key>();
  const [data, setData] = React.useState<lineInfo>();
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    setIsModalVisible(!isModalVisible);
  };
  React.useEffect(() => {
    if (lineList) {
      let array: initialPanes[] = [];
      lineList.forEach((item) => {
        item.forEach((i) => {
          array = [
            ...array,
            {
              title: `${i.station}_${i.line}`,
              content: customedHeadrTable(i.spc),
              key: i.id,
              frequency: i.freq ? customedHeadrFrequencyTable(i.freq) : undefined,
            },
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

  React.useEffect(() => {
    (async () => {
      if (activeKey) {
        var token = localStorage.getItem('access_token');
        const response: lineInfo = await authApi.getDeviceInfo({
          id: activeKey,
          token: token,
        });
        setData(response);
      }
    })();
  }, [activeKey]);

  const updateLine = async (values: newItem, type: number) => {
    var token = localStorage.getItem('access_token');
    var axios = require('axios');
    var config = {
      method: 'patch',
      url: `http://103.149.253.133:8000/api/v1/devices/${activeKey}?measurement=${
        type === 1 ? 'spc' : type === 2 ? 'spr' : 'freq'
      }&token=${token}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: values,
    };
    axios(config)
      .then(function (response: any) {
        if (data) {
          if (type === 1) {
            const spr = data.spr;
            const spc = calculationDataSPC(spr, values.Total);
            setData({ ...data, spr: spr, spc: spc });
          } else if (type === 2) {
            const newSpc = calculationDataSPC(values, data.spc.Total);
            const newSpr = { ...values, Total: calculationDataSPR(values) };
            setData({ ...data, spr: newSpr, spc: newSpc });
          } else {
            setData({ ...data, freq: values });
          }
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
      await dispatch(
        historyActions.fetchHistoryList({
          id: activeKey,
          token: token,
          _limit: 10,
          _page: 1,
        })
      );
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
                    <BsTable size={20} style={{ cursor: 'pointer' }} onClick={handleCancel} />
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
                    <SetPointRate updateLine={updateLine} content={pane.content} database={data} />
                  </div>
                  {pane.frequency && (
                    <>
                      <div className={style.header_admin}>Frequency</div>
                      <div className={style.table_capacity}>
                        <FrequencyTable
                          updateLine={updateLine}
                          frequency={pane.frequency}
                          database={data}
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabPane>
            ))}
          </Tabs>
          <Modal
            title={<div className={style.modal_title}>History</div>}
            footer={null}
            closable={false}
            visible={isModalVisible}
            onCancel={handleCancel}
            width={1500}
            bodyStyle={{
              // background: '#0E201F',
              boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.25)',
              color: 'white',
              height: 600,
            }}
          >
            <History activeKey={activeKey} />
          </Modal>
        </div>
      )}
    </>
  );
}
