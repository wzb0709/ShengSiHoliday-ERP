import React, { useEffect, useState, Fragment, useCallback } from 'react'
import styles from './index.scss'
import { Icon, Layout, Menu, Tabs, Dropdown, Button, Row, Avatar } from 'antd'
import { menuList } from '@/utils/menuList'
import { router, Link } from 'umi'
import { IMenuItem } from '@/utils/menuList'
import { ClickParam } from 'antd/lib/menu'
import { useDispatch, useSelector } from 'dva'
import { IUserInfo } from '@/models/login'


const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

interface ITab {
  title: string
  key: string
  path: string
}

const MainLayout = (props: any) => {

  //控制侧边栏的开关
  const [collapsed, setCollapsed] = useState<boolean>(false)
  //tabs路由导航
  const [tabs, setTabs] = useState<Array<ITab>>([])
  //tabs的活动key
  const [activeKey, setActiveKey] = useState<string>('')
  //menu的key
  const [menuKey, setMenuKey] = useState<Array<string>>([])
  //控制content刷新
  const [refresh, setRefresh] = useState<boolean>(true)
  //控制菜单展开
  const [openMenu, setOpenMenu] = useState<Array<string>>(['1'])

  //判断用户是否登录
  const dispatch = useDispatch()
  const getUserInfo = useCallback(() => {
    dispatch({
      type: 'login/getUserInfo',
    })
  }, [dispatch])
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])


  //根据路由变化来生成tabs
  useEffect(() => {
    const router = props.children.props.location.pathname
    if (router === '/') {
      setMenuKey(['1'])
      setActiveKey('none')
      return
    }
    let routerList: Array<string> = router.split('/')
    menuList.forEach((item: IMenuItem) => {
      if (routerList.includes(item.path)) {
        item.children.forEach((item1: IMenuItem) => {
          if (routerList.includes(item1.path)) {
            const index = tabs.findIndex((tabItem: ITab) => tabItem.title === item1.title)
            let tmpTabs: Array<ITab> = [...tabs]
            if (index === -1) {
              const key = new Date().getTime().toString()
              tmpTabs.push({
                title: item1.title,
                path: router,
                key,
              })
              setActiveKey(key)
            } else {
              tmpTabs[index].path = router
              setActiveKey(tmpTabs[index].key)
            }
            setMenuKey([item1.id.toString()])
            setTabs(tmpTabs)
          }
        })
      }
    })
  }, [props.children.props.location.pathname])

  //当刷新参数变化时将其再次变化实现刷新
  useEffect(() => {
    if (!refresh) setRefresh(true)
  }, [refresh])

  //tabItem点击事件
  const handleTabClick = (key: string) => {
    const tab = tabs.find((tab: ITab) => tab.key === key)
    if (tab) router.push(tab.path)
  }

  //tab删除事件
  const handleTabRemove = (targetKey: string | React.MouseEvent<HTMLElement>, action: 'add' | 'remove') => {
    if (action === 'remove') {
      let tmpTabs: Array<ITab> = [...tabs]
      const index = tmpTabs.findIndex((item: ITab) => item.key === targetKey)
      tmpTabs.splice(index, 1)
      setTabs(tmpTabs)
      if (tmpTabs.length === 0) router.push('/')
      else router.push(tmpTabs[tmpTabs.length - 1].path)
    }
  }

  //获取用户信息
  const userInfo: IUserInfo = useSelector((state: any) => state.login.userInfo)

  //用户登出事件
  const handleUserLogout = () => {
    router.replace('/login')
    localStorage.clear()
  }

  //用户信息下拉菜单
  const menu = (
    <Menu>
      <Menu.Item onClick={handleUserLogout}>
        <Icon type="logout"/>
        登出账号
      </Menu.Item>
    </Menu>
  )

  //右侧下拉菜单点击事件
  const handleSelectMenu = (param: ClickParam) => {
    if (param.key === '0') {
      setRefresh(false)
    } else if (param.key === '1') {
      const tmpTab: ITab | undefined = tabs.find((item: ITab) => item.key === activeKey)
      if (tmpTab) setTabs([tmpTab])
    }
  }

  //菜单展开事件监听
  const handleMenuOpenChange = (openKeys: any) => {
    if (openKeys.length >= 3) {
      openKeys.splice(1, 1)
    }
    setOpenMenu(openKeys)
  }

  useEffect(() => {
    localStorage.setItem('height', document.body.clientHeight.toString())
  }, [props.children])

  const auth = (auth?:number) => {
    console.log(auth)
    if(!auth) return true
    let res = false
    const a = userInfo?.roleList?.forEach(item => {
      item.authList.forEach(item1 => {
        if(item1.id === auth){
          console.log(item1.title)
          res = true
        }
      })
    })
    return res
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible={true}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        className={styles.sider}
        style={{
          overflow: 'auto',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className='logo'>
          <div className={styles.title} style={{padding:collapsed ? '' : '10px'}}>
            {collapsed ?
              <div style={{lineHeight:'64px'}}>
                {userInfo.head_img !== '' &&
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Avatar size='large' src={userInfo.head_img} />
                </Dropdown>}
                {userInfo.head_img === '' &&
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Avatar size='large' style={{ backgroundColor: '#87d068' }} icon="user" />
                </Dropdown>}
              </div>
              :
              <Row type='flex'  style={{ height: '100%' }} justify='space-between'>
                {userInfo.head_img !== '' &&
                <Avatar size='large' src={userInfo.head_img} />}
                {userInfo.head_img === '' && <Avatar size='large' style={{ backgroundColor: '#87d068' }} icon="user" />}
                <div style={{width:100,textAlign:'left'}}>
                  <div>{userInfo.user_name}</div>
                  <div style={{fontSize:10,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{userInfo.dept_name} {userInfo.position}</div>
                </div>
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Icon type="poweroff" style={{marginTop:6}} />
                </Dropdown>
              </Row>
            }
          </div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['2']}
          defaultOpenKeys={['1']}
          mode="inline"
          selectedKeys={menuKey}
          onOpenChange={handleMenuOpenChange}
          openKeys={openMenu}
        >
          {menuList.map((item: IMenuItem) => {
            if (item.children.length > 0) {
              return auth(item.auth) && (
                <SubMenu
                  key={item.id}
                  title={
                    <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                      </span>
                  }
                >
                  {item.children.map(item1 => {
                    return auth(item1.auth) && (
                      <Menu.Item key={item1.id}>
                        <Link to={`/${item.path}/${item1.path}`}>{item1.title}</Link>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={item.id} onClick={() => router.push(item.path)}>
                  <Icon type={item.icon}/>
                  <span>{item.title}</span>
                </Menu.Item>
              )
            }
          })}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Tabs
            hideAdd={true}
            type="editable-card"
            style={{ paddingTop: 17, marginLeft: !collapsed ? 200 : 80 }}
            tabBarExtraContent={
              <div className="tab-option">
                <Dropdown
                  trigger={['click']}
                  overlay={
                    <Menu onClick={handleSelectMenu}>
                      <Menu.Item key="0">重新加载</Menu.Item>
                      <Menu.Item key="1">关闭其他</Menu.Item>
                    </Menu>}
                >
                  <Button type="primary" size="small">
                    标签选项 <Icon type="down"/>
                  </Button>
                </Dropdown>
              </div>
            }
            activeKey={activeKey}
            onTabClick={handleTabClick}
            onEdit={handleTabRemove}
          >
            {tabs.map((tab: ITab) => (
              <Tabs.TabPane tab={tab.title} key={tab.key}/>
            ))}
          </Tabs>
          <div style={{ position: 'relative' }}>
            <div
              className={styles.content}
              style={{ marginLeft: !collapsed ? 200 : 80 ,width:!collapsed ? 'calc(100vw - 240px)' : 'calc(100vw - 120px)'}}
              id='content'
            >
              {refresh && <Fragment>
                {props.children}
              </Fragment>}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
