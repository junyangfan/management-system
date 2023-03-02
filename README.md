# Vue 3 + TypeScript + Vite

# 项目运行步骤  
1. 克隆代码: `git clone git@gitlab.momoso.com:fanjunyang/supplier-manager.git`   
2. 进入项目目录: `cd supplier-manager`  
3. 安装依赖: `yarn`  
4. 启动本地开发环境: `yarn dev`  
5. 打测试包: `yarn build:test`  
6. 打正式包: `yarn build`  

# 开发规范
如果是VSCode，需要安装 `ESLint`、`Prettier` 插件，规范开发风格。  
详细规范配置参考项目下 `.eslintrc.cjs`、`.prettierrc.cjs` 文件

# commit 规范  
提交commit时，最好使用命令 `yarn cm` 来规范提交信息  
相关配置参考项目下 `commitlint.config.js` 文件  

# 相关 Iconfont 更新  
项目使用的Iconfont图标管理库(https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.db775f1f3&manage_type=myprojects&projectId=3823319)  
如需要新增相关图标，找 `fanjunyang` 开通权限  

# src目录结构
```

│  App.vue                        // 主页面入口
│  main.ts                        // 项目入口
│  style.css                      // 项目通用样式
│  
├─api                             // 接口管理
│  │  options.ts                  // 存放通用枚举属性
│  │  request.ts                  // 封装request请求
│  │  
│  ├─basic
│  │      api.ts
│  │      model.ts
│  │      
│  └─user
│          api.ts
│          model.ts
│          
├─assets
│      login-bg.png
│      
├─components
│  │  BasicInfo.vue               // 基本信息组件         
│  │  FullScreen.vue              // 全屏组件
│  │  Icon.vue                    // 图标组件
│  │  ImportFileModal.vue         // 导入文件组件
│  │  ImportImage.vue             // 导入图片组件
│  │  KindTip.vue                 // 温馨提示组件
│  │  Loading.vue                 // 全局Loading组件
│  │  PreviewImage.vue            // 预览图片组件
│  │  Print.vue                   // 打印组件(暂时不用)
│  │  
│  └─CloudTable                   // Table组件
│          CloudFormItem.vue      
│          CloudSearchForm.vue    // Table 搜索组件
│          index.vue
│          model.ts
│          
├─config                          // 项目通用配置
│      index.ts
│      
├─enum                            // 项目通用枚举
│      index.ts
│      
├─layout                          // 页面主布局
│      index.vue
│      
├─router                          // 路由管理
│  │  index.ts
│  │   
│  └─modules                       // 路由的各个模块
│          base.ts
│          note.ts
│          notFound.ts
│          
├─store                            // 项目仓库
│  │  index.ts
│  │  
│  └─modules                       // 仓库各个模块
│          app.ts
│          tab.ts
│          
├─typing                           // 项目通用 typing
│      components.d.ts
│      default.d.ts
│      vite-env.d.ts
│      
├─utils                            // 工具文件夹
│      aliOSS.ts
│      compileIcon.ts              // 处理Iconfont图标
│      index.ts
│      
└─views                            // 项目页面
```
