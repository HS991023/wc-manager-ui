module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        //按需导入需要的element-ui组件
        ["@babel/preset-env", { "modules": false }]
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}