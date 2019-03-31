# 记录一下我现在的心情吧
> 我发誓：这一篇将成为我最后一篇用中文写的Readme

### 起因
+ 别人的Readme写的太好，羡慕，极度，恨。<del>（行了吧）</del>
+ 最近这几天，爱睡觉，但日子过得，，，心情极差，效率极低。但是我现在不想放弃了，本来我还心虚。。。。
+ 走过的（分散的整整12个小时）的坑，（一下午）的坑，（一天）的坑太多，实在不甘心，这也是我效率低的原因。我不服气。
+ 我本来真的很不喜欢写这种blog的东西，因为我觉得有点浪费时间，可是，谁让我今天晚上的心情这么得差，又不困，全当是发泄了。
## 正题
### 已经解决的问题
+ `onChange`绑定三个不同、但类似的、表单提交事件
```javascript
onChange={e => this.handleChange({ username: e.target.value })}

onChange={e => this.handleChange({ password: e.target.value })}

onChange={e => this.handleChange({ remember: !e.target.value })}

//成功实例
handleChange = param => {
    this.setState({ ...this.state, ...param });
  };

//失败实例
handleChange =(e)=>{
    this.setState({
        username:e.target.value,
        password:e.target.value,
        remember:!e.target.value
    })
} // 它会说这个value不知道是哪一个
```
+ 安装问题
这里我真的要气死，我花的时间，我的心态。o(╥﹏╥)o
```npm
<!-- 失败的例子 -->

npx install -g create-react-app
create-react-app demo
cd demo
npm start

<!-- 到这里的确可以 -->
<!-- 前两步可以换成 `npx create-react-app demo` -->


<!-- 接着我想启用antd的组件库，这边我已经忘了我以前是怎么弄的，下次再试试 -->

npm i antd-init -g
antd-init

<!-- 总之就是没有webpack模块，create-react-app里有webpack，antd也有webpack，不知是不是冲突了 -->
<!-- 最终还是跟着antd的create-react-app中的教程来了 -->
```

因为我安装完create-react-app后发现package.json,东西很少啊，以为啥都没有，其实它是已经安装好了的，webpack的配置文件好像也在bin目录里，适合初学者，下次补个链接。

### 未解决的问题
+ eslint+husky+premiter
这边我快晕了，vscode有插件，这三个东西好有npm，还有规则，我不知道怎么写，npm完，还要配置路径，还是很糊涂····我不知道我这个project的标配是什么啊····
+ 导航栏 单页面切换
![homedemo](/src/homedemo.png)
![homedemo2](/src/homedemo2.png)
+ search/reset
antd 貌似直接做到了，前端，增，删，改，查，今天我就光弄了一个静态search，我本想模仿antd,但是参数实在太多了，不理解，看不懂。不会写查询，后端如果传过来加工，修改好的一组数组，我或许·······
+ 下拉框
```javascript
    <Col offset={1} span={19} className={'h_avatar'}>
         欢迎您，
        <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
            admin。
            <Icon type="down" />
        </a>
        </Dropdown>
    </Col>
//Dropdown 里不能写东西o(╥﹏╥)o
```

