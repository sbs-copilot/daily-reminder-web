declare interface InitOptionsRule {
    /**
     * 写入到 pages 中的加载页路径
     * 注意：不要去修改
     */
    enterPagePathInPages?: string;
    /**
     * 插件文件目录 可以是绝对路径也可以是相对路径
     */
    pluginPath: string;
    /**
     * 日志或者检测文件输出地址
     */
    outputDir?: string;
    /**
     * 排除文件变动时不更新上下文 动态更新 pages.json 文件
     */
    exclude?: RegExp[];
    /**
     * 排除文件成功时回调函数
     */
    excludeCallBack?: (path: string) => void;
    /**
     * 指定解索入口位置
     *
     * 如果你的项目是将所有路由表放在一个目录下，你可以指定该字段
     * 插件将不会全项目解索 只会在该入口js中解索
     * 大大提高处理速度
     *
     * 可以是绝对路径也可以是相对路径
     */
    routesMain?: null | string;
    /**
     * app 启动项
     */
    app?: {
        /**
         * 是否等待首页渲染完毕后再关闭启动界面 默认为false
         */
        alwaysShowBeforeRender?: boolean;
        /**
         * 是否自动关闭启动界面 默认为false
         */
        autoclose?: boolean;
    };
    /**
     * 小程序的编译配置
     */
    applet?: {
        /**
         * 加载页配置信息
         */
        enterPage?: {
            /**
             * 用户自定义加载页样式风格配置
             */
            style?: Record<string, any>;
            /**
             * 用于重新定义加载页的整体内容
             */
            content?: string;
        };
    };
}

declare function vitePluginUniRouter(initOptions: InitOptionsRule): any[];
export default vitePluginUniRouter;

export { }
