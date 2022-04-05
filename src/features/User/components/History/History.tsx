import { Pagination, Table } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { historyInfo } from "models";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { historyActions, selectHistoryList } from "./historySlice";
export interface HistoryProps {
  activeKey: React.Key | undefined;
}

export default function History(props: HistoryProps) {
  const { activeKey } = props;
  const [data, setData] = useState<historyInfo[]>([]);
  const [total, setTotal] = useState<number>();
  const [pageInfo, setPageInfo] = useState<number>(1);
  const historyList = useAppSelector(selectHistoryList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (activeKey) {
        var token = localStorage.getItem("access_token");
        dispatch(
          historyActions.fetchHistoryList({
            id: activeKey,
            token: token,
            _limit: 10,
            _page: pageInfo,
          })
        );
      }
    })();
  }, [activeKey, pageInfo, dispatch]);

  useEffect(() => {
    if (historyList) {
      setData(historyList.data);
      setTotal(historyList.total_elements);
    }
  }, [historyList]);

  const columns = [
    { title: "Email", dataIndex: "user", key: "user" },
    { title: "Name Table", dataIndex: "measurement", key: "measurement" },
    {
      title: "Date",
      dataIndex: "update_date",
      key: "update_date",
      render: (update_date: number) => (
        <p>{moment(update_date).format("YYYY-MM-DD HH:mm:ss")}</p>
      ),
    },
  ];

  const onChangePage = async (page: number) => {
    setPageInfo(page);
  };

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              {record.message
                .split("")
                .filter((i) => !["{", "}", "'"].includes(i))}
            </p>
          ),
        }}
        dataSource={data}
        pagination={false}
        scroll={{ y: 430 }}
        style={{
          height: "500px",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Pagination
          size="small"
          onChange={onChangePage}
          pageSize={10}
          defaultCurrent={pageInfo}
          total={total}
        />
      </div>
    </>
  );
}
