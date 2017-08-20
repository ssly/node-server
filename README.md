## node

> This is a node project.

### Build Setup
``` bash
# install dependencies
npm install --production

# start projectv
node bin/www
```
### 项目介绍

> author 夜起叶落(34771695@qq.com) 欢迎大家指导交流

本项目为作者练习项目，采用express为框架，搭建了一个后台服务，可以提供部分接口，如果有前端爱好者想要设计小项目，作者可以提供接口。感谢大家多多交流。

### 项目接口
> 本项目启用需要依赖mongodb，可以自行在./router/index.js中改变地址

各个模块的接口均可以在小幺鸡API管理找到
v
- Log模块：[小幺鸡API管理](http://www.xiaoyaoji.cn/dashboard/#!/project/BBYjqs7Ct "小幺鸡API管理")

### 版本说明

#### v1.2.0(2017/08/21)
1. time函数转入common.js中
2. 更改后台端口为8081
3. 废弃以前的mongodb调用方法
4. 添加task模块的后台调用基础

#### v1.1.2(2017/07/27)
1. 新增time模块，返回xxxx-xx-xx xx:xx:xx: 格式时间戳，便于打印调试
2. 新增file模块，增加列表显示可下载的文件
3. 废弃mongoose写法，采用原生mongodb，并增加mongodb模块，返回db

#### v1.1.1(2017/07/19)
1. 完善文件上传模块（未加校验，等待添加）

#### v1.1.0(2017/02/14)
1. (优化)抽出task的controllers，后续controllers与路由独立
1. (修复)在保存数据后，返回保存的该条数据（带id）

#### v1.1.0(2017/02/11)
1. (优化)整理路由，所有路由以index.js为主入口

#### v1.0.0
1. 完成首页基本配置
1. 以及上传开源文档编辑工具editor.md