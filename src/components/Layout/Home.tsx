import { Layout } from "antd";
import { useAppDispatch } from "app/hooks";
import HeaderComponent from "components/Common/Header/Header";
import UserFeature from "features/User";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import style from "./Home.module.scss";
import { homeActions } from "./homeSlice";
export default function Home() {
  const { Header,Content } = Layout;
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(homeActions.fetchUserInfo());
  }, [dispatch]);


  return (
    <Layout className={style.root}>
      <Layout>
        <Header className={style.header}>
          <HeaderComponent visible={visible} setVisible={setVisible} />
        </Header>
        <Content>
          <Switch>
            <Route path="/user">
              <UserFeature/>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
