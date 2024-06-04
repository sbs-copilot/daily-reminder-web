import type { App as App_2 } from 'vue';
import { ComponentInternalInstance } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import type { ExtractPropTypes } from 'vue';
import type { InjectionKey } from 'vue';
import type { MatchFunction } from 'path-to-regexp';
import type { PathFunction } from 'path-to-regexp';
import type { Plugin as Plugin_2 } from 'vue';
import { Ref } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import type { RouteComponent } from 'vue-router';
import type { Router } from 'vue-router';
import { ShallowRef } from 'vue';
import type { Slot } from 'vue';
import { VNode } from 'vue';

export declare const __dynamicImportComponent__: dynamicImportComponentRule;

export declare const __plugin_uid__ = "__PLUGIN_U_RANDOM_HHYANG__";

declare class AbstractHistory {
    #private;
    index: number;
    stack: RouteRecordRow[];
    constructor();
    push(route: RouteRecordRow): void;
    replace(route: RouteRecordRow): void;
    replaceAll(route: RouteRecordRow): void;
    pushTab(route: RouteRecordRow): void;
    back(depth: number): void;
    getBackRoute(router: RouterRule, depth: number): {
        toRoute: LocationRawToMatcherRule[`toRoute`];
        newWindow: LocationRawToMatcherRule[`newWindow`];
        matched: LocationRawToMatcherRule[`matched`];
        checked: LocationRawToMatcherRule[`checked`];
    };
    getCurrentLocation(): string;
}

/**
 * api 返回类型是走什么模式 默认为 inside 模式
 * 只对 app 和小程序端有效
 * uni - 走uni-app的默认返回模式 按顶级页面返回
 * inside - 走插件内部实现模式 嵌套视图时 会根据嵌套层级返回
 */
export declare type backTypeRule = `uni` | `inside`;

export declare interface CallBackOptions<T> {
    add: (handler: T) => () => void;
    list: () => T[];
    reset: () => void;
    call: (...options: any[]) => void;
    listShow: T[];
}

/**
 * 根据需要渲染的route子页面 判断顶级页面实例是否正确
 *
 * 因为 uni-app 渲染过慢 此操作必须判断 否者会出现错乱挂载然后卸载的问题
 * 虽然是一瞬间肉眼无法察觉  但是会触发相应的生命周期
 */
export declare function checkParentInstance(router: RouterRule, route: RouteRecordRow, instance: ComponentInternalInstance | null): boolean;

export declare interface CompileAfterArgsRule {
    render: RawRouteComponent;
    componentName: string;
    importPathInfo: {
        firstDirName: string;
        realPagePath: string;
        inPagesPath: string;
        inPagesJson: boolean;
    };
}

export declare interface CompileAppOptionsRule {
    uni_h5: Plugin_2<[]>;
    platform: platformRule;
    routes: RouteRecordBaseRule[];
    tabbar: Array<{
        text: string;
        pagePath: string;
    }>;
    pagesPathList: Array<{
        firstDirName: string;
        realPagePath: string;
        inPagesPath: string;
        inPagesJson: true;
    }>;
}

export declare type ComponentGuardKeyRule = GuardKeyRule | `enterGuards`;

export declare function componentSetup(props: Readonly<LooseRequired<Readonly<ExtractPropTypes<{
    name: {
        default: string;
        type: StringConstructor;
    };
}>> & {}>>, ctx: {
    attrs: Data;
    slots: Readonly<InternalSlots>;
    emit: (event: string, ...args: any[]) => void;
    expose: (exposed?: Record<string, any> | undefined) => void;
}): () => VNode<RendererNode, RendererElement, {
[key: string]: any;
}> | VNode<RendererNode, RendererElement, {
[key: string]: any;
}>[] | null;

export declare function createRouter(options: InitRouterOptionsRule): RouterRule;

declare type Data = Record<string, unknown>;

export declare type dynamicImportComponentRule = (path: string, optios?: {
    pageType?: `top` | '';
    style?: Record<string, any>;
    package?: {
        type?: `main` | `child`;
        name?: string;
    };
}) => RouteRecordComponentRule;

export declare interface DynamicRouteMatchRule {
    path: string;
    name: string;
    params: Record<string, any>;
    query: Record<string, any>;
}

export declare type _ErrorHandler = (error: NavigationFailure) => any;

declare type ExecInstanceTaskRule<T> = Array<[
InstanceSpaceRule<T>
] | [
InstanceSpaceRule<T>,
string
] | InstanceSpaceRule<T>>;

export declare type ExternalHookMethodName = `historyListen`;

export declare interface ExternalHookMethodsRule {
    action: `lastEach` | `firstEach`;
    method: Function;
    name: ExternalHookMethodName;
    params: any[];
}

export declare interface GuardHookQueue {
    (router: RouterRule, to: RouteRecordRow, from: RouteRecordRow, navType: NavTypeRule): QueueHookRule;
}

export declare type GuardKeyRule = `updateGuards` | `leaveGuards`;

/**
 * h5 动画配置节点
 */
export declare interface H5AnimationNodeMapRule {
    [propName: string]: [
    /**
    * 前进时触发的动画规则
    * 数组第一位为新开窗口动画
    * 数组第二位为底层旧窗口动画
    */
    [
    string,
    string | undefined
    ],
    /**
    * 后退时触发的动画规则
    * 数组第一位为新开窗口动画
    * 数组第二位为底层旧窗口动画
    */
    [
    string,
    string | undefined
    ] | undefined
    ];
}

export declare interface InitRouterOptionsRule {
    /**
     * 路由表
     */
    routes: Readonly<RouteRecordBaseRule[]>;
    /**
     *  运行平台
     */
    platform: Readonly<platformRule>;
    /**
     * 是否保留uni-app的原始跳转方法
     * 保留的情况下 执行uni-app的跳转方法 不会触发路由跳转
     */
    keepUniOriginNav?: boolean;
    /**
     * api 返回类型
     */
    backType?: backTypeRule;
    /**
     * app或者小程序端在启动时
     * 启动失败的生命周期
     */
    launchedFail?: (err: NavigationFailure) => void;
    /**
     * 路由表未匹配到时触发该函数
     */
    routeNotFound?: (to: Record<string, any>) => RouteLocationRaw;
    /**
     * 开发环境下 非H5端热编译导致嵌套视图路径丢失的问题
     */
    hotRefresh?: {
        mode: `development` | `production`;
        to: RoutePushLocationRaw;
        navType: NavTypeRule;
    };
    /**
     * 路由锁配置
     */
    navigateLock?: {
        /**
         * 自动解锁状态集合 包含该状态时会自动解锁
         */
        autoUnlock?: NavigationFailureType[];
        /**
         * 路由锁 解锁函数 无论如何都会执行
         */
        detectBeforeLock?: (router: RouterRule, to: ToLocationRawRule, navType: NavTypeRule) => void;
    };
    /**
     * app 端专属配置
     */
    app?: {
        /**
         * app 端退出应用函数 如果默认不传递则走插件底层函数
         */
        runtimeQuit?: (title?: string) => void;
        /**
         * app 启动完成后会触发该函数
         */
        launchedHook?: () => void;
        /**
         * app 设置侧滑手势 仅ios支持
         */
        setSideSlipGesture?: (to: RouteRecordRow) => iosPopGestureRule;
    };
    /**
     * 小程序 端专属配置
     */
    applet?: {
        /**
         * 小程序 启动完成后会触发该函数
         */
        launchedHook?: () => void;
        /**
         * 是否自动隐藏原生导航栏小房子按钮
         */
        hideHomeButton?: boolean;
    };
    /**
     * H5 端专属配置
     */
    h5?: {
        /**
         * 切换页面的动画配置
         */
        animation?: {
            /**
             * 需要监听的跳转类型
             */
            includeNavtype: NavTypeRule[];
            /***
             * 动画配置
             */
            animationNodeMap: H5AnimationNodeMapRule;
            /**
             * 动画时长
             */
            animationTime: number;
            /**
             * 默认动画
             */
            defaultAnimationType: keyof H5AnimationNodeMapRule | ((to: RouteRecordRow, from: RouteRecordRow) => keyof H5AnimationNodeMapRule | null);
            /**
             * 动画窗口根节点
             */
            animationAppEl: HTMLElement | ((to: RouteRecordRow, from: RouteRecordRow) => HTMLElement | null) | string;
            /**
             * 动画创建之前的函数
             */
            beforeCreate?: (config: ProxyAnimationRule, to: RouteRecordRow, from: RouteRecordRow) => void | ProxyAnimationRule;
            /**
             * 动画完成之后
             */
            afterFinish?: (to: RouteRecordRow, from: RouteRecordRow) => void;
        };
    };
}

export declare function instanceFindParentId(router: RouterRule, instance: ComponentInternalInstance | null): number;

declare type InstanceRule = ComponentPublicInstance | undefined | null;

declare type InstanceSpaceRule<T> = (instance: T) => any;

declare type InstancesRule = Record<string, InstanceRule>;

declare type InternalSlots = {
    [name: string]: Slot | undefined;
};

/**
 * ios 上的侧滑手势
 */
export declare type iosPopGestureRule = `none` | `close` | `hide`;

export declare type Lazy<T> = () => Promise<T>;

export declare interface LocationRawToMatcherRule {
    fromRoute: RouteRecordRow;
    toRoute: RouteRecordRow | NavigationFailure;
    navType: NavTypeRule;
    newWindow: boolean;
    matched: RouteRecordMatched[];
    checked: boolean;
}

declare type LooseRequired<T> = {
    [P in keyof (T & Required<T>)]: T[P];
};

export declare interface MatcherLocation {
    name: RouteRecordName | null | undefined;
    path: string;
    params: RouteParams;
    meta: RouteMeta;
    matched: RouteRecordMatcherRow[];
}

export declare interface MatcherRule {
    dynamicLocationToRecordMatcher: (options: DynamicRouteMatchRule) => {
        matcher: RouteRecordMatcher | null | undefined;
        cloneOptions: DynamicRouteMatchRule;
    };
    pathFindRecordMatcher: (pathOrPagesPath: string) => RouteRecordMatcher | null;
    pathToRecordMatcher: (path: string) => RouteRecordMatcher | undefined;
    nameToRecordMatcher: (name: RouteRecordName) => RouteRecordMatcher | undefined;
    locationRawToMatched: (locationToRaw: RouteLocationObjectFormatRaw) => NavigationFailure | RouteRecordMatched[];
    addRoute: (record: RouteRecordBaseRule, parentMatcher?: RouteRecordMatcher | undefined, keyId?: number) => () => boolean;
    getMatcherMap: () => Map<string, RouteRecordMatcher>;
    removeRoute: (matcherRef: RouteRecordName | RouteRecordMatcher | undefined) => boolean;
}

export declare interface NavigateBackObjectFormatRaw extends RouteLocationBaseFormatRaw {
    delta: number;
}

export declare interface NavigateBackRaw extends RouteLocationObjectRaw {
    delta?: number;
    animationType?: string;
    animationDuration?: number;
    backType?: backTypeRule;
    from?: `backbutton` | `navigateBack`;
}

/**
 *  跳转失败 导航失败
 */
export declare interface NavigationFailure {
    type: NavigationFailureType;
    msg: string;
    from: RouteRecordRow;
    to?: RouteRecordRow | ToLocationRawRule;
}

/**
 * 0 表示 next(false)
 * 1 表示 next(unknownType)
 * 2 表示加锁状态，禁止跳转
 * 3 表示在获取页面栈的时候，页面栈不够level获取
 * 4 name 在路由表中未找到
 * 5 path 在路由表中未找到
 * 6 name及path 在路由表中未找到
 * 7 app及小程序端缓存的顶级页面currentRoute不存在 可能是插件的问题
 * 8 重复跳转到了相同的路径下
 * 9 h5端动态组件加载失败
 */
export declare type NavigationFailureType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export declare type NavigationGuard = (to: RouteRecordRow, from: RouteRecordRow) => Promise<void | boolean | RoutePushLocationRaw | RouteLocationRaw | NavigateBackRaw> | void | boolean | RoutePushLocationRaw | RouteLocationRaw | NavigateBackRaw;

export declare type NavigationGuardNextCallback = (vm: any) => any;

export declare interface NavigationGuardWithThis {
    (to: RouteRecordRow, from: RouteRecordRow): void;
}

export declare interface NavigationHookAfter {
    (to: RouteRecordRow, from: RouteRecordRow): any;
}

export declare type NavTypeRule = 'push' | 'pushTab' | 'replace' | 'replaceAll' | 'back';

export declare type normalizeRouteComponentsRule = Record<string, {
    componentName: string;
    component: RawRouteComponent;
}>;

export declare type NotBackNavTypeRule = Exclude<NavTypeRule, 'back'>;

export declare type objectAny<K extends keyof any, T> = {
    [P in K]: T;
};

export declare function onBeforeRouteLeave(guard: NavigationGuardWithThis): void;

export declare function onBeforeRouteUpdate(guard: NavigationGuardWithThis): void;

declare type OptionHookNameRule = `onLaunch` | `onInit` | `onLoad` | `onReady` | `onHide` | `onUnload` | `onShow` | `beforeCreate` | `created` | `beforeMount` | `beforeUnmount` | `mounted` | `unmounted` | `beforeUpdate` | `updated`;

export declare type PageTypeRule = `component` | `page` | `app`;

/**
 * 执行指定路由页面的函数
 */
export declare function parserInstance<T>(name: string, taskList: ExecInstanceTaskRule<T>): null | true;

export declare type platformRule = `h5` | `app` | `mp-toutiao` | `mp-weixin` | `mp-baidu` | `mp-alipay` | `mp-qq` | `mp-lark` | `mp-jd` | `mp-kuaishou`;

declare type PositionHookNameRule = `bm` | `m` | `bu` | `u` | `bum` | `um` | `onShow` | `onHide` | `onLaunch` | `onLoad` | `onReady` | `onUnload` | `onInit`;

/**
 * 动画 beforeCreateHook 生命周期 返回的数据格式
 */
export declare interface ProxyAnimationRule {
    animationNode: [string, string | undefined] | undefined;
    animationTime: number;
}

export declare type PushWithRedirectRule = void | NavigationFailure | undefined;

/**
 * hook 执行结果
 */
export declare type QueueHookRule = Promise<{
    /**
     * -1 本次守卫执行完毕 可正常进行下一个守卫
     * -2 守卫返回重定向操作 跳转到其他路径
     * 0 守卫返回终止导航指令 跳转失败 next(false)
     * 1 守卫返回未知状态码 跳转失败 next(unknownType)
     * 2 h5端动态组件加载失败
     */
    nextCode: -1 | -2 | 0 | 1 | 2;
    nextHook: (() => Promise<PushWithRedirectRule>) | null;
    msg: string;
}>;

export declare type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

export declare interface RouteLocationBaseFormatRaw {
    success: Function;
    fail: Function;
    complete: Function;
    navType: NavTypeRule;
    animationType?: string;
    animationDuration?: number;
}

export declare interface RouteLocationNameRaw extends RouteLocationObjectRaw {
    name: string;
    params?: Record<string, any>;
    query?: Record<string, any>;
    path?: string;
}

export declare interface RouteLocationObjectFormatRaw extends RouteLocationBaseFormatRaw {
    path?: string;
    name?: string;
    params?: Record<string, any>;
    query: Record<string, any>;
}

export declare interface RouteLocationObjectRaw {
    success?: Function;
    fail?: Function;
    complete?: Function;
    navType?: NavTypeRule;
}

export declare interface RouteLocationPathRaw extends RouteLocationObjectRaw {
    query?: Record<string, any>;
    path: string;
}

export declare interface RouteLocationPushNameRaw extends RouteLocationNameRaw {
    events?: Record<string, any>;
}

export declare interface RouteLocationPushPathRaw extends RouteLocationPathRaw {
    events?: Record<string, any>;
}

export declare interface RouteLocationPushRaw extends RouteLocationObjectRaw {
    animationType?: string;
    animationDuration?: string;
}

export declare type RouteLocationRaw = string | RouteLocationPathRaw | RouteLocationNameRaw;

export declare interface RouteMeta extends Record<string | number | symbol, unknown> {
}

export declare type RouteParams = Record<string, RouteParamValue | RouteParamValue[]>;

export declare type RouteParamsRaw = Record<string, RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]>;

export declare type RouteParamValue = string;

export declare type RouteParamValueRaw = RouteParamValue | number | null | undefined;

export declare type RoutePropsBaseRule = string | boolean | ((to: RouteRecordRow) => Record<string, any>);

export declare type RoutePushLocationRaw = string | RouteLocationPushPathRaw | RouteLocationPushNameRaw;

export declare const routerAbstractRouteskey: InjectionKey<ShallowRef<Record<number, RouteRecordRow>>>;

export declare interface RouteRecordBaseRule {
    path: string;
    name?: string;
    aliasPath?: string;
    pagesPath?: string;
    redirect?: ((to: RouteRecordRow, from: RouteRecordRow) => RouteLocationRaw) | RouteLocationRaw;
    meta?: RouteMeta;
    beforeEnter?: NavigationGuard;
    props?: Record<string, RoutePropsBaseRule>;
    children?: RouteRecordBaseRule[];
    component?: RouteRecordComponentRule;
    components?: Record<string, RouteRecordComponentRule>;
}

export declare type RouteRecordComponentRule = () => CompileAfterArgsRule;

export declare type RouteRecordMatched = RouteRecordMatcher;

export declare interface RouteRecordMatcher {
    record: RouteRecordMatcherRow;
    reg: RegExp;
    match: MatchFunction<object>;
    compile: PathFunction<object>;
    parentMatcher: RouteRecordMatcher | undefined;
}

export declare interface RouteRecordMatcherRow {
    path: RouteRecordBaseRule['path'];
    pagesPath: RouteRecordBaseRule['pagesPath'];
    redirect: RouteRecordBaseRule['redirect'] | undefined;
    name: RouteRecordBaseRule['name'] | undefined;
    meta: Exclude<RouteRecordBaseRule['meta'], void>;
    props: Record<string, RoutePropsBaseRule>;
    beforeEnter: RouteRecordBaseRule['beforeEnter'];
    components: normalizeRouteComponentsRule | null | undefined;
    children: RouteRecordBaseRule[];
    _parentId: number;
    _selfId: number;
    leaveGuards: Set<NavigationGuard>;
    updateGuards: Set<NavigationGuard>;
}

export declare type RouteRecordName = string | symbol;

export declare interface RouteRecordRow {
    fullPath: string;
    path: string;
    params: Record<string, any>;
    query: Record<string, any>;
    meta: Exclude<RouteRecordBaseRule['meta'], void>;
    name: RouteRecordBaseRule['name'] | undefined;
    matched: RouteRecordMatched[];
    navType: NavTypeRule;
}

export declare type RouteRecordRowMap = Record<string, {
    to: RouteRecordRow;
    from: RouteRecordRow;
}[]>;

export declare interface RouterMethodToH5MethodRule {
    push: `push`;
    pushTab: `replace`;
    replace: `replace`;
    replaceAll: `replace`;
    back: `go`;
}

export declare interface RouterMethodToUniNavMethodRule {
    push: `navigateTo`;
    pushTab: `switchTab`;
    replace: `redirectTo`;
    replaceAll: `reLaunch`;
    back: `navigateBack`;
}

export declare interface RouterRule {
    initOptions: InitRouterOptionsRule;
    initEnvOptions: {
        matcher: MatcherRule;
        vueRouter: Router | null;
        compileOptions: CompileAppOptionsRule;
        h5UniRoutes: Array<{
            path: string;
            alias?: string;
            name?: string;
            component: {
                setup: () => void;
            };
            loader: any;
            meta: Record<string, any>;
            children?: RouteRecordBaseRule[];
        }>;
        beforeGuards: CallBackOptions<NavigationGuardWithThis>;
        afterGuards: CallBackOptions<NavigationHookAfter>;
        resolveGuards: CallBackOptions<NavigationGuardWithThis>;
        errorHandlers: CallBackOptions<_ErrorHandler>;
        uniMethods: {
            navigateTo: RouterRule[`push`];
            redirectTo: RouterRule[`replace`];
            reLaunch: RouterRule[`replaceAll`];
            switchTab: RouterRule[`pushTab`];
            navigateBack: RouterRule[`back`];
        };
    };
    expandOptions: {
        currentRouteMap: RouteRecordRowMap;
        externalHookMethodsMap: Record<ExternalHookMethodName, ExternalHookMethodsRule[]>;
        waitRunHooks: Array<{
            runOriginalHook: () => void;
            hookName: OptionHookNameRule | PositionHookNameRule;
        }>;
        restoreHokHooks: Array<() => void>;
    };
    history: AbstractHistory;
    currentRoute: ShallowRef<RouteRecordRow>;
    abstractRoutes: ShallowRef<(Record<number, RouteRecordRow>)>;
    $lockStatus: boolean;
    _runtimeId: number;
    _launched: boolean;
    _patch: {
        getCurrentPages?(): ComponentPublicInstance[];
        _ksFirstRedirect: boolean;
    };
    getRouterView(): {
        uniSimpleRouterView: App_2;
    };
    externalMethodToCache(router: RouterRule, options: ExternalHookMethodsRule): void;
    beforeEach(guard: NavigationGuardWithThis): () => void;
    afterEach(guard: NavigationHookAfter): () => void;
    beforeResolve(guard: NavigationGuardWithThis): () => void;
    installRouter(router: RouterRule, app: App_2, options: CompileAppOptionsRule): void;
    push(to: RoutePushLocationRaw): Promise<void | NavigationFailure | undefined>;
    pushTab(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined>;
    replace(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined>;
    replaceAll(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined>;
    back(to: NavigateBackRaw | number | undefined): Promise<void | NavigationFailure | undefined>;
    onError(handler: _ErrorHandler): () => void;
    addRoute(parentOrRoute: RouteRecordName | RouteRecordBaseRule, route?: RouteRecordBaseRule): () => boolean;
    removeRoute(matcherRef: RouteRecordName | RouteRecordMatcher): boolean;
    utils: {
        locationAppHome: (router: RouterRule, enforce?: boolean, enterQuery?: objectAny<string, any>) => never | (() => Promise<PushWithRedirectRule>);
        pagesPathIsTabbar: (pagesPath: string) => boolean;
        appletMixins: (router: RouterRule, app: App_2, rootComponent: Record<string, (() => void) | undefined>) => void;
        setComponentInstances: (router: RouterRule, componentId: number, instances: InstancesRule) => void;
        removeComponentInstances: (router: RouterRule, componentId: number, instanceName: string) => true;
        START_LOCATION_NORMALIZED(): RouteRecordRow;
    };
}

/**
 * 工具函数 用于校验to和from之前是否为新开窗口
 */
export declare function toIsNewWindow(to: RouteRecordRow, from: RouteRecordRow): boolean;

export declare type ToLocationRawRule = RoutePushLocationRaw | RouteLocationRaw | NavigateBackRaw | number | undefined;

export declare interface UniappComponent {
    mpType: PageTypeRule;
    onHide?: () => void;
    onLaunch?: () => void;
    onShow?: () => void;
    setup?: () => any;
}

export declare type UniNavMethodRule = `navigateTo` | `redirectTo` | `reLaunch` | `switchTab` | `navigateBack`;

export declare interface UniNavMethodToRouterMethodRule {
    navigateTo: `push`;
    switchTab: `pushTab`;
    redirectTo: `replace`;
    reLaunch: `replaceAll`;
    navigateBack: `back`;
}

export declare interface UniRouteRule {
    path: string;
    alias?: string;
    name?: string;
    component: {
        setup: () => void;
    };
    loader: any;
    meta: Record<string, any>;
    children?: RouteRecordBaseRule[];
}

/**
 * Returns the current route location. Equivalent to using `$Route` inside
 * templates.
 */
export declare function useRoute(): Ref<RouteRecordRow>;

/**
 * Returns the router instance. Equivalent to using `$Router` inside
 * templates.
 */
export declare function useRouter(): RouterRule;

export declare const viewDepthKey: InjectionKey<number | Ref<number>>;

export { }
