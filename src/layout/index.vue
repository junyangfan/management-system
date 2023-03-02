<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import FullScreen from '@/components/FullScreen.vue'
import { MenuProps, message, TabsProps } from 'ant-design-vue'
import { isProd } from '@/utils'
import { routes, BLACK_LIST } from '@/router'
import Icon from '@/components/Icon.vue'
import { Key } from 'ant-design-vue/lib/_util/type'
import { appStore, resetStore, tabStore } from '@/store'
import { userSingOut } from '@/api/user/api'
import ModifyPassWord from './ModifyPassWord.vue'
import Logo from '@/assets/logo.jpg'

interface ITabs {
  title: string
  path: string
  closable: boolean
  componentName: string
}

const tabOpera = tabStore()
const appOpera = appStore()
const userInfo = appOpera.userInfo || {}
const route = useRoute()
const router = useRouter()
const showRoutes = (routes || []).filter(({ meta }) => !meta?.hidden)
const collapsed = ref<boolean>(false)

const selectedKeys = computed<MenuProps['selectedKeys']>(() => {
  const redirectRoutePath = ['/', '/welcome']
  // path为 / 和 /welcome 都需要匹配
  if (redirectRoutePath.includes(route.path)) {
    return redirectRoutePath
  }
  return [route.path]
})

// 编辑Tab
const onTabEdit: TabsProps['onEdit'] = (key, action) => {
  if (action === 'remove') {
    tabOpera.removeTab(key as string)
  }
}

// 点击Tab
const onTabChange = (path: Key) => {
  router.push(path as string)
}

// 添加Tab
const addTab = (to: RouteLocationNormalized) => tabOpera.addTab(to)

// 关闭其他Tab
const closeOtherTabs = (tab: ITabs) => tabOpera.closeOtherTabs(tab)

// 新页面需要加Tab
router.afterEach((to) => addTab(to))

// 要缓存的页面
const keepAliveInclude = computed<string[]>(() => {
  return tabOpera.tabs
    .filter((tab) => !BLACK_LIST.includes(tab.path))
    .map((tab) => tab.componentName || '')
    .filter((compName) => compName && compName.trim())
})

const openKeys = ref<string[]>([])

// 展开菜单控制
const showMenu = () => {
  if (!route.meta?.singleMenu) {
    const path = (route.path.match(/^(\/[a-z-]+)\/[\s\S]*/i) || [])[1] || ''
    openKeys.value.push(path)
  }
}

onMounted(() => {
  addTab(route)
  showMenu()
  // 获取枚举配置信息
  appOpera.refreshEnums()
})

const breadCrumb = computed<Array<{ title: string | unknown; path: string }>>(() => {
  const path = route.path
  const routeConfig = (route.matched || []).find((i) => i.children)
  // 一级菜单
  if (routeConfig?.meta?.singleMenu) {
    return [{ title: routeConfig.meta?.title ?? '', path: routeConfig.path }]
  }
  // 二级菜单
  const levelRouteConfig = (routeConfig?.children || []).find((i) => path.endsWith(i.path))
  return [
    { title: routeConfig?.meta.title ?? '', path: routeConfig?.path ?? '' },
    { title: levelRouteConfig?.meta?.title ?? '', path: `${routeConfig?.path ?? ''}/${levelRouteConfig?.path ?? ''}` },
  ]
})

// 退出登录
const logOut = async () => {
  try {
    const rsp = await userSingOut()
    if (rsp) {
      message.success('退出登录成功！')
      resetStore()
      router.push('/login')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <a-layout class="layout_container">
    <!-- 左侧菜单 -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="layout_sider">
      <!-- 标头 -->
      <div class="sider_title">
        <!-- <Icon type="cm-supplier" :style="{ fontSize: '22px' }"></Icon> -->
        <img :src="Logo" alt="logo" style="width: 22px; border-radius: 2px" />
        <transition name="bounce">
          <span v-if="!collapsed" :style="{ marginLeft: '10px' }">管理系统</span>
        </transition>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :openKeys="openKeys">
        <template v-for="route in showRoutes" :key="route.path">
          <!-- 多级菜单 -->
          <template v-if="!route.meta?.singleMenu">
            <a-sub-menu :key="route.path">
              <template #title>
                <span>
                  {{ route.meta?.title }}
                </span>
              </template>
              <template #icon v-if="route.meta?.icon">
                <Icon :type="(route.meta?.icon as string)"></Icon>
              </template>
              <template v-for="subRoute in route.children || []" :key="subRoute.path">
                <a-menu-item v-if="!subRoute.meta?.hideInMenu" :key="`${route.path}/${subRoute.path}`">
                  <router-link :to="`${route.path}/${subRoute.path}`">
                    {{ subRoute.meta?.title }}
                  </router-link>
                  <template #icon v-if="subRoute.meta?.icon">
                    <Icon :type="(subRoute.meta?.icon as string)"></Icon>
                  </template>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
          <!-- 一级菜单 -->
          <template v-else>
            <a-menu-item :key="route.path">
              <router-link :to="route.path">{{ route.meta?.title }}</router-link>
              <template #icon v-if="route.meta?.icon">
                <Icon :type="(route.meta.icon as string)"></Icon>
              </template>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- 右侧内容 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="layout_content_header">
        <div class="content_header_left">
          <!-- 展开收起图标 -->
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          <!-- 路径 -->
          <a-breadcrumb :style="{ margin: '0 16px' }">
            <a-breadcrumb-item v-for="i in breadCrumb" :key="i.path">
              <router-link :to="i.path">{{ i.title }}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <span v-if="!isProd()" class="env_text">测试环境</span>
        <a-space class="content_header_info" size="middle">
          <FullScreen></FullScreen>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <a-space>
                <img
                  v-if="userInfo.avatarUrl"
                  :src="userInfo.avatarUrl"
                  :style="{ width: '30px', height: '30px' }"
                  alt=""
                />
                <span>
                  {{ userInfo.name }} <span v-if="userInfo.email">({{ userInfo.email }})</span>
                </span>
                <DownOutlined />
              </a-space>
            </a>
            <template #overlay>
              <a-menu>
                <ModifyPassWord></ModifyPassWord>
                <a-menu-item @click="logOut">
                  <a-space><logout-outlined />退出登录</a-space>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </a-layout-header>
      <!-- Tabs -->
      <div class="main_content_tabs">
        <a-tabs
          :activeKey="route.path"
          hide-add
          type="editable-card"
          destroyInactiveTabPane
          @edit="onTabEdit"
          @change="onTabChange"
        >
          <a-tab-pane size="small" v-for="(tab, idx) in tabOpera.tabs" :key="tab.path" :closable="tab.closable">
            <template #tab>
              <div>
                <a-dropdown :trigger="['contextmenu']">
                  <span>
                    {{ tab.title }}
                  </span>
                  <template #overlay>
                    <a-menu v-if="idx > 0">
                      <a-menu-item key="close" @click="() => closeOtherTabs(tab)"> 关闭其他标签 </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- 主内容 -->
      <a-layout-content class="layout_main_content">
        <!-- 路由插槽 -->
        <div class="main_content_slot">
          <router-view v-slot="{ Component, route }">
            <KeepAlive :include="keepAliveInclude">
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.content_header_left {
  display: flex;
  align-items: center;
}
.main_content_tabs {
  margin: 5px 16px;
}
.layout_main_content {
  margin: 0 16px;
  background: #ffffff;
  overflow: auto;

  .main_content_slot {
    padding: 16px 16px 0;
    position: relative;
  }
}
.env_text {
  color: red;
  font-size: 24px;
  font-weight: bold;
}
.content_header_info {
  display: flex;
  align-items: center;
}
.layout_content_header {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout_container {
  width: 100%;
  height: 100%;
  display: flex;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
.logo {
  width: 24px;
}

.layout_sider {
  color: rgba(255, 255, 255, 0.65);
  overflow: auto;
}

.sider_title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 10px 0;
  font-weight: bold;
}

:deep(.ant-layout-header) {
  padding: 0 18px !important;
  height: 50px;
}

.trigger {
  font-size: 18px;
}
</style>
