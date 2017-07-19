# node

> This is a node project.

## Build Setup
``` bash
# install dependencies
npm install --production

# start project
node bin/www
```
## 项目介绍

> author 夜起叶落(34771695@qq.com) 欢迎大家指导交流

本项目为作者练习项目，采用express为框架，搭建了一个后台服务，可以提供部分接口，如果有前端爱好者想要设计小项目，作者可以提供接口。感谢大家多多交流。

## 项目接口
> 本项目启用需要依赖mongodb，可以自行在./router/index.js中改变地址

各个模块的接口均可以在小幺鸡API管理找到
v
- Log模块：[小幺鸡API管理](http://www.xiaoyaoji.cn/dashboard/#!/project/BBYjqs7Ct "小幺鸡API管理")

## 版本说明
### v1.1.1(2017/07/19)
1. 完善文件上传模块（未加校验，等待添加）

### v1.1.0(2017/02/14)
1. (优化)抽出task的controllers，后续controllers与路由独立
1. (修复)在保存数据后，返回保存的该条数据（带id）

### v1.1.0(2017/02/11)
1. (优化)整理路由，所有路由以index.js为主入口

### v1.0.0
1. 完成首页基本配置
1. 以及上传开源文档编辑工具editor.md