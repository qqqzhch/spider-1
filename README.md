## 前端本地开发脚手架

本地构建环境： `node v0.10.26` `npm 1.4.3` `grunt 0.4.5` `express3.18.4`

## 功能简介

spider 是一个前端服务化的项目构建脚手架，它不包含任何前端ui库和组件，使用者可以按照个人喜好整合ui和组件等，将它下载到本地便于二次开发。

- 脚手架使用Express框架开发，安装部署十分简单

- 前端资源使用grunt打包部署

- 模板使用velocity引擎，功能更加强大，可以自定义宏

- 支持全局或者私有定义layout布局、页头页脚、脚本样式，使用json配置前端资源，UI层更加强大灵活

- VIEW层解耦使得前后端专注于各自的开发，同时提高团队开发效率

- 脚手架遵循一定的结构，这样可以更好地规范化开发

## 下载及使用

1. 将项目克隆到本地：`git clone git@github.com:automatically/spider.git`

2. 切换到项目根目录下面，比如：`cd ~/spider`依次执行

    `npm install` 安装项目所需要的插件

    `grunt` 部署本地静态资源，成功后在项目根目录下会产出assets目录（只在初次执行）

    `node app.js` 访问：`http://localhost:3000`就可以看到本地环境的页面效果

### 如何在本地快速新建一个页面？

以项目中的singleForm案例来简述构建过程：

1. 在views/templates/mytest 下面建立一个模板文件`singleForm.vm`这个模板是页面的主体部分（其中不包含页面的头尾）

2. 在controllers/mytest下面建立一个nodejs文件`singleForm.js`用来mock业务数据和渲染模板

3. 在static/js/mytest/1.0.0下面建立一个singleForm.js就是页面对应的业务脚本

4. 在`gruntfile.js`里面新增样式脚本部署的相关配置（依赖配置在`package.json`的`alias`），完成后在项目根目录下执行`grunt native`打包部署静态资源

5. 在views/ui/mytest/config.json配置打包部署好的脚本

6. 在`routes.js`加入页面访问规则

7. 最后执行`node app.js`访问`http://localhost:3000/mytest/singleForm`预览页面效果

### Tips

- 每次pull下来先执行`npm install` 和 `grunt native`

- 每次对项目中的`js&css` 改动都需要手动执行`grunt native`或者在命令行执行`grunt watch`则会在后台监控，一旦代码改动就会自动部署，推荐这种方式

- 修改controllers下面的js文件需要重启node服务`node app.js`

### Q&A

- 问：这套ui-library主要用来完成什么任务？

答：下载代码，在本地快速搭建nodejs环境开发、部署静态资源，完成调试。

- 问：有没有案例可以参考一下呢？

答：本地访问： `http://localhost:3000/mytest/singleForm`

- 问：关于自己开发组件模块的规范是什么呢？

答：现在库里面已经有`cellula` `fdp`之类的公共模块了，理论上我们在开发环境中会涉及到2大类型的模块，一类是公共的模块，也就是可以供不同系统和业务使用的模块，它们通常是`js`底层的类库扩展或者是基于场景模型的构建，比如`cellula` `fdp`之类，它们存放在lib下面，另一类是纯业务型的模块组件，它们存放在`static`下面，而`assets`则是存放系统编译打包压缩后的`js&css`也就是在线上环境被调用的静态文件。

## 开发及构建

### 目录结构

	|-- assets 静态文件资源库 存放编译打包后的js&css（第一次使用需要先执行`grunt native`）
	|-- controllers 业务层
	|-- lib 公共js库
    |-- public 公共文件
	|-- static 静态文件
	|-- views
			|-- ui
			     |-- config
			     |-- theme
			     |-- home 测试
			           |-- config.json
			|-- templates
			     |-- home 测试
			           |-- layout
			                |-- default.vm 默认布局
			                |-- null.vm 空布局（自定义）
			           |-- screen
			                 |-- index.vm 首页
			                 |-- ...
	ui.js
    app.js 站点入口
    config.js 站点配置
	Gruntfile.js 静态资源部署脚本
	macros.js 宏定义
	routes.js 路由配置
	package.js 项目配置



### 构建工具

spider 使用[grunt](http://gruntjs.com)构建项目

