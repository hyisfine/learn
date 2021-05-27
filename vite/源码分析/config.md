# vite config 分析

------

本文旨在分析vite源码中对所有config来源的解析，及所用之处。



### config来源

1. [inlineConfig](https://github.com/vitejs/vite/blob/b6d12f71c1dbd5562f25bc2c32c44eed32b27e94/packages/vite/src/node/cli.ts#L62)，来自于命令行或npm script。
2. [vite.config.*](https://cn.vitejs.dev/config/)，用户的配置文件。
3. [Plugin.config](https://cn.vitejs.dev/guide/api-plugin.html#config)，插件的config方法返回的配置选项。



### 流程

入口

```javascript
const config = await resolveConfig(inlineConfig, 'serve', 'development')  
```

resolveConfig函数

```javascript

```

