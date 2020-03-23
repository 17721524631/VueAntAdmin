let plugins = [
  // antd-vue 按需加载
  [
    "import",
    { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
  ]
]

//在打包的时候，加入移除控制台输出插件
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}
