import { hasInjectionContext, inject, version, unref, defineComponent, ref, provide, createElementBlock, shallowReactive, h, watch, Suspense, nextTick, Transition, useSSRContext, createApp, effectScope, reactive, computed, mergeProps, getCurrentInstance, markRaw, isRef, isReactive, toRef, toRaw, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, shallowRef, isReadonly, getCurrentScope, onScopeDispose, toRefs, isShallow, withCtx, openBlock, createBlock, defineAsyncComponent } from 'file://C:/Users/dosor/Desktop/win95/node_modules/vue/index.mjs';
import { $fetch } from 'file://C:/Users/dosor/Desktop/win95/node_modules/ofetch/dist/node.mjs';
import { b as baseURL } from '../_/renderer.mjs';
import { createHooks } from 'file://C:/Users/dosor/Desktop/win95/node_modules/hookable/dist/index.mjs';
import { getContext } from 'file://C:/Users/dosor/Desktop/win95/node_modules/unctx/dist/index.mjs';
import { sanitizeStatusCode, createError as createError$1 } from 'file://C:/Users/dosor/Desktop/win95/node_modules/h3/dist/index.mjs';
import { getActiveHead } from 'file://C:/Users/dosor/Desktop/win95/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/dosor/Desktop/win95/node_modules/@unhead/shared/dist/index.mjs';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'file://C:/Users/dosor/Desktop/win95/node_modules/vue-router/dist/vue-router.node.mjs';
import { withQuery, hasProtocol, parseURL, isScriptProtocol, joinURL, isSamePath } from 'file://C:/Users/dosor/Desktop/win95/node_modules/ufo/dist/index.mjs';
import { toRouteMatcher, createRouter as createRouter$1 } from 'file://C:/Users/dosor/Desktop/win95/node_modules/radix3/dist/index.mjs';
import { defu } from 'file://C:/Users/dosor/Desktop/win95/node_modules/defu/dist/defu.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderSlot, ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'file://C:/Users/dosor/Desktop/win95/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/devalue/index.js';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/@unhead/ssr/dist/index.mjs';
import '../runtime.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/unenv/runtime/fetch/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/dosor/Desktop/win95/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/dosor/Desktop/win95/node_modules/ipx/dist/index.mjs';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "prerender" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0 ,
    component: () => import('./index-KqdzCEv0.mjs').then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    useError();
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.fullPath !== initialURL && (to.redirectedFrom || !isSamePath(to.fullPath, initialURL))) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
const isVue2 = false;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia") ;
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration") ;
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } 
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) );
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const plugin = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin$1,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY
];
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const Computerwithprograms = "data:image/x-icon;base64,AAABAAIAICAQAAEABADoAgAAJgAAABAQEAABAAQAKAEAAA4DAAAoAAAAIAAAAEAAAAABAAQAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAMDAwACAgIAAAAD/AAD/AAAA//8A/wAAAP8A/wD//wAA////AAAAAAAAAAAAAAAAAAAAAACIiIiIiIiIiIiIiIiIiAAAj3d3d3d3d3d3d3d3d3iAAI93d3d3d3d3d3d3d3d4iACPdyJ3d3d3d3d3eHd3eIiAj3eqd3d3d3AAAAAAB3iIgI93d3d3d3d4iIiIiId4iICPd3d3d3d3d3d3d3d3eIiAj/////////////////iIgAiIiIiIiIiIiIiIiIiHiIAAAAAAAAAAAAAAAAAAiHiAAAiIiIiIiIiIiIiIiAiHgAAI93d3d3d3d3d3d3iAiIAACPf///////////94iAAAAAj3RERERERERERPeIgAAAAI9wzMzMzMzMzMT3iIAAAACPcMzMzAAAAAzE94iAAAAAj3DMzMyP//8MxPeIgAAAAI9wzMAAj///DMT3iIAAAACPcMzI/4///wzE94iAAAAAj3DMyP9EREQMxPeIgAAAAI9wzMj///DMzMT3iIAAAACPcM7AAAAAzMzE94iAAAAAj3DOzMzMzMzMxPeIgAAAAI9wzMzMzMzMzMT3iIAAAACPcAAAAAAAAAAE94iAAAAAj3iIiIiIiIiIiPeIgAAAAI93d3d3d3d3d3d3iIAAAAAI/////////////4iAAAAAAId3d3d3d3d3d3f4gAAAAAAId3d3d3d3d3d3f4AAAAAAAIiIiIiIiIiIiIiAAAgAAADwAAAAcAAAADAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAOAAAADgAAAA4AAAAeAAAAfgAAAH4AAAB+AAAAfgAAAH4AAAB+AAAAfgAAAH4AAAB+AAAAfgAAAH4AAAB+AAAAfgAAAH4AAAB/AAAAf4AAAH/AAAB/4AAA8oAAAAEAAAACAAAAABAAQAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAMDAwACAgIAAAAD/AAD/AAAA//8A/wAAAP8A/wD//wAA////AAAAAAAAAAAAiIiIiIiIiACPend3d4d4gI93d3AAAHiAj///////+IAAAAAAAAAIgAiIiIiIiICACPd3d3d3iAAI9wREREeIAAj3DMzMR4gACPcMzMxHiAAI9wzMzEeIAAj3AAAAB4gACP//////iAAAh3d3d3f4AAAIiIiIiIgAgAMAAAABAAAAAAAAAAAAAAAAAACAAAAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAADAAQAA4AMAAA==";
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: Computerwithprograms
});
const _imports_0$f = "" + __buildAssetsURL("GodotLogo.C1iDOFNw.png");
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _imports_0$f
});
const _imports_0$e = "" + __buildAssetsURL("UnityLogo.BkCSGd3u.png");
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _imports_0$e
});
const apple = "" + __buildAssetsURL("apple.DmNghmug.png");
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: apple
});
const apple2 = "" + __buildAssetsURL("apple2.BH3vfWNr.png");
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: apple2
});
const apple3 = "" + __buildAssetsURL("apple3.DLQ09TwX.png");
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: apple3
});
const bio = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAACAgIDAwMAAAAD///8AgIAA//8AAIAAAP8A/wAAgACZBxulAAAAAXRSTlMAQObYZgAAAAFiS0dEBI9o2VEAAAAHdElNRQfiBBMBJCt84jxJAAAA5UlEQVQ4y62TyxHCIBCGoYQFGghJASBagJEGMk6sxbsXW/Dq0SpNsuSxPEad8ePGNz9kNwtjExwobEZoApiwz+l+tQjlCTAL3kYnfSFqt6KI6FeouJTFGQ86JKLDi2PR9x3WkIjrfeSWCuxWnQrsyumPwpVEUnlZhNamotTE38VmpohotkMyCGfywyChzgsrZHZyJVQomKNYASggpkLBfQwEEd09zugn8XguL2NArOI1i2m4dx+PUjoVJhvQFgON9GS1lcXAcU+XBlcIQBzwIVD4pPD8VdpBbHmmCJP/FyHApIvBwBu9bp7SZvn+ewAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNC0xOVQwMTozNjo0My0wNDowMNV8Hl4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDQtMTlUMDE6MzY6NDMtMDQ6MDCkIabiAAAAAElFTkSuQmCC";
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: bio
});
const _imports_1$a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBhgXBwzSK/XgAAAAjElEQVRIx+2VQQrAIAwE1+K/oz9rX5ZeiopaTazFHronETMOIRCDK44hiDP5jY1H6pZ7gJEhNsm/iQHAjwBUIJSAEmF15aEBoRcqAwKDwdiTu8LAdxB5bP9JOwoDkgFeNKjD5xvc2wh7oLVRGNSR8w2+PImr54BGAP8cyLLeQL1YGgbHECDuWtF6LytPTdMhXzC2L6sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MDc6MTItMDQ6MDDinXh7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjA3OjEyLTA0OjAwk8DAxwAAAABJRU5ErkJggg==";
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _imports_1$a
});
const _imports_0$d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAACZmQAAAAD4+Pj//5nMzGb/zJn////5no2yAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQfiBhgXARMJeV+TAAABE0lEQVQ4y82TzQ3CMAyFywhtxb1iA1QWQLJ858AGlvcfAfs5aRMTceapaoVfPv9FTNMPzdDyFb/s0H3LxkqhjFwexXhuYyAjB5CRE0jI9X3qNVfZkXUfautSFQkzL9nwIAlJNixExKSJELGgQJlge9jzJQPnzeoJL4uPDAiORB3B3pM34J52hADg1BVXE3ZbA785sCZVBULt5BwtAUuTCypEiSNVNCmM8UTTrsxTL66kzRyOYOGoXYuXRB40wLrVbkAUttdRg33dFL16Lj264siF9OThZkBcKqFVrYSfjWVo7MuIdkBcNoBzV1K2YQQ+Gqk8HPtGYXZIK1EuNJwyIGagGE2RSNHudR5qmW5jff2F/1wfr4rjk5A1shsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MDE6MTktMDQ6MDDthFzGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjAxOjE5LTA0OjAwnNnkegAAAABJRU5ErkJggg==";
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _imports_0$d
});
const mail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAACAgIDAwMAAgID///8AgAAAAP+AAAAAAAD/AAAAAIBSZDZVAAAAAXRSTlMAQObYZgAAAAFiS0dEBI9o2VEAAAAHdElNRQfiBhgXETDh3DywAAABh0lEQVQ4y23TsWrDMBAGYPsNqmCC6CbZBa8NNHuEGrq24FK81tbgsXTJ5pQMmUsgT+Bg/JQ9SSdbqn2Q5f/y54QjR5Edoj8wd1Ew8d2KRISnafpI/JzELOGEb8Sb4IUvKyK0PGRpAeMJhEaei20NMu1JJEqhdOV1gq9RdKNoR7j+jqLnY4TD4duXrh0b14tEoQBl7zes/GgoEGLbAKEAT9AoWwRhGlLmAPW0JEmkuPhQlvZcq0Ti5Lij6yfYO/jcQqN0P+WDqovOLIl5ADel8FhxamCPUDZK1baxsbDH5YNSTdBwcFNN0y3Bu1LDYIDMGwaIDAAKN9MgMmyslW1AHsJxbRvwp4VwPt4PQ29vSFL5cHqxwCVLqsrBkZ52FCHz4XzaEWoO5cA8rBy+T/6Dfr65zgF6c2+50MCBRKbzEAQI5gCtByCYE9rbV4BnmawyziXmhLYORCYBGHFgbsKZa+FiBigLYIVPQMf3RssEU+6EzXIUNs+tsIXcCFvKtbDFHIQt5yBB/ge5pdMZ3n2ecAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNi0yNFQyMzoxNzo0OC0wNDowMM+D9pEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDYtMjRUMjM6MTc6NDgtMDQ6MDC+3k4tAAAAAElFTkSuQmCC";
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: mail
});
const noss = "data:image/webp;base64,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";
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: noss
});
const _imports_0$c = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAJ1BMVEUAAACAgIDAwMD///8AAAAAgICAAICAgAAAAICAAAAA//8AAP//AACkLexpAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBBMBIhJ1vRPHAAABzklEQVQ4y9WTv2sbMRTHz6XZ82T5rFWqS4o79bxlspznq0MnG58T8BQIqVd3CAQyREFptGYqXQ+83Jyh0D+g/1b143S2afeQ73DD+/DRk550SfLyAYD/ld/wLBO0CJlt6y3SFkJwCSHYAJKeucy7Puv1sK4fZF2Ne6nJAf8qdsOPaAAs/bYHCAmLtZgmscRDjjxoCzpZ4b9NWhkjWpn8OmRxHkFbgOpNmKwbm8YgnFGCD4/C2NwDorq5mbszEgFG9XIlJnYckqKClTF6GAzojB/F5N1gI1ESuri6utS1Ac7oVxtE4LntAeYwGMQZdikr9FZFsZTsbmv47agsHZN+8Qxqa7jQ0ad8KsTmN1HB6FgjglmWlctRNL589ndB73lOBmVZjGoD4pCUA1W1PIlGELrUgawqi5PYox6VB/09I4J1PuuX5XPcFVgDwA4X4XtHVB81uWsMjkjsp8sk4b/kh8OmBz398yQEk2v3YghNGoP+uLXrcQ0p4gUfJk2PAATDCwBOkx3j9KcDnDVXW/fwzR0BjXq4Y/jt+kdNJTQGhJPzMDDJ/bsCa+hwcp4v0nRxOfJGQtGYONxxNTh+P5fUg7euYkJQTadT1Ntf59XkL7hXsT3cCr1SAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA0LTE5VDAxOjM0OjE4LTA0OjAwm26U/QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNC0xOVQwMTozNDoxOC0wNDowMOozLEEAAAAASUVORK5CYII=";
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _imports_0$c
});
const _imports_5$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAACGhoYiIiL/+/DAwMD4+PiAgAD//5nMzGaZmQDn59YAM5mgoKQAMzMAAAD/zJkICAgzMwD///8PLrXJAAAAAXRSTlMAQObYZgAAAAFiS0dEEnu8bAAAAAAHdElNRQfiBhgXAzXpQrjsAAABbklEQVRIx8WU63KFIAyEtVoj1rr1/V+2QAImXBztn64zRxz3I5vgnGH4N40fL/3T/IoYp+kVMX5Or4iw/xsi+W+J5dLlvyEWSlq1v0t4/8py1t8hav/2dUsstX/XNbi3BtD0B8L5l8t3BRi/ClUTDBT+XTElEYGGf7c1LFD6NxssEAZw48YKVvHP8hTlCQ24cWZ5G//kRVQkBHBPxEQE3PRAxMTBAHUFucH3yDV6AOwahAjEGhUAY+QbYRXipxcJKlG4bgGwNZfwF5DbtgCKFTIWgJsxXQ3IImRifwlkX3pKodx8nAWAEpMJxZOAO86zrgANQvXtK5wtwA6HJBC4CQHamVISNdkGoF7n/LwCagD5eNMwoQ+OehXSvqZhGykT0K2wn/stIjUHm4tAl1AAVBNpAR6TxCqA8pujnIXNpAEhQOYLJb07oQDyB5fTX/mlRq9CagN6otQA9GlRmmbam58v4NmfmVPAcD7S8Bf9AlndNmHeYjB7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI0VDIzOjAzOjUzLTA0OjAwyUvdTwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNFQyMzowMzo1My0wNDowMLgWZfMAAAAASUVORK5CYII=";
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _imports_5$1
});
const _imports_1$9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAn1BMVEUEBARmmZkEBAT//////8zAwMD/+/Dn59aZmcxmzP+ZzP+Z///MzP/M7P/M//+myvCtqZDA3MCysrLj4+Pq6uozZjOZmWbx8fHd3d1mZjPMzJkAmQA5OTmGhoaWlpZmmQAzMwDX19dmzDMzZgAzADN3d3dCQkIzmQDMzDNmADPMzMyZAMxmM8wAZgBmmWb/zJn//5nv1sbMzGbMmWaZmQDRaygJAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBhoANySLuBaXAAABFklEQVQ4y72T2VaDMBRFKWUIN4RWEWpIK7GhUgSlYv//28wFB4YFPukOD1lrb84TGMbfs1rGNFbrWay1ZWPgzGDpsxSgX1qwBgsumTJYcIkHFKhPWcAY3egrEPTuTwAe+EAZ1Z5RffVwwR0s+F8L2xssCPr+AoB9GzIWBHdRDLADgr4X2Pew5RwXErE/hA9bgr4X8APwVD7SkB1Vtj/xJ4K+F8j8dE4Lzo7nSKhCiYi4wyDPZK6EfJapKJXMeDkOVCmkUCKTsoqqF/mqxoF+rSpUpZL68nap9RkHPG4SFPhoknoc1J8y0adBJkErm1a+I+Og6WjdNb7G8TiYMgzm+P6idt1xnZmg887Et4G9iGmYv/AP/+4HWvYoXh4iozkAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjZUMDA6NTU6MzYtMDQ6MDD6UapqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI2VDAwOjU1OjM2LTA0OjAwiwwS1gAAAABJRU5ErkJggg==";
const _imports_2$7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEUAAACZmQAAAAD4+Pj//5nMzGb/zJn////5no2yAAAAAXRSTlMAQObYZgAAAAFiS0dEBxZhiOsAAAAHdElNRQfiBhgXARMJeV+TAAABE0lEQVQ4y82TzQ3CMAyFywhtxb1iA1QWQLJ858AGlvcfAfs5aRMTceapaoVfPv9FTNMPzdDyFb/s0H3LxkqhjFwexXhuYyAjB5CRE0jI9X3qNVfZkXUfautSFQkzL9nwIAlJNixExKSJELGgQJlge9jzJQPnzeoJL4uPDAiORB3B3pM34J52hADg1BVXE3ZbA785sCZVBULt5BwtAUuTCypEiSNVNCmM8UTTrsxTL66kzRyOYOGoXYuXRB40wLrVbkAUttdRg33dFL16Lj264siF9OThZkBcKqFVrYSfjWVo7MuIdkBcNoBzV1K2YQQ+Gqk8HPtGYXZIK1EuNJwyIGagGE2RSNHudR5qmW5jff2F/1wfr4rjk5A1shsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MDE6MTktMDQ6MDDthFzGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjAxOjE5LTA0OjAwnNnkegAAAABJRU5ErkJggg==";
const _imports_3$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBhgXBwzSK/XgAAAAjElEQVRIx+2VQQrAIAwE1+K/oz9rX5ZeiopaTazFHronETMOIRCDK44hiDP5jY1H6pZ7gJEhNsm/iQHAjwBUIJSAEmF15aEBoRcqAwKDwdiTu8LAdxB5bP9JOwoDkgFeNKjD5xvc2wh7oLVRGNSR8w2+PImr54BGAP8cyLLeQL1YGgbHECDuWtF6LytPTdMhXzC2L6sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MDc6MTItMDQ6MDDinXh7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjA3OjEyLTA0OjAwk8DAxwAAAABJRU5ErkJggg==";
const _imports_4$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAFVBMVEUAAACAgID///8AAADAwMD//wD/AADaas4dAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAHdElNRQfiBhoANxc0aHeBAAAA6klEQVQ4y93SzZHDIAwFYDLZBjA0sIq8ZxvUgGWlA5ew/dewIBv/BR8zk9l3g28eg4WN0dhDzJYGdvnursBdwa5yBHBXsFVOsFXOsFaOEFNqkDP+A2CF7gWwUXC39UUXkBmaoKteRILOD9sZPElOnxYOwAfgqeEMfa/H5IazlgO2T68Q73nI0WZ4PDDwNM3Q3bXhM4yjUPtcGuaGskRhKo09OOf7YRiqQD6lApZ2jZ/fvEtELl2OpNZI30m8NdZZJRiFsTRMLCEBFIbSMOZLxM+HpdEyYBUQFOsviFcA/Ik/3JvAyykF4kv+AHQjkDNA/Y/7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU1OjIzLTA0OjAwZMOFUwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NToyMy0wNDowMBWePe8AAAAASUVORK5CYII=";
const useWindowsStore = defineStore("windows", {
  state: () => ({
    // Height of Fullscreen Window
    // fullscreenWindowHeight: window.innerHeight + "px",
    activeWindow: "",
    // Active Windows Array State
    activeWindows: [],
    // Z-index State
    zIndex: 2,
    windows: [
      {
        windowId: "BiographyWindow",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Biography",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "bio",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "bio.png",
        // Window Icon Image
        altText: "Biography",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: true,
        ShowInGodotGrid: false,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "GodotContainer",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Godot Projects",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "GodotContainer",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "GodotLogo.png",
        // Window Icon Image
        altText: "Godot",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: true,
        ShowInGodotGrid: false,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "UnityContainer",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Unity Projects",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "UnityContainer",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "UnityLogo.png",
        // Window Icon Image
        altText: "Unity",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: true,
        ShowInGodotGrid: false,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "ResumeWindow",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Résumé",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "resume",
        // Window Content (used under slots)
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0"
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "10vw",
        // Window Position X (when first opened)
        positionY: "15vh",
        // Window Position Y (when first opened)
        iconImage: "resume.png",
        // Window Icon Image
        altText: "Résumé",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: true,
        ShowInGodotGrid: false,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "MailWindow",
        windowState: "close",
        displayName: "Mail",
        windowComponent: "mail",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0"
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "mail.png",
        altText: "Mail",
        fullscreen: false,
        showInAppGrid: true,
        ShowInGodotGrid: false,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "StrayWindow",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Stray's Night",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "StrayNight",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Stray's Night",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: true,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "SkyhawkSquadron",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Skyhawk Squadron",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "SkyhawkSquadron",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Biography",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: true,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "dual",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Dual Dye Dash",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "Dual",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Dual",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: true,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "Rewind",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Rewind Robot",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "Rewind",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Biography",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: true,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "Eye",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "An Eye For An Eye",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "Eye",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Biography",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: true,
        ShowInUnityGrid: false,
        showInNavbar: true
      },
      {
        windowId: "Rush",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Pack & Rush",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "Rush",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Biography",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: false,
        ShowInUnityGrid: true,
        showInNavbar: true
      },
      {
        windowId: "Vampy",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Vampy Valentine",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "Vampy",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Vampy",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: false,
        ShowInUnityGrid: true,
        showInNavbar: true
      },
      {
        windowId: "Paper",
        // Unique ID
        windowState: "close",
        // Window State [open, close, minimize]
        displayName: "Paper Man",
        // Display Name (title under icon)
        windowComponent: "window",
        // Window Component (can be changed to use modified windows)
        windowContent: "Paper",
        // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null
        },
        // Window Content Padding
        position: "absolute",
        // Window Position
        positionX: "45vw",
        // Window Position X (when first opened)
        positionY: "5%",
        // Window Position Y (when first opened)
        iconImage: "folder.png",
        // Window Icon Image
        altText: "Paper",
        // Window Icon Alt Text
        fullscreen: false,
        // Window Fullscreen State [true, false]
        showInAppGrid: false,
        ShowInGodotGrid: false,
        ShowInUnityGrid: true,
        showInNavbar: true
      }
    ]
  }),
  getters: {
    getFullscreenWindowHeight() {
      let height = "0px";
      return height;
    }
  },
  actions: {
    getWindowById(windowId) {
      return this.windows.find((window2) => window2.windowId === windowId);
    },
    getWindowFullscreen(windowId) {
      return this.windows.find((window2) => window2.windowId === windowId).fullscreen;
    },
    getActiveWindow() {
      return this.activeWindow;
    },
    setActiveWindow(windowId) {
      this.activeWindow = windowId;
    },
    setFullscreen(payload) {
      const getArrItem = () => {
        return this.windows.find(
          (windows) => windows.windowId === payload.windowId
        );
      };
      const window2 = getArrItem();
      window2.fullscreen = payload.fullscreen;
    },
    zIndexIncrement(windowId) {
      this.zIndex++;
      if ((void 0).getElementById(windowId)) {
        (void 0).getElementById(windowId).style.zIndex = this.zIndex;
      }
    },
    // Push Active Window
    pushActiveWindow(window2) {
      this.activeWindows.push(window2);
    },
    // Pop Active Window
    popActiveWindow(window2) {
      const windowIndex = this.activeWindows.indexOf(window2);
      if (windowIndex !== -1) {
        this.activeWindows.splice(windowIndex, 1);
      }
    },
    pushNewWindow(window2) {
      this.windows.push(window2);
    },
    setPhotoFolderContent(payload) {
      this.photoFolderContent = payload;
    },
    setWindowState(payload) {
      const getArrItem = () => {
        return this.windows.find(
          (windows) => windows.windowId === payload.windowId
        );
      };
      const window2 = getArrItem();
      let preventAppendingOpenWindow = false;
      if (window2.windowState == "open" || window2.windowState == "minimize") {
        preventAppendingOpenWindow = true;
      }
      if (payload.windowState == "open") {
        window2.windowState = payload.windowState;
        setTimeout(() => {
          this.zIndexIncrement(payload.windowId);
        }, 0);
        setTimeout(() => {
          this.setActiveWindow(payload.windowId);
        }, 0);
        if (preventAppendingOpenWindow == false) {
          this.pushActiveWindow(window2);
        }
      } else if (payload.windowState == "close") {
        setTimeout(() => {
          window2.windowState = payload.windowState;
        }, 0);
        setTimeout(() => {
          this.popActiveWindow(window2);
        }, 0);
        setTimeout(() => {
          this.setActiveWindow("nil");
        }, 0);
      } else if (payload.windowState == "minimize") {
        setTimeout(() => {
          window2.windowState = payload.windowState;
        }, 0);
        setTimeout(() => {
          this.setActiveWindow("nil");
        }, 0);
      } else {
        console.log("Error: windowState not found or invalid");
      }
    }
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$m = {
  __name: "FileWindow",
  __ssrInlineRender: true,
  props: {
    windowId: String,
    nameOfWindow: String,
    content_padding_left: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_right: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_top: {
      required: false,
      type: String,
      default: "5%"
    },
    content_padding_bottom: {
      required: false,
      type: String,
      default: "5%"
    },
    folderContent: {
      required: true,
      type: Array,
      default: () => []
    },
    folderSize: {
      required: false,
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const position = ref({
      x: 0,
      y: 0
    });
    ref({
      x: 0,
      y: 0
    });
    const windowsStore = useWindowsStore();
    const window = ref({});
    props.nameOfWindow;
    const w = ref(0);
    const h2 = ref(0);
    const gridHeight = ref("");
    ref(null);
    const files = ref(props.folderContent);
    const size = ref(props.folderSize);
    const style = computed(() => ({
      height: `${h2.value}px`,
      width: `${w.value}px`,
      transform: `translate(${position.value.x}px, ${position.value.y}px)`,
      "--content-padding-left": props.content_padding_left || "15%",
      "--content-padding-right": props.content_padding_right || "15%",
      "--content-padding-top": props.content_padding_top || "5%",
      "--content-padding-bottom": props.content_padding_bottom || "5%",
      "--fullscreen": windowsStore.getFullscreenWindowHeight
      // assuming this is a method in your store
    }));
    const convertBytestoMegabytes = (bytes) => {
      if (bytes !== 0) {
        return (bytes / 1e6).toFixed(2) + "MB";
      } else {
        return "";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: window.value.windowId,
        style: style.value,
        class: ["window window-style", {
          "fullscreen": window.value.fullscreen == true,
          "minimize": window.value.fullscreen == "minimize"
        }]
      }, _attrs))} data-v-598ba05b><div id="top-bar" class="${ssrRenderClass([
        unref(windowsStore).activeWindow == window.value.windowId ? "top-bar" : "top-bar-deactivated",
        "top-bar-window"
      ])}" data-v-598ba05b><div class="window-name" data-v-598ba05b><img class="icon-image"${ssrRenderAttr("src", _imports_0$d)}${ssrRenderAttr("alt", window.value.altText)} data-v-598ba05b>${ssrInterpolate(window.value.displayName)}</div><div class="triple-button" data-v-598ba05b><button class="minimize-button button" data-v-598ba05b><span style="${ssrRenderStyle({ "height": "2px", "width": "6px", "background": "black", "margin-top": "8px", "margin-right": "2px" })}" data-v-598ba05b></span></button><button class="expand-button button" data-v-598ba05b><span style="${ssrRenderStyle({ "height": "8px", "width": "9px", "border-left": "black 1px solid", "border-right": "black 1px solid", "border-bottom": "black 1px solid", "border-top": "black 2px solid" })}" data-v-598ba05b></span></button><button class="close-button button" style="${ssrRenderStyle({ "margin-right": "3px", "padding-left": "1px" })}" data-v-598ba05b> × </button></div></div><div class="content" data-v-598ba05b><div class="top-bar-nav" data-v-598ba05b><div class="top-bar-text" data-v-598ba05b><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-598ba05b><u data-v-598ba05b>F</u>ile </span><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-598ba05b><u data-v-598ba05b>E</u>dit </span><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-598ba05b><u data-v-598ba05b>V</u>iew </span><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-598ba05b><u data-v-598ba05b>H</u>elp </span></div></div><div class="file-explorer" data-v-598ba05b><nav class="grid-container-photos" style="${ssrRenderStyle({ height: gridHeight.value })}" data-v-598ba05b><!--[-->`);
      ssrRenderList(files.value, (file) => {
        _push(`<li data-v-598ba05b><button class="icon-photos" data-v-598ba05b>`);
        if (file.type == "photo") {
          _push(`<img class="icon-image-photos"${ssrRenderAttr("src", _imports_1$9)}${ssrRenderAttr("alt", file.altText)} data-v-598ba05b>`);
        } else if (file.type == "folder") {
          _push(`<img class="icon-image-photos"${ssrRenderAttr("src", _imports_2$7)}${ssrRenderAttr("alt", file.altText)} data-v-598ba05b>`);
        } else if (file.type == "file") {
          _push(`<img class="icon-image-photos"${ssrRenderAttr("src", _imports_3$2)}${ssrRenderAttr("alt", file.altText)} data-v-598ba05b>`);
        } else if (file.type == "video") {
          _push(`<img class="icon-image-photos"${ssrRenderAttr("src", _imports_4$2)}${ssrRenderAttr("alt", file.altText)} data-v-598ba05b>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="border-box" data-v-598ba05b><p class="icon-text" data-v-598ba05b>${ssrInterpolate(file.title)}</p></div></button></li>`);
      });
      _push(`<!--]--></nav></div><div class="bottom-bar" data-v-598ba05b><div class="left-bar bar" data-v-598ba05b>${ssrInterpolate(files.value.length)} object(s)</div><div class="right-bar bar" data-v-598ba05b>${ssrInterpolate(convertBytestoMegabytes(size.value))}</div></div></div></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/FileWindow.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const FileWindow = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-598ba05b"]]);
const _sfc_main$l = {
  __name: "Window",
  __ssrInlineRender: true,
  props: {
    windowId: String,
    nameOfWindow: String,
    content_padding_left: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_right: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_top: {
      required: false,
      type: String,
      default: "5%"
    },
    content_padding_bottom: {
      required: false,
      type: String,
      default: "5%"
    }
  },
  setup(__props) {
    const props = __props;
    const position = ref({
      x: 0,
      y: 0
    });
    ref({
      x: 0,
      y: 0
    });
    const windowsStore = useWindowsStore();
    const window = ref({});
    props.nameOfWindow;
    const w = ref(400);
    const h2 = ref(400);
    const style = computed(() => ({
      height: `${h2.value}px`,
      width: `${w.value}px`,
      transform: `translate(${position.value.x}px, ${position.value.y}px)`,
      "--content-padding-left": props.content_padding_left || "15%",
      "--content-padding-right": props.content_padding_right || "15%",
      "--content-padding-top": props.content_padding_top || "5%",
      "--content-padding-bottom": props.content_padding_bottom || "5%",
      "--fullscreen": windowsStore.getFullscreenWindowHeight
      // assuming this is a method in your store
    }));
    const getImagePath = (iconImage) => {
      const path = `../assets/win95Icons/${iconImage}`;
      const modules = /* @__PURE__ */ Object.assign({ "../assets/win95Icons/Computerwithprograms.ico": __vite_glob_0_0, "../assets/win95Icons/GodotLogo.png": __vite_glob_0_1, "../assets/win95Icons/UnityLogo.png": __vite_glob_0_2, "../assets/win95Icons/apple.png": __vite_glob_0_3, "../assets/win95Icons/apple2.png": __vite_glob_0_4, "../assets/win95Icons/apple3.png": __vite_glob_0_5, "../assets/win95Icons/bio.png": __vite_glob_0_6, "../assets/win95Icons/file.png": __vite_glob_0_7, "../assets/win95Icons/folder.png": __vite_glob_0_8, "../assets/win95Icons/mail.png": __vite_glob_0_9, "../assets/win95Icons/noss.webp": __vite_glob_0_10, "../assets/win95Icons/photos.png": __vite_glob_0_11, "../assets/win95Icons/resume.png": __vite_glob_0_12 });
      const mod = modules[path];
      if (mod == void 0) {
        return "";
      } else {
        return mod.default;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: window.value.windowId,
        style: style.value,
        class: ["window window-style", {
          "fullscreen": window.value.fullscreen == true,
          "minimize": window.value.fullscreen == "minimize"
        }]
      }, _attrs))} data-v-3eda687d><div id="top-bar" class="${ssrRenderClass([
        unref(windowsStore).activeWindow == window.value.windowId ? "top-bar" : "top-bar-deactivated",
        "top-bar-window"
      ])}" data-v-3eda687d><div class="window-name" data-v-3eda687d><img class="icon-image"${ssrRenderAttr("src", getImagePath(window.value.iconImage))}${ssrRenderAttr("alt", window.value.altText)} data-v-3eda687d>${ssrInterpolate(window.value.displayName)}</div><div class="triple-button" data-v-3eda687d><button class="minimize-button button" data-v-3eda687d><span style="${ssrRenderStyle({ "height": "2px", "width": "6px", "background": "black", "margin-top": "8px", "margin-right": "2px" })}" data-v-3eda687d></span></button><button class="expand-button button" data-v-3eda687d><span style="${ssrRenderStyle({ "height": "8px", "width": "9px", "border-left": "black 1px solid", "border-right": "black 1px solid", "border-bottom": "black 1px solid", "border-top": "black 2px solid" })}" data-v-3eda687d></span></button><button class="close-button button" style="${ssrRenderStyle({ "margin-right": "3px", "padding-left": "1px" })}" data-v-3eda687d> × </button></div></div><div class="content" data-v-3eda687d>`);
      ssrRenderSlot(_ctx.$slots, "content", { class: "window-content" }, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/Window.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const Window = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-3eda687d"]]);
const _imports_0$b = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAElBMVEUAAACAgIAAAAD//////wDAwMCfFoyPAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBhgXBTYmEU7QAAAAjElEQVQoz72R0Q3DIAxEswKJvEA3iCwPEJ0YAFnsv0rAxoSq3835y8fzgcy2vaO0am/GwY/QjbT0ZzdoQchGyuwvNUMCAcFDSyQouxEI8SAGcikG4UhLmEQuAM7KQUA7QqpBCLikVCFBtBOptSWoE7knWmUnFBxlTyeePST2MR0zngm/5WeFny/9599uplo1j43vrn4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MDU6NTQtMDQ6MDAB8pOGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjA1OjU0LTA0OjAwcK8rOgAAAABJRU5ErkJggg==";
const useMailStore = defineStore("mail", {
  state: () => ({
    mailContent: "",
    mailSender: "",
    mailSubject: "New Message"
  }),
  actions: {
    setMailContent(content) {
      this.mailContent = content;
    },
    setMailSender(sender) {
      this.mailSender = sender;
    },
    setMailSubject(subject) {
      this.mailSubject = subject;
    },
    resetMail() {
      this.mailContent = "";
      this.mailSender = "";
      this.mailSubject = "New Message";
    }
  }
});
const _sfc_main$k = {
  __name: "Mail",
  __ssrInlineRender: true,
  props: {
    windowId: String,
    nameOfWindow: String,
    content_padding_left: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_right: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_top: {
      required: false,
      type: String,
      default: "5%"
    },
    content_padding_bottom: {
      required: false,
      type: String,
      default: "5%"
    }
  },
  setup(__props) {
    const props = __props;
    const position = ref({
      x: 0,
      y: 0
    });
    ref({
      x: 0,
      y: 0
    });
    const windowsStore = useWindowsStore();
    const mailStore = useMailStore();
    const window = ref({});
    props.nameOfWindow;
    const w = ref(400);
    const h2 = ref(400);
    const style = computed(() => ({
      height: `${h2.value}px`,
      width: `${w.value}px`,
      transform: `translate(${position.value.x}px, ${position.value.y}px)`,
      "--content-padding-left": props.content_padding_left || "15%",
      "--content-padding-right": props.content_padding_right || "15%",
      "--content-padding-top": props.content_padding_top || "5%",
      "--content-padding-bottom": props.content_padding_bottom || "5%",
      "--fullscreen": windowsStore.getFullscreenWindowHeight
    }));
    const getImagePath = (iconImage) => {
      const path = `../assets/win95Icons/${iconImage}`;
      const modules = /* @__PURE__ */ Object.assign({
        "../assets/win95Icons/Computerwithprograms.ico": __vite_glob_0_0,
        "../assets/win95Icons/GodotLogo.png": __vite_glob_0_1,
        "../assets/win95Icons/UnityLogo.png": __vite_glob_0_2,
        "../assets/win95Icons/apple.png": __vite_glob_0_3,
        "../assets/win95Icons/apple2.png": __vite_glob_0_4,
        "../assets/win95Icons/apple3.png": __vite_glob_0_5,
        "../assets/win95Icons/bio.png": __vite_glob_0_6,
        "../assets/win95Icons/file.png": __vite_glob_0_7,
        "../assets/win95Icons/folder.png": __vite_glob_0_8,
        "../assets/win95Icons/mail.png": __vite_glob_0_9,
        "../assets/win95Icons/noss.webp": __vite_glob_0_10,
        "../assets/win95Icons/photos.png": __vite_glob_0_11,
        "../assets/win95Icons/resume.png": __vite_glob_0_12
      });
      const mod = modules[path];
      if (mod == void 0) {
        return "";
      } else {
        return mod.default;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: window.value.windowId,
        style: style.value,
        class: ["window window-style", {
          "fullscreen": window.value.fullscreen == true,
          "minimize": window.value.fullscreen == "minimize"
        }]
      }, _attrs))} data-v-c3bd3f76><iframe name="hidden_iframe" id="hidden_iframe" style="${ssrRenderStyle({ "display": "none" })}" data-v-c3bd3f76></iframe><form action="https://docs.google.com/forms/d/e/1FAIpQLSfPXlw_AtZexaqYQGmZKbzMP6MUffp0DFodh1cS356VaStpvQ/formResponse" class="window-style" id="container" target="hidden_iframe" data-v-c3bd3f76><div id="top-bar" class="${ssrRenderClass([
        unref(windowsStore).activeWindow == window.value.windowId ? "top-bar" : "top-bar-deactivated",
        "top-bar-window"
      ])}" data-v-c3bd3f76><div class="window-name" data-v-c3bd3f76><img class="icon-image"${ssrRenderAttr("src", getImagePath(window.value.iconImage))}${ssrRenderAttr("alt", window.value.altText)} data-v-c3bd3f76>${ssrInterpolate(window.value.displayName)}</div><div class="triple-button" data-v-c3bd3f76><button class="minimize-button button" data-v-c3bd3f76><span style="${ssrRenderStyle({ "height": "2px", "width": "6px", "background": "black", "margin-top": "8px", "margin-right": "2px" })}" data-v-c3bd3f76></span></button><button class="expand-button button" data-v-c3bd3f76><span style="${ssrRenderStyle({ "height": "8px", "width": "9px", "border-left": "black 1px solid", "border-right": "black 1px solid", "border-bottom": "black 1px solid", "border-top": "black 2px solid" })}" data-v-c3bd3f76></span></button><button class="close-button button" style="${ssrRenderStyle({ "margin-right": "3px", "padding-left": "1px" })}" data-v-c3bd3f76> × </button></div></div><div class="send-bar" data-v-c3bd3f76><button type="submit" class="sent" style="${ssrRenderStyle({ "z-index": "10" })}" data-v-c3bd3f76><span class="border-box" data-v-c3bd3f76><img${ssrRenderAttr("src", _imports_0$b)} class="icon-image" data-v-c3bd3f76><p style="${ssrRenderStyle({ "margin-top": "2px", "color": "black" })}" data-v-c3bd3f76>Send</p></span></button></div><div class="content" data-v-c3bd3f76><div class="container-details" data-v-c3bd3f76><div class="header" data-v-c3bd3f76>${ssrInterpolate(unref(mailStore).mailSubject)}</div><hr data-v-c3bd3f76><div class="subject-container" data-v-c3bd3f76><p style="${ssrRenderStyle({ "margin": "8px" })}" data-v-c3bd3f76>To:</p><div class="receipient" data-v-c3bd3f76>Dany</div></div><hr data-v-c3bd3f76><div class="subject-container" data-v-c3bd3f76><p style="${ssrRenderStyle({ "margin": "8px" })}" data-v-c3bd3f76>Subject:</p><input name="entry.1387124472" class="subject"${ssrRenderAttr("value", _ctx.mailSubject)} type="text" required="true" data-v-c3bd3f76></div><hr data-v-c3bd3f76><div class="from-container" style="${ssrRenderStyle({ "margin-bottom": "2px" })}" data-v-c3bd3f76><p style="${ssrRenderStyle({ "margin": "8px" })}" data-v-c3bd3f76>From:</p><input name="entry.1499936129" class="subject"${ssrRenderAttr("value", _ctx.mailSender)} type="email" required="true" data-v-c3bd3f76></div></div><textarea name="entry.2018345692" required="true" data-v-c3bd3f76>${ssrInterpolate(_ctx.mailContent)}</textarea></div></form></div>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/Mail.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Mail = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-c3bd3f76"]]);
const _imports_0$a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEUAAAAAAACAAAD/AAAA/wAAgAAAAIAAAP///wCAgAD///8Zy0fQAAAAAXRSTlMAQObYZgAAAAFiS0dECmjQ9FYAAAAHdElNRQfiBhoAOBwkIrLGAAAAmUlEQVQoz7XRMQ7CMAwFUFsevNoMnMMiV+gFkDiIp+YKXdk4LnYiqEEdwdt/SuKvFuCvg6oqX3kIziw6J0Eyip6aLlfNs4KY0AKWAaAoAm+guBDvWAGL2HYAMqKES+y4DYBGZlDWgtFhj3PX7V579ICt9ngBzx5ewCP2HYCdOWGNHY8B0Nn9o4fzYY88rbXH+HClRx3BH//AJ8kFIO93liGNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI2VDAwOjU2OjI4LTA0OjAwjfNqqgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNlQwMDo1NjoyOC0wNDowMPyu0hYAAAAASUVORK5CYII=";
const _imports_1$8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAFVBMVEUAAAC/vwAAAACAgIDAwMD//////wBeSt57AAAAAXRSTlMAQObYZgAAAAFiS0dEBfhv6ccAAAAHdElNRQfiBhgXES2C2lBpAAAAzElEQVQoz32RSxLCIAxAU3sCKnQtYPeM6AFsLQewhgsI3v8IUvqDzmgWzOTxJpAE4EdUp/Es17xouzFXK6Dnl0rz4tGgSnKg7xsOScXCPPsMUN8uQE2CnUGpZ8HLHlGBjveEfCxGUM4v3j1OYCrILENEoTeAI5BDsxm1tTYFnvnwSjf+XYcAZmpjTASz4ahzTuoNREOIfgEFIdFYAQgRFHldfxqCByPpBeBAzCXrFjjJ5xGUKp8Y8GM+06Dspg58txc4VLvNgdjt9k98AQS0M6MCJf0BAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTA2LTI0VDIzOjE3OjQ1LTA0OjAwrlSXUQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wNi0yNFQyMzoxNzo0NS0wNDowMN8JL+0AAAAASUVORK5CYII=";
const _sfc_main$j = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    const time = ref("");
    const windowsStore = useWindowsStore();
    const getImagePath = (iconImage) => {
      const path = `../assets/win95Icons/${iconImage}`;
      const modules = /* @__PURE__ */ Object.assign({
        "../assets/win95Icons/Computerwithprograms.ico": __vite_glob_0_0,
        "../assets/win95Icons/GodotLogo.png": __vite_glob_0_1,
        "../assets/win95Icons/UnityLogo.png": __vite_glob_0_2,
        "../assets/win95Icons/apple.png": __vite_glob_0_3,
        "../assets/win95Icons/apple2.png": __vite_glob_0_4,
        "../assets/win95Icons/apple3.png": __vite_glob_0_5,
        "../assets/win95Icons/bio.png": __vite_glob_0_6,
        "../assets/win95Icons/file.png": __vite_glob_0_7,
        "../assets/win95Icons/folder.png": __vite_glob_0_8,
        "../assets/win95Icons/mail.png": __vite_glob_0_9,
        "../assets/win95Icons/noss.webp": __vite_glob_0_10,
        "../assets/win95Icons/photos.png": __vite_glob_0_11,
        "../assets/win95Icons/resume.png": __vite_glob_0_12
      });
      const mod = modules[path];
      if (mod == void 0) {
        return "";
      } else {
        return mod.default;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar-container" }, _attrs))} data-v-3145d0f9><div alt="start" class="${ssrRenderClass([
        unref(windowsStore).activeWindow == "Menu" ? "start-menu-depressed" : "start-menu",
        "start-menu"
      ])}" data-v-3145d0f9><div class="${ssrRenderClass([
        unref(windowsStore).activeWindow == "Menu" ? "border-box" : "container-border",
        "flex"
      ])}" data-v-3145d0f9><img class="start-icon"${ssrRenderAttr("src", _imports_0$a)} data-v-3145d0f9><button style="${ssrRenderStyle({ "padding-left": "3px", "font-size": "0.9rem", "font-weight": "bold" })}" data-v-3145d0f9> Start </button></div></div><div class="overflow-x-scroll flex no-scrollbar" data-v-3145d0f9><!--[-->`);
      ssrRenderList(unref(windowsStore).activeWindows, (window) => {
        _push(`<div data-v-3145d0f9>`);
        if (unref(windowsStore).activeWindow !== window.windowId && (window.windowState == "open" || window.windowState == "minimize")) {
          _push(`<button class="navbar-item open" data-v-3145d0f9><img class="icon-image"${ssrRenderAttr("src", getImagePath(window.iconImage))}${ssrRenderAttr("alt", window.altText)} data-v-3145d0f9><p data-v-3145d0f9>${ssrInterpolate(window.displayName)}</p></button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(windowsStore).activeWindow == window.windowId) {
          _push(`<button class="navbar-item-depressed" data-v-3145d0f9><img class="icon-image"${ssrRenderAttr("src", getImagePath(window.iconImage))}${ssrRenderAttr("alt", window.altText)} data-v-3145d0f9><p data-v-3145d0f9>${ssrInterpolate(window.displayName)}</p></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="spacer" data-v-3145d0f9></div><div alt="time" class="time" data-v-3145d0f9><img${ssrRenderAttr("src", _imports_1$8)} class="icon-image" data-v-3145d0f9><time data-v-3145d0f9>${ssrInterpolate(unref(time))}</time></div></nav>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/Navbar.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-3145d0f9"]]);
const _sfc_main$i = {
  __name: "AppGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const windowsStore = useWindowsStore();
    const gridHeight = ref("");
    const getImagePath = (iconImage) => {
      const path = `/assets/win95Icons/${iconImage}`;
      const modules = /* @__PURE__ */ Object.assign({ "../assets/win95Icons/Computerwithprograms.ico": __vite_glob_0_0, "../assets/win95Icons/GodotLogo.png": __vite_glob_0_1, "../assets/win95Icons/UnityLogo.png": __vite_glob_0_2, "../assets/win95Icons/apple.png": __vite_glob_0_3, "../assets/win95Icons/apple2.png": __vite_glob_0_4, "../assets/win95Icons/apple3.png": __vite_glob_0_5, "../assets/win95Icons/bio.png": __vite_glob_0_6, "../assets/win95Icons/file.png": __vite_glob_0_7, "../assets/win95Icons/folder.png": __vite_glob_0_8, "../assets/win95Icons/mail.png": __vite_glob_0_9, "../assets/win95Icons/noss.webp": __vite_glob_0_10, "../assets/win95Icons/photos.png": __vite_glob_0_11, "../assets/win95Icons/resume.png": __vite_glob_0_12 });
      const mod = modules[path];
      return mod.default;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "grid-container",
        style: { height: unref(gridHeight) }
      }, _attrs))}><!--[-->`);
      ssrRenderList(unref(windowsStore).windows, (window) => {
        _push(`<li>`);
        if (window.showInAppGrid != false) {
          _push(`<button class="icon"><img class="icon-image"${ssrRenderAttr("src", getImagePath(window.iconImage))}${ssrRenderAttr("alt", window.altText)}><div class="border-box"><p class="icon-text">${ssrInterpolate(window.displayName)}</p></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></nav>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/AppGrid.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const AppGrid = _sfc_main$i;
const _imports_0$9 = "" + __buildAssetsURL("me.8vxdLR1K.png");
const _sfc_main$h = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-center"><img class="w-auto h-40"${ssrRenderAttr("src", _imports_0$9)}></div><h2 class="font-bold text-2xl py-5">Dany Osorio Echeverry</h2><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"> Game Design &amp; Programming Student @ ISART DIGITAL </h4><h4 class="text-gray-600 font-medium text-xs">Paris,France 📍</h4><div class="flex flex-wrap mt-5 gap-2 items-center"><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Unity" src="https://img.shields.io/badge/-Unity-000000?style=flat-square&amp;logo=unity&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Godot%20Engine-478CBF?logo=godotengine&amp;logoColor=fff&amp;style=flat"></h4><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Switch" src="https://img.shields.io/badge/Nintendo_Switch-E60012?style=for-the-badge&amp;logo=nintendo-switch&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="Windows" src="https://custom-icon-badges.demolab.com/badge/Windows-0078D6?logo=windows11&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="Android" src="https://img.shields.io/badge/Android-3DDC84?logo=android&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="IOS" src="https://img.shields.io/badge/iOS-000000?&amp;logo=apple&amp;logoColor=white"></h4><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Git" src="https://img.shields.io/badge/Git-F05032?logo=git&amp;logoColor=fff"><img class="w-auto h-5 rounded-none text-xs" alt="VS" src="https://custom-icon-badges.demolab.com/badge/Visual%20Studio-5C2D91.svg?&amp;logo=visual-studio&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="Photoshop" src="https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?logo=Adobe%20Photoshop&amp;logoColor=black"><img class="w-auto h-5 rounded-none text-xs" alt="Blender" src="https://img.shields.io/badge/Blender-%23F5792A.svg?logo=blender&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="Figma" src="https://img.shields.io/badge/Trello-0052CC?logo=trello&amp;logoColor=fff"></h4><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="HTML/CSS" src="https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="CSS" src="https://img.shields.io/badge/CSS-1572B6?logo=css3&amp;logoColor=fff"><img class="w-auto h-5 rounded-none text-xs" alt="Python" src="https://img.shields.io/badge/Python-3776AB?logo=python&amp;logoColor=fff"><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="HLSL" src="https://img.shields.io/badge/-HLSL-8c5aee"><img class="w-auto h-5 rounded-none text-xs" alt="GLSL" src="https://img.shields.io/badge/-GLSL-8c5aee"></h4><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Vue" src="https://img.shields.io/badge/-UI-61b083"><img class="w-auto h-5 rounded-none text-xs" alt="Flask" src="https://img.shields.io/badge/-UX-406893"><img class="w-auto h-5 rounded-none text-xs" alt="MongoDB" src="https://img.shields.io/badge/-Game Design-4ca158"><img class="w-auto h-5 rounded-none text-xs" alt="SQLite" src="https://img.shields.io/badge/-Level Design-64a2c9"></h4></div><div class="pt-7"><h3 class="underline font-bold text-md pb-1">About Me</h3><p class="font-thin text-sm pb-2.5"> I’m a ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear() - 2003)} year old Gameplay Programmer, currently student on third year at ISART Digital. </p><p class="font-thin text-sm pb-2.5"> I specialize in C# Scripting on Unity and Godot. Prototyping all sorts of features, from basic character behaviours to sound implementation systems. </p><p class="font-thin text-sm pb-2.5"> I have a strong passion for game design and level design, always looking for new ways to improve the player experience. </p><div><h1>What&#39;s Next?</h1><p>Current project : Survival Tower Defense on Nintendo Switch</p></div></div></div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Bio.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const Bio = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$a]]);
const _imports_0$8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBhgXBwzSK/XgAAAAjElEQVRIx+2VQQrAIAwE1+K/oz9rX5ZeiopaTazFHronETMOIRCDK44hiDP5jY1H6pZ7gJEhNsm/iQHAjwBUIJSAEmF15aEBoRcqAwKDwdiTu8LAdxB5bP9JOwoDkgFeNKjD5xvc2wh7oLVRGNSR8w2+PImr54BGAP8cyLLeQL1YGgbHECDuWtF6LytPTdMhXzC2L6sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MDc6MTItMDQ6MDDinXh7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjA3OjEyLTA0OjAwk8DAxwAAAABJRU5ErkJggg==";
const _imports_1$7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAulBMVEUEBAT/AACGhob///+ZmZlVVVX/+/DMzMzn59bx8fF3d3czMzMAZv8AZszq6urAwMAAmf8zmcwzZv8zZpkzM8xmmczMzJkzzP8AZplmmZmgoKT//8wAAJn//5kzZsxm//8zmf+Z//9mZswz//8zM5nMzGb/zJlmzP8zM2aZmWYAAICtqZDMmWaWlpZmZmaZmTMAzP9mZjNmZpmAgABfX18AM5lNTU0AAGYpKSkcHBwAM8wEBAQAM2YAAP9Z2XwCAAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAHdElNRQfiBhgXDQAhclFBAAACWklEQVRIx42Ua2ObIBSGdVEjrlDDSGQdM7uYdskuXbq0Wy77/39rBxBEPbZ7zeXL83DOQTGKXOJXk4nQxLNZDF8kSYrQWojjDE2CGHEMnwk+S+ao0QYTctyYbomMjOfWB2FGsBoax41khhm6pSzDBALC2IjjYobScKWvXXolesIVhDqD5fP59XWSFOlACHH4pSMDF64sbg3dESHOGAlUp1y0S4Nh1ieMMGv0BQ1zvuCLclG2CvU8y7URCm9CHmIM6nlrBIIAfLlaLS1fVdaACi3Ocm10gpD07c275dJWqLyh5/V8IAhFb96vauCFEBTwdbUu7cRmYHt1glByBTznH/Sq1vhYlZS4jvJBBcN/anlnfC7pgPeCaDa3G+C5235Fq/VdVVEWdBQKX7Ybw4fC3VqPzQjxE3fCrvj67XttBB+9TZUWwo6c8ON+uwWeagW21d43uBflT8p6HTlhX9w/cF5bITDKiQrFvvjFuWwkHxmU9Xgv7GHiRkIFNUyfd0L6YArU3S65BE9FIBxAAF6A4QVhNo3LPu8FTh93YHQlhDQP7UL6pygUnlIuf+8aIXVT0kbPHvD9GZ4OXP6BEkKYMcwx8g2hFUCIjo+qkSdZ8y6SDCbwMxwk/B6PqtmdZKdIe5J7RnunjRBF57NqTjUotZmFkFFHAyEqzkqd2qnt2c8nKoid+ZfyeLwoJUTGMoas352Hy1+zqlLuBuuLjSYIjujFxL0qWda+KoZ8+Jrx71a9uj77bLSnuGC6IQRdHxN898jEmODp/6wQ8vmIxoTpZnBh/mIGQvpyAPsHj11az1NkJfkAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMjM6MTM6MDAtMDQ6MDBxzRZ2AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDIzOjEzOjAwLTA0OjAwAJCuygAAAABJRU5ErkJggg==";
const _sfc_main$g = {
  __name: "Resume",
  __ssrInlineRender: true,
  setup(__props) {
    const windowsStore = useWindowsStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "height": "100%", "flex-direction": "column" } }, _attrs))} data-v-c0616bd2><nav class="download-bar" data-v-c0616bd2><a href="/files/CV_Danilo_OSORIO_Revised.pdf" class="download" style="${ssrRenderStyle({ "z-index": "10" })}" download target="_blank" data-v-c0616bd2><span style="${ssrRenderStyle({ "display": "flex" })}" class="border" data-v-c0616bd2><img${ssrRenderAttr("src", _imports_0$8)} class="icon-image" data-v-c0616bd2><p style="${ssrRenderStyle({ "margin-top": "2px" })}" data-v-c0616bd2>Download</p></span></a><a href="/files/CV_Danilo_OSORIO_Revised.pdf" class="download" style="${ssrRenderStyle({ "z-index": "10" })}" target="_blank" data-v-c0616bd2><span style="${ssrRenderStyle({ "display": "flex" })}" class="border" data-v-c0616bd2><img${ssrRenderAttr("src", _imports_1$7)} class="icon-image" data-v-c0616bd2><p style="${ssrRenderStyle({ "margin-top": "2px" })}" data-v-c0616bd2>Open In New Tab</p></span></a></nav><div class="frame" style="${ssrRenderStyle({ "z-index": "99" })}" data-v-c0616bd2><iframe class="frame" src="https://drive.google.com/file/d/1-T24xYOpSiPmmMKG1miYXl4oRchfPmBo/preview" data-v-c0616bd2></iframe>`);
      if (unref(windowsStore).activeWindow != "ResumeWindow") {
        _push(`<span style="${ssrRenderStyle({ "bottom": "0", "left": "0", "width": "100%", "height": "95%", "position": "absolute" })}" class="overlay" data-v-c0616bd2></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Resume.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Resume = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-c0616bd2"]]);
const _imports_0$7 = "" + __buildAssetsURL("hero_light.CAj_AtGr.webp");
const _imports_1$6 = "" + __buildAssetsURL("watch.CpT-K54X.webp");
const _imports_2$6 = "" + __buildAssetsURL("luce.BHrhTNad.webp");
const _imports_3$1 = "" + __buildAssetsURL("neumorphism.c2-Awf7w.webp");
const _imports_4$1 = "" + __buildAssetsURL("notebook.DbTT4hox.webp");
const _imports_5 = "" + __buildAssetsURL("appstore.Dk2zMoPL.webp");
const _imports_6 = "" + __buildAssetsURL("nossaflex_screenshot_1.DpgLU5nZ.webp");
const _imports_7 = "" + __buildAssetsURL("apple_camp.YJ0UIrAk.webp");
const _sfc_main$f = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-40d69dc4><img${ssrRenderAttr("src", _imports_0$7)} alt="NOSSAFLEX logo" class="hero" data-v-40d69dc4><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase One: The Beginning</b></h3><p class="paragraph" data-v-40d69dc4> NOSSAFLEX began as two separate entities initially—an idea that simmered in my mind as an EXIF data logger app for the Apple Watch. Sketches of the original app exist in images, created using Apple&#39;s Storyboarding system. Initially, it didn&#39;t make much sense to me, but when I uploaded it onto online platforms like Reddit, the concept took off and became an instant hit. </p></div><img${ssrRenderAttr("src", _imports_1$6)} class="images" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>Initial Idea</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Two: LUCE</b></h3><p class="paragraph" data-v-40d69dc4> Within my Reddit post, I included a request for assistance. Having just learned how to create storyboards in Swift, I was honestly afraid of disappointing my newfound audience. I asked anyone with experience in Swift to step forward and offer their help. By a stroke of luck, I encountered Diego. Diego, a skilled Lead Engineer with years of experience in iOS development, was more than willing to assist with the development. </p><p class="paragraph" data-v-40d69dc4> I was relieved to have found assistance for the app, especially when I discovered that an editor from The Phoblographer had contacted me regarding the Reddit post. Fortunately, Diego came to my aid and swiftly mocked up some ideas for the app (pun intended). You can find The Phoblographer article <a class="underline text-blue-700" href="https://www.thephoblographer.com/2020/03/09/luce-an-app-that-could-help-analog-photographers-log-exif-data/" data-v-40d69dc4>here</a>. Pretty neat eh? </p></div><img${ssrRenderAttr("src", _imports_2$6)} class="images-full" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>LUCE</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Three: Merger</b></h3><p class="paragraph" data-v-40d69dc4> Development was underway, but in April, a fan reached out to us about another app out there that seemed quite similar to ours—NOSSAFLEX. This piqued our interest, prompting us to swiftly establish contact. It turned out that our ideas were strikingly similar. Enter Josh, the mastermind behind NOSSAFLEX—a naming system that assigned meaning to a slew of otherwise meaningless EXIF strings. In this system, NO stood for shot number, SS for shutter speed, A for aperture, FL for focal length, and EX for exposure. </p><p class="paragraph" data-v-40d69dc4> We enthusiastically embraced Josh&#39;s concept and delved into discussions about the app&#39;s layout. Eventually, we settled on using SwiftUI with Firebase as its database. Josh wasted no time in sketching up some mockups, and we dove right into the development process. </p></div><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Four: Neumorphism</b></h3><p class="paragraph" data-v-40d69dc4> The initial version of the app embraced a UI trend called neumorphism, which emerged as a revival of skeuomorphism, advocated by users on dribbble.com. Skeuomorphism, reminiscent of the pre-iOS 9 era, featured designs that mimicked real-world objects, such as book apps resembling shelves, calculators mirroring their physical counterparts, and notepads replicating actual notepads. </p><p class="paragraph" data-v-40d69dc4> Neumorphism, on the other hand, reimagined skeuomorphism with a modern twist, incorporating soft shadows, muted whites, and buttons with inner shadows, evoking the sensation of pressing a rubber button. While initially appealing, this design trend eventually became a glaring eyesore and posed accessibility challenges. The excessive shadows detracted from usability over time. </p><p class="paragraph" data-v-40d69dc4> Fortunately, during the beta phase, we swiftly abandoned this design approach in favor of a simpler and more user-friendly interface. </p></div><img${ssrRenderAttr("src", _imports_3$1)} class="images-full" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>Why neumorphism is a bad idea</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Five: Sketchbook</b></h3><p class="paragraph" data-v-40d69dc4> We then opted for a much friendlier design reminiscent of a notebook. Featuring grid paper and highlighted text, along with a warm yellow tint to evoke a sketchbook feel, the app exuded a welcoming atmosphere. Recognizing the need for a makeover, I sprang into action, swiftly converting all old components into the cleaner and sleeker design. Josh contributed further by creating Lottie animations that played whenever users booted up the app, while meticulously drawing out patents of various camera equipment and accessories. </p><p class="paragraph" data-v-40d69dc4> Meanwhile, Diego worked tirelessly to ensure the timely release of our much-anticipated feature, the light meter. By the end of December, the app was finally completed, with the final rounds of beta testing coming to a close. </p></div><img${ssrRenderAttr("src", _imports_4$1)} class="images-full" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>Sketchbook Design</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Six: App Store Launch</b></h3><p class="paragraph" data-v-40d69dc4> The app was officially launched on February 5th, 2021, after more than a year of development. It immediately captivated the community, receiving widespread support from Reddit, YouTube, and Facebook forums alike. Users from across the globe eagerly signed up for the app, resulting in over a thousand users within the first week alone. Thousands of pieces of data were logged daily by users, and we were delighted to witness consistent daily usage of our app. </p></div><img${ssrRenderAttr("src", _imports_5)} class="images-full" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>We&#39;re live!</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Seven: Apple WWDC and Apple&#39;s Design Evangelist</b></h3><p class="paragraph" data-v-40d69dc4> With our app finally launched, it was a well-received hit by the community. However, we were far from satisfied with the product. In an attempt to improve the app, we reached out to Apple&#39;s Design Evangelist, who provided us with valuable feedback. We quickly came to realize that our app&#39;s sketchbook style UI with custom navigation and components was not in line with Apple&#39;s design guidelines. </p><p class="paragraph" data-v-40d69dc4> We were advised to adhere to Apple&#39;s Human Interface Guidelines, which would ensure that our app was more user-friendly and accessible. We were also encouraged to adopt a more conventional design approach, which would make our app more intuitive and easier to use. </p><p class="paragraph" data-v-40d69dc4> Josh got to work immediately, redesigning the app to align with Apple&#39;s guidelines. The new design featured a more conventional layout, with standard navigation and components that were consistent with Apple&#39;s design language. The app was also updated to include new features and improvements, making it more user-friendly and accessible. </p></div><img${ssrRenderAttr("src", _imports_6)} class="images-full" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>V3 of NOSSAFLEX</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Eight: Apple Entrepreneur Camp</b></h3><p class="paragraph" data-v-40d69dc4> Our third version was released in September 2023, and we were invited to participate in Apple&#39;s Entrepreneur Camp. The camp was a fantastic opportunity for us to learn from Apple&#39;s experts and receive valuable feedback on our app. We were able to connect with other entrepreneurs and developers, share our experiences, and gain insights into the latest trends in app development. </p><p class="paragraph" data-v-40d69dc4> The camp was a great success, and we returned home with a wealth of knowledge and new ideas for our app. We continued to work on NOSSAFLEX, incorporating the feedback we received and making improvements to the app. We were excited to see how our app would evolve and grow in the future. </p></div><img${ssrRenderAttr("src", _imports_7)} class="images-full" data-v-40d69dc4><h6 class="subtitle" data-v-40d69dc4>NOSSAFLEX at Apple Entrepreneur Camp</h6><div class="inner-content" data-v-40d69dc4><h3 class="heading" data-v-40d69dc4><b data-v-40d69dc4>Phase Nine: Shortlisted for Apple Design Awards and Beyond</b></h3><p class="paragraph" data-v-40d69dc4> NOSSAFLEX was recognized by Apple&#39;s South Asia DR team and was shortlisted to be considered for Apple&#39;s Design Awards in 2024. We were thrilled to be recognized by Apple and were excited to see how our app would be received by the wider community. We continued to work on NOSSAFLEX, incorporating new features and improvements to make the app even better. </p></div><br data-v-40d69dc4><a href="https://www.nossaflex.io" style="${ssrRenderStyle({ "color": "#ff5733" })}" data-v-40d69dc4>NOSSAFLEX</a></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Nossaflex.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Nossaflex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-40d69dc4"]]);
const _imports_0$6 = "" + __buildAssetsURL("1.Depma4Kb.png");
const _imports_1$5 = "" + __buildAssetsURL("2.BDiXnLI0.png");
const _imports_2$5 = "" + __buildAssetsURL("3.Cct3mwlZ.png");
const _sfc_main$e = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-8a4e024d><h1 data-v-8a4e024d>Stray&#39;s Night</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}" data-v-8a4e024d><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Godot-478CBF?style=flat&amp;logo=godot%20engine&amp;logoColor=white" data-v-8a4e024d><img class="w-auto h-5 rounded-none text-xs" alt="GD Script" src="https://img.shields.io/badge/-GD Script-478CBF" data-v-8a4e024d></h4><h4 class="text-gray-600 font-medium text-xs" data-v-8a4e024d>Done in March 2022</h4><div class="flex flex-wrap mt-5 gap-2 items-center" data-v-8a4e024d><img class="w-15 h-15"${ssrRenderAttr("src", _imports_0$6)} data-v-8a4e024d></div><div class="pt-7" data-v-8a4e024d><p class="font-thin text-sm pb-2.5" data-v-8a4e024d> The very first project I carried out on Godot Engine using GD Script. </p><p class="font-thin text-sm pb-2.5" data-v-8a4e024d> So it&#39;s a 2D platformer featuring a cat walking from building to building while avoiding the void and enemies on the rooftops. </p><p class="font-thin text-sm pb-2.5" data-v-8a4e024d> As an anecdote, this project was done in preparation for my entrance exam at ISART. (looks like it worked) </p><p class="font-thin text-sm pb-2.5" data-v-8a4e024d> Platformers have always had a significant place in my vision of video games, especially Celeste, which is one of the games that pushed me to pursue this path! </p></div><div class="flex justify-center" data-v-8a4e024d><iframe frameborder="0" src="https://itch.io/embed/1486965?linkback=true" width="552" height="167" data-v-8a4e024d><a href="https://jun0h.itch.io/strays-night" data-v-8a4e024d>Stray&#39;s Night by Dany</a></iframe></div><div class="flex justify-center" data-v-8a4e024d><div class="image-container" data-v-8a4e024d><img class="w-auto h-autp"${ssrRenderAttr("src", _imports_1$5)} data-v-8a4e024d><img class="w-auto h-auto"${ssrRenderAttr("src", _imports_2$5)} data-v-8a4e024d></div></div></div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/StrayNight.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const StrayNight = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$8], ["__scopeId", "data-v-8a4e024d"]]);
const _imports_0$5 = "" + __buildAssetsURL("zWfdFu.Wi2E_Asp.png");
const _imports_1$4 = "" + __buildAssetsURL("OF2OiT.BJdjj3Xg.png");
const _imports_2$4 = "" + __buildAssetsURL("GD5tW.C8mvfJna.png");
const _sfc_main$d = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Skyhawk Squadron</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Godot-478CBF?style=flat&amp;logo=godot%20engine&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white"></h4><h4 class="text-gray-600 font-medium text-xs">Done from December 2022 to January 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center"><img class="w-auto h-auto"${ssrRenderAttr("src", _imports_0$5)}></div><div class="pt-7"><p class="font-thin text-sm pb-2.5"> About this one.... </p><p class="font-thin text-sm pb-2.5"> This is my very first student project, done in Godot Engine using C#. </p><p class="font-thin text-sm pb-2.5"> This project is a horizontal scrolling Shoot &#39;em up with an aviation theme. </p><p class="font-thin text-sm pb-2.5"> Since this was my first &quot;real&quot; project, the whole difficulty was putting all my knowledge together and bring this game.! </p><p class="font-thin text-sm pb-2.5"> I basically did everything including programming, visual assets, level design,enemies attack patterns, special feature integration, and gamefeel &amp; juiciness of the game. </p><p class="font-thin text-sm pb-2.5"> Sound design was done by Romain SCHMIT &amp; Hamid AOULAD YOUSSEF from Music &amp; Sound Design degree ! </p></div><div class="flex justify-center"><iframe frameborder="0" src="https://itch.io/embed/1930745?linkback=true" width="552" height="167"><a href="https://jun0h.itch.io/skyhawk-squadron">SkyHawk Squadron by Dany</a></iframe></div><img class="w-auto h-40"${ssrRenderAttr("src", _imports_1$4)}><img class="w-auto h-40"${ssrRenderAttr("src", _imports_2$4)}></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/SkyhawkSquadron.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const SkyhawkSquadron = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$c = {
  __name: "GodotContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const windowsStore = useWindowsStore();
    const gridHeight = ref("");
    const getImagePath = (iconImage) => {
      const path = `~/assets/win95Icons/${iconImage}`;
      const modules = /* @__PURE__ */ Object.assign({ "/assets/win95Icons/Computerwithprograms.ico": __vite_glob_0_0, "/assets/win95Icons/GodotLogo.png": __vite_glob_0_1, "/assets/win95Icons/UnityLogo.png": __vite_glob_0_2, "/assets/win95Icons/apple.png": __vite_glob_0_3, "/assets/win95Icons/apple2.png": __vite_glob_0_4, "/assets/win95Icons/apple3.png": __vite_glob_0_5, "/assets/win95Icons/bio.png": __vite_glob_0_6, "/assets/win95Icons/file.png": __vite_glob_0_7, "/assets/win95Icons/folder.png": __vite_glob_0_8, "/assets/win95Icons/mail.png": __vite_glob_0_9, "/assets/win95Icons/noss.webp": __vite_glob_0_10, "/assets/win95Icons/photos.png": __vite_glob_0_11, "/assets/win95Icons/resume.png": __vite_glob_0_12 });
      const mod = modules[path];
      console.log("ui");
      return mod.default;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}"><img class="w-50 h-20"${ssrRenderAttr("src", _imports_0$f)} alt="Godot Logo"><h1 style="${ssrRenderStyle({ "margin-left": "10px" })}">Godot Projects</h1></div><h3>All my Godot projects done in my first year at ISART!</h3><p>Click on the icons to open the projects!</p><nav class="grid-container1" style="${ssrRenderStyle({ height: unref(gridHeight) })}"><!--[-->`);
      ssrRenderList(unref(windowsStore).windows, (window) => {
        _push(`<li>`);
        if (window.ShowInGodotGrid != false) {
          _push(`<button class="icon"><img class="icon-image1"${ssrRenderAttr("src", getImagePath(window.iconImage))}${ssrRenderAttr("alt", window.altText)}><div class="border-box"><p class="icon-text">${ssrInterpolate(window.displayName)}</p></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></nav><!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/GodotContainer.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const GodotContainer = _sfc_main$c;
const _imports_0$4 = "" + __buildAssetsURL("01_TitleCard.BTQoewaR.png");
const _imports_1$3 = "" + __buildAssetsURL("04_Level.DgVO895U.png");
const _imports_2$3 = "" + __buildAssetsURL("06_LevelRewind.DY5tEh0K.png");
const _sfc_main$b = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-e21d265a><h1 data-v-e21d265a>Rewind Robot</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}" data-v-e21d265a><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Godot-478CBF?style=flat&amp;logo=godot%20engine&amp;logoColor=white" data-v-e21d265a><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white" data-v-e21d265a></h4><h4 class="text-gray-600 font-medium text-xs" data-v-e21d265a>Done from January to March 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center" data-v-e21d265a><img class="w-auto h-auto"${ssrRenderAttr("src", _imports_0$4)} data-v-e21d265a></div><div class="pt-7" data-v-e21d265a><p class="font-thin text-sm pb-2.5" data-v-e21d265a> My second student project, this one was done in team of 4 programmers! </p><p class="font-thin text-sm pb-2.5" data-v-e21d265a> This game is a Sokoban, a puzzle game genre from Japan! We redesigned the game adding a special feature, which is the rewind. Basically you can rewind the whole level and a copy of yourself is going to repeat you past actions! </p><p class="font-thin text-sm pb-2.5" data-v-e21d265a> This project was very fun to do since the work was split, making easier for each one to focus on their chores. </p><p class="font-thin text-sm pb-2.5" data-v-e21d265a> As for me I did some the core gameplay of the player, so it&#39;s basics movements and collisions, the sound manager and then I focused on level design. </p></div><div class="flex justify-center" data-v-e21d265a><iframe frameborder="0" src="https://itch.io/embed/1977050" width="552" height="167" data-v-e21d265a><a href="https://jun0h.itch.io/rewind-robot" data-v-e21d265a>Rewind Robot by Dany</a></iframe></div><div class="flex justify-center" data-v-e21d265a><img class="w-auto h-40"${ssrRenderAttr("src", _imports_1$3)} data-v-e21d265a><img class="w-auto h-40"${ssrRenderAttr("src", _imports_2$3)} data-v-e21d265a></div></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/Rewind.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const Rewind = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-e21d265a"]]);
const _imports_0$3 = "" + __buildAssetsURL("01_TitleCard.BFDzBNdK.png");
const _imports_1$2 = "" + __buildAssetsURL("03_Gameplay.CFrnwYvm.png");
const _imports_2$2 = "" + __buildAssetsURL("04_Gameplay.BkAZbiGX.png");
const _sfc_main$a = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-28323d7a><h1 data-v-28323d7a>Dual Dye Dash</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}" data-v-28323d7a><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Godot-478CBF?style=flat&amp;logo=godot%20engine&amp;logoColor=white" data-v-28323d7a><img class="w-auto h-5 rounded-none text-xs" alt="GLSL" src="https://img.shields.io/badge/-GLSL-8c5aee" data-v-28323d7a><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white" data-v-28323d7a></h4><h4 class="text-gray-600 font-medium text-xs" data-v-28323d7a>Done in 2 weeks, April 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center" data-v-28323d7a><img class="w-auto h-auto"${ssrRenderAttr("src", _imports_0$3)} data-v-28323d7a></div><div class="pt-7" data-v-28323d7a><p class="font-thin text-sm pb-2.5" data-v-28323d7a> The last game of my first year ! </p><p class="font-thin text-sm pb-2.5" data-v-28323d7a> This project was realized in two weeks, most of the production time spent on the brainstorming and level design. The real difficulty was to find a way to make a game interesting with only one button and at the same time make it challenging for the player! </p><p class="font-thin text-sm pb-2.5" data-v-28323d7a> So I did all the programming and assets part, and using again shaders to give that glow effect to make it looks &#39;arcade&#39;. </p><p class="font-thin text-sm pb-2.5" data-v-28323d7a> As for me I did some the core gameplay of the player, so it&#39;s basics movements and collisions, the sound manager and then I focused on level design. </p></div><div class="flex justify-center" data-v-28323d7a><img class="w-auto h-40"${ssrRenderAttr("src", _imports_1$2)} data-v-28323d7a><img class="w-auto h-40"${ssrRenderAttr("src", _imports_2$2)} data-v-28323d7a></div></div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/Dual.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Dual = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-28323d7a"]]);
const _sfc_main$9 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>An Eye For An Eye</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Godot-478CBF?style=flat&amp;logo=godot%20engine&amp;logoColor=white"><img class="w-auto h-5 rounded-none text-xs" alt="GLSL" src="https://img.shields.io/badge/-GLSL-8c5aee"><img class="w-auto h-5 rounded-none text-xs" alt="Photoshop" src="https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?logo=Adobe%20Photoshop&amp;logoColor=black"><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white"></h4><h4 class="text-gray-600 font-medium text-xs">Done in 2 weeks, April 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center"><iframe width="auto" height="auto" src="https://www.youtube.com/embed/DPQw9lYmJ6k?si=gcvOX3Wt4mZm3jTD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="pt-7"><p class="font-thin text-sm pb-2.5"> This is my Work-Study Program Entry Project done with Godot 4. </p><p class="font-thin text-sm pb-2.5"> How unexpected ! I&#39;m back on Godot 4.2 but this time doing something slightly different.... </p><p class="font-thin text-sm pb-2.5"> This game is a Shoot&#39;em Up mixed with a Bullet Hell, this game is about love and loneliness, which means some some themes are quite sensitive. </p><p class="font-thin text-sm pb-2.5"> How is this different of any other game? </p><p class="font-thin text-sm pb-2.5"> This is sort of a gameplay reproduction of an existing game named WindowKill done by Torcado on itch.io (give it a try). It has inspired me in using the new window node on Godot. </p><p class="font-thin text-sm pb-2.5"> With this project I&#39;ve learned so many things including asset creation, documents creation and learning things from scratch since this godot version is pretty new. </p><p class="font-thin text-sm pb-2.5"> Also, I&#39;ve done a Medium story detailing all my process on this project creation ! </p><a class="btn btn-primary" href="https://medium.com/@Jun0h/windows-node-on-godot-a-new-gameplay-perspective-d1565ca68504">Read it</a></div></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/Eye.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Eye = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$8 = {
  __name: "UnityContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const windowsStore = useWindowsStore();
    const gridHeight = ref("");
    const getImagePath = (iconImage) => {
      const path = `../assets/win95Icons/${iconImage}`;
      const modules = /* @__PURE__ */ Object.assign({ "../assets/win95Icons/Computerwithprograms.ico": __vite_glob_0_0, "../assets/win95Icons/GodotLogo.png": __vite_glob_0_1, "../assets/win95Icons/UnityLogo.png": __vite_glob_0_2, "../assets/win95Icons/apple.png": __vite_glob_0_3, "../assets/win95Icons/apple2.png": __vite_glob_0_4, "../assets/win95Icons/apple3.png": __vite_glob_0_5, "../assets/win95Icons/bio.png": __vite_glob_0_6, "../assets/win95Icons/file.png": __vite_glob_0_7, "../assets/win95Icons/folder.png": __vite_glob_0_8, "../assets/win95Icons/mail.png": __vite_glob_0_9, "../assets/win95Icons/noss.webp": __vite_glob_0_10, "../assets/win95Icons/photos.png": __vite_glob_0_11, "../assets/win95Icons/resume.png": __vite_glob_0_12 });
      const mod = modules[path];
      console.log("ui");
      return mod.default;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}"><img class="w-50 h-20"${ssrRenderAttr("src", _imports_0$e)} alt="Unity Logo"><h1 style="${ssrRenderStyle({ "margin-left": "10px" })}">Unity Projects</h1></div><h3>All my Unity projects done in my second and third year at ISART!</h3><p>Click on the icons to open the projects!</p><nav class="grid-container1" style="${ssrRenderStyle({ height: unref(gridHeight) })}"><!--[-->`);
      ssrRenderList(unref(windowsStore).windows, (window) => {
        _push(`<li>`);
        if (window.ShowInUnityGrid != false) {
          _push(`<button class="icon"><img class="icon-image1"${ssrRenderAttr("src", getImagePath(window.iconImage))}${ssrRenderAttr("alt", window.altText)}><div class="border-box"><p class="icon-text">${ssrInterpolate(window.displayName)}</p></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></nav><!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/UnityContainer.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const UnityContainer = _sfc_main$8;
const _imports_0$2 = "" + __buildAssetsURL("1.Tucui3nn.png");
const _imports_1$1 = "" + __buildAssetsURL("2.dvQzkbKe.png");
const _imports_2$1 = "" + __buildAssetsURL("3.BZzLVo9i.png");
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-b4b94c11><h1 data-v-b4b94c11>Pack &amp; Rush</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}" data-v-b4b94c11><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Unity-000000.svg?style=flat&amp;logo=unity" data-v-b4b94c11><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white" data-v-b4b94c11><img class="w-auto h-5 rounded-none text-xs" alt="Blender" src="https://img.shields.io/badge/Blender-%23F5792A.svg?logo=blender&amp;logoColor=white" data-v-b4b94c11></h4><h4 class="text-gray-600 font-medium text-xs" data-v-b4b94c11>Done in 2 weeks, April 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center" data-v-b4b94c11><img class="w-auto h-auto"${ssrRenderAttr("src", _imports_0$2)} data-v-b4b94c11></div><div class="pt-7" data-v-b4b94c11><p class="font-thin text-sm pb-2.5" data-v-b4b94c11> First game of my second year! </p><p class="font-thin text-sm pb-2.5" data-v-b4b94c11> This time in 3D on Unity! </p><p class="font-thin text-sm pb-2.5" data-v-b4b94c11> Basically this game is a gameplay reproduction of RUSH, a puzzle game featuring cubes moving forward unless you change their directions with tiles! </p><p class="font-thin text-sm pb-2.5" data-v-b4b94c11> This was a discovery project on Unity, putting into practice 3D Maths! </p><p class="font-thin text-sm pb-2.5" data-v-b4b94c11> The game is identical to the original rush except for the theme, which I did the assets on Blender and Photoshop ! As well on Level Design, I did two levels in addition to 3 original levels of the game. </p></div><iframe frameborder="0" src="https://itch.io/embed/2518582" width="552" height="167" data-v-b4b94c11><a href="https://jun0h.itch.io/pack-rush" data-v-b4b94c11>Pack &amp; Rush by Dany</a></iframe><div class="flex justify-center" data-v-b4b94c11><img class="w-auto h-40"${ssrRenderAttr("src", _imports_1$1)} data-v-b4b94c11><img class="w-auto h-40"${ssrRenderAttr("src", _imports_2$1)} data-v-b4b94c11></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/Rush.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const Rush = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-b4b94c11"]]);
const currentIndex = 0;
const _sfc_main$6 = {
  __name: "ImagePreviewWindow",
  __ssrInlineRender: true,
  props: {
    windowId: String,
    nameOfWindow: String,
    content_padding_left: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_right: {
      required: false,
      type: String,
      default: "15%"
    },
    content_padding_top: {
      required: false,
      type: String,
      default: "5%"
    },
    content_padding_bottom: {
      required: false,
      type: String,
      default: "5%"
    }
  },
  setup(__props) {
    const props = __props;
    const position = ref({
      x: 0,
      y: 0
    });
    ref({
      x: 0,
      y: 0
    });
    const windowsStore = useWindowsStore();
    const window = ref({});
    props.nameOfWindow;
    const w = ref(0);
    const h2 = ref(0);
    const gridHeight = ref("");
    ref(null);
    const files = ref(windowsStore.photoFolderContent);
    const file = ref(files.value[currentIndex]);
    const style = computed(() => ({
      height: `${h2.value}px`,
      width: `${w.value}px`,
      transform: `translate(${position.value.x}px, ${position.value.y}px)`,
      "--content-padding-left": props.content_padding_left || "15%",
      "--content-padding-right": props.content_padding_right || "15%",
      "--content-padding-top": props.content_padding_top || "5%",
      "--content-padding-bottom": props.content_padding_bottom || "5%",
      "--fullscreen": windowsStore.getFullscreenWindowHeight
      // assuming this is a method in your store
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: window.value.windowId,
        style: style.value,
        class: ["window window-style", {
          "fullscreen": window.value.fullscreen == true,
          "minimize": window.value.fullscreen == "minimize"
        }]
      }, _attrs))} data-v-c4b84f44><div id="top-bar" class="${ssrRenderClass([
        unref(windowsStore).activeWindow == window.value.windowId ? "top-bar" : "top-bar-deactivated",
        "top-bar-window"
      ])}" data-v-c4b84f44><div class="window-name" data-v-c4b84f44>`);
      if (file.value.type == "photo") {
        _push(`<img class="icon-image"${ssrRenderAttr("src", _imports_0$c)}${ssrRenderAttr("alt", window.value.altText)} data-v-c4b84f44>`);
      } else {
        _push(`<img class="icon-image"${ssrRenderAttr("src", _imports_1$a)}${ssrRenderAttr("alt", window.value.altText)} data-v-c4b84f44>`);
      }
      _push(`<span data-v-c4b84f44>${ssrInterpolate(file.value.title)}</span></div><div class="triple-button" data-v-c4b84f44><button class="minimize-button button" data-v-c4b84f44><span style="${ssrRenderStyle({ "height": "2px", "width": "6px", "background": "black", "margin-top": "8px", "margin-right": "2px" })}" data-v-c4b84f44></span></button><button class="expand-button button" data-v-c4b84f44><span style="${ssrRenderStyle({ "height": "8px", "width": "9px", "border-left": "black 1px solid", "border-right": "black 1px solid", "border-bottom": "black 1px solid", "border-top": "black 2px solid" })}" data-v-c4b84f44></span></button><button class="close-button button" style="${ssrRenderStyle({ "margin-right": "3px", "padding-left": "1px" })}" data-v-c4b84f44> × </button></div></div><div class="content" data-v-c4b84f44><div class="top-bar-nav" data-v-c4b84f44><div class="top-bar-text" data-v-c4b84f44><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-c4b84f44><u data-v-c4b84f44>F</u>ile </span><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-c4b84f44><u data-v-c4b84f44>E</u>dit </span><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-c4b84f44><u data-v-c4b84f44>V</u>iew </span><span style="${ssrRenderStyle({ "margin-right": "12px" })}" data-v-c4b84f44><u data-v-c4b84f44>H</u>elp </span></div></div>`);
      if (file.value.type == "file") {
        _push(`<div class="file-explorer !h-[95%] !w-[100%]" style="${ssrRenderStyle([{ "width": "100%" }, { height: gridHeight.value }])}" data-v-c4b84f44><iframe class="mx-auto responsive-iframe w-[100%]" height="100%"${ssrRenderAttr("src", file.value.content.src)} data-v-c4b84f44></iframe></div>`);
      } else {
        _push(`<div class="file-explorer" data-v-c4b84f44><div class="grid-container-photos" style="${ssrRenderStyle({ height: gridHeight.value })}" data-v-c4b84f44><img${ssrRenderAttr("src", file.value.src)} data-v-c4b84f44></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/ImagePreviewWindow.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ImagePreviewWindow = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-c4b84f44"]]);
const _imports_0$1 = "" + __buildAssetsURL("sidebar-image.Cvh9Zs2s.png");
const _imports_1 = "data:image/webp;base64,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";
const _imports_2 = "data:image/webp;base64,UklGRooFAABXRUJQVlA4IH4FAACQMwCdASozATMBPtFosFEoJiUipjHoWQAaCWVu4XJ1Jl9iL/zmuZdw/pHJe8PySHx/OfoE9AH6M9gDnF+YDzdPSvvOe9I5DL5RfUSyBMjVNd8JJ3Gx8nY+TsfJ2VoxheTsfJ2Pk7HxNWbZ0Bky+5yxsLydj5OxAsMYMe4rGBWghfTpxSPk7Hh4N36X9+H8NEWN3rG71Lua2dD+BIN7/rJNnefRGOF2ixu9Y3evmqtG71Q4fE1cgKR8mTTiXvlISDhz6NZXrJu0e6pfi/75wopimP6sduK3JO7LLeYpFBPw5CtWCSOYFJ83+Zo4pBFdV6JZnYgZ4q/HaJbg5fpDJk1y02jXM64UZGCbaGluvKnXAlqkByvaA/MsBZzpkm7xuaW68qdcRmxgQwfi+qHp5tign2Y4jyl/KpIRGBLhYx4Fbvx8LA6bhyM1AQosRmkhTfXvjzb1YLBV2p2IGeKvx2lb5TaKxVghEVDDwjWAtCEETcnxmZDFzjGnYy3CmB7a6SZjQEFMK4NvZ6kJ3SFo23NrC8nY+TsfJ2Pk7Hydj5Ox8nY+TsPAAP777Z7y9+At5/TsnZNQmEAQnXwAEHRF21iIK8sazw5Di58tTWMSJBOq8Vm8OrHOuOAtn43dA6GVyB9tQbik6q/NaqpcB1oRGti9Cl8iZtcrXOYIDb6YJSNuC6C9fuyopEGkMeMagM1XEqOCtEW9ilde/rk92Ycx7ehBvyvuyMGjyAO7gO/CPPInM8yQIqnbr2QjA4FlhOJLwRPqMMQP3rqdvPRFnlwFs6HgJqas9BEDlVvp9JqN8PGJxKrh9SEsNyJyFfck03ZkvzYLKB39KUWFoOX6QsilsIaznQGwAqwK1S81m9SsdETxWK21K9gAx2ezDBdiwndL/AbFiIAE4c04oH1qT2iCEGDaYimWyzM4RRiYKRUXbYkdDp+t14gec6C6x4FWqjPTLDsMZISBkNZh7FbpxnCY9g7wAvJ67jxqy4AAAQYjWOzdwrxIwgh2fPwkFgDST+Fn35EPUpoD0/lzjsa0iu+eYhgEAqzuROZXPtyizr/MtiG9Wkpw8cRa2QsTqztieL/2D3a9NbzCOLo7X7BzkEepX6vl6FFzyWGG3wrI1WK73aEkadh8OF/YYm3eGxzDR/t4C1KbiCMLX66Z3FvxW42+5VLznc3j8dVXyMXWMIftwZgIkuSmn2ZQzgLEKsLAmwoxV0G/ZpcGfIiDUHLnWEq9CceMBMZO657+8bOQcNiF+ndcMGbmOe8VrRWXKsLahSrxrmNxHXGnMR0jwguAJtZ0Nh9gwpt3bPjwstK07C78GSjq58pxi+zmgMl/XCxp/cX6EYJInHEXEtlYD3bYZMRcjKZ0YR9EhfOp5rm3WwZW026IbDI/IDY5XW6z8pJGHn7842rx8LBFORIx+vxp/Bdp0H38yDK+0aSWXGPJHsUc6qb/SrDZyvY7Gyhbk86WrsQoj9zRGTyY3NgxcpM3iM92ai7hKxxT/VNk+9kNLeXLhgpHYXB//Z37TfwdNW2VMQjCuStD8gm2LgHZyINNcTxW8FcCRWpfDn57FbBf3a7BcD/1pWAqAx8PL3uZjoOwRup8y0Bp6RGYSPUkYt1vooZYU1j+gj9qHO9lqx/uwrAW7mAWcBOPlbm8Kqlod+zTe3hKMKrek07bN+vh9UdzBoJ9NNM5InbbvgmEnqmVIyZ8oSYT6tMq31P203hkM5emHuoNmfv9UykVIinE4ulK1mN+4nlfRBU0kcc78OuhtaoXvbBUJ0GMeJUCtgISKwl1BBh0S4JPIDcWGK5LXzyyfCgqQBd0Yef4WA2I3JTSGAP5dTjdDiwxXJa+V9hBz+Gorv0gkuXFtvglWOOAAAAAAAAAAA==";
const _imports_3 = "data:image/webp;base64,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";
const _imports_4 = "data:image/png;base64,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";
const _sfc_main$5 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "menu",
    style: { "z-index": "1000000" }
  }, _attrs))} data-v-be6b358e><div class="sidebar" data-v-be6b358e><img class="sidebar-image"${ssrRenderAttr("src", _imports_0$1)} data-v-be6b358e></div><div class="socials" data-v-be6b358e><a href="https://www.instagram.com/dany_makes_games/" target="_blank" data-v-be6b358e><div class="bar" data-v-be6b358e><img class="social-image"${ssrRenderAttr("src", _imports_1)} data-v-be6b358e><div class="social-text" data-v-be6b358e><u data-v-be6b358e>I</u>nstagram</div></div></a><a href="https://www.linkedin.com/in/daniloosorioecheverry/" target="_blank" data-v-be6b358e><div class="bar" data-v-be6b358e><img class="social-image"${ssrRenderAttr("src", _imports_2)} data-v-be6b358e><u data-v-be6b358e>L</u>inkedIn </div></a><a href="https://github.com/iamdanychock" target="_blank" data-v-be6b358e><div class="bar" data-v-be6b358e><img class="social-image"${ssrRenderAttr("src", _imports_3)} data-v-be6b358e> GitHub </div></a><a href="https://jun0h.itch.io" target="_blank" data-v-be6b358e><div class="bar" data-v-be6b358e><img class="social-image"${ssrRenderAttr("src", _imports_4)} data-v-be6b358e> Itch.io </div></a><div class="divider" data-v-be6b358e></div><a href="/files/CV_Danilo_OSORIO_Revised.pdf" target="_blank" data-v-be6b358e><div class="bar" data-v-be6b358e><img class="social-image"${ssrRenderAttr("src", _imports_5$1)} data-v-be6b358e><u data-v-be6b358e>R</u>ésumé </div></a></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("templates/StartMenu.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const StartMenu = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-be6b358e"]]);
const _imports_0 = "" + __buildAssetsURL("VampyTitle.C60rLdVo.png");
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-0118d577><img class="w-auto h-40"${ssrRenderAttr("src", _imports_0)} data-v-0118d577><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}" data-v-0118d577><img class="w-auto h-5 rounded-none text-xs" alt="Godot" src="https://img.shields.io/badge/Made%20with-Unity-000000.svg?style=flat&amp;logo=unity" data-v-0118d577><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white" data-v-0118d577></h4><h4 class="text-gray-600 font-medium text-xs" data-v-0118d577>Done in 2 weeks, April 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center" data-v-0118d577><iframe width="560" height="315" src="https://www.youtube.com/embed/6OFxrVU8Mj4?si=l3sHKRUuGBkIjhKT&amp;start=24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-0118d577></iframe></div><div class="pt-7" data-v-0118d577><p class="font-thin text-sm pb-2.5" data-v-0118d577> Second project in Unity, this one is one of my best projects and the one I had most of the fun doing it. </p><p class="font-thin text-sm pb-2.5" data-v-0118d577> This time I collaborated with 3 more programmers, 7 game artists and 3 sound designers. </p><p class="font-thin text-sm pb-2.5" data-v-0118d577> This game is a 2D platformer about a vampire being chased by his cleaning maid, ironic? right? </p><p class="font-thin text-sm pb-2.5" data-v-0118d577> My part of this project was coding the whole game physic making it pleasant and natural for the player. I also coded the camera logic to value the environnement and the level design and some gameplay bricks </p><p class="font-thin text-sm pb-2.5" data-v-0118d577> On other points I did many juiciness contribution like animating the player, few screenshakes, screen transitions, and all the VFX. </p><p class="font-thin text-sm pb-2.5" data-v-0118d577> I&#39;m very proud of this project, we did exactly what we imagined for this project, so give it a try! </p></div><iframe frameborder="0" src="https://itch.io/embed/2586073" width="552" height="167" data-v-0118d577><a href="https://jun0h.itch.io/vampy-valentine" data-v-0118d577>Vampy Valentine by Dany, Ruenito, H_Emilie, Jules l&#39;executable, Lefevre_Florian, Matteo Rnd, Camille_Domain, Bachien</a></iframe> <div class="flex justify-center" data-v-0118d577></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/Vampy.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Vampy = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-0118d577"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Paper Man</h1><h4 class="text-gray-600 font-medium text-xs" style="${ssrRenderStyle({ "padding-bottom": "10px", "display": "flex", "gap": "5px" })}"><img class="w-auto h-5 rounded-none text-xs" alt="Unity" src="https://img.shields.io/badge/Made%20with-Unity-000000.svg?style=flat&amp;logo=unity"><img class="w-auto h-5 rounded-none text-xs" alt="HLSL" src="https://img.shields.io/badge/-HLSL-8c5aee"><img class="w-auto h-5 rounded-none text-xs" alt="C#" src="https://custom-icon-badges.demolab.com/badge/C%23-%23239120.svg?logo=cshrp&amp;logoColor=white"></h4><h4 class="text-gray-600 font-medium text-xs">Done in 2 weeks, April 2023</h4><div class="flex flex-wrap mt-5 gap-2 items-center"><iframe width="560" height="315" src="https://www.youtube.com/embed/L25Bizf91eY?si=ffAQ9EMdFW9Fa_fz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="pt-7"><p class="font-thin text-sm pb-2.5"> This was my first game jam, completed in 4 days. Hosted by <b>ISART DIGITAL</b>&#39;s annual Game Week and sponsored by the <b>InForm Foundation for Information</b>, the theme was: </p><p class="font-thin text-sm pb-2.5"><b>The Dangers of Information: Fake News, AI, Information Overload</b></p><p class="font-thin text-sm pb-2.5"> Together with a team of 4 Game Artists, 2 Programmers, 2 Game Designers, and 1 Sound Designer, we created <i>Paper Man</i>. </p><p class="font-thin text-sm pb-2.5"> In this game, we follow the adventure of a little man made of newspaper who must turn off televisions that broadcast disinformation and propaganda spread by a dictatorship. </p><p class="font-thin text-sm pb-2.5"> My role in the project was to integrate the audio system and 3D spatialization using FMOD, design the camera system, and create various VFX, lighting, and post-processing effects. </p></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/Projects/Paper.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Paper = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const windowsStore = useWindowsStore();
    const windows = windowsStore.windows;
    const windowComponents = [
      { name: "window", comp: Window },
      { name: "ImagePreviewWindow", comp: ImagePreviewWindow },
      { name: "mail", comp: Mail },
      { name: "FilesWindow", comp: FileWindow }
    ];
    const slotViews = [
      { name: "bio", comp: Bio },
      { name: "resume", comp: Resume },
      { name: "nossaflex", comp: Nossaflex },
      { name: "StrayNight", comp: StrayNight },
      { name: "SkyhawkSquadron", comp: SkyhawkSquadron },
      { name: "GodotContainer", comp: GodotContainer },
      { name: "Rewind", comp: Rewind },
      { name: "Dual", comp: Dual },
      { name: "Eye", comp: Eye },
      { name: "UnityContainer", comp: UnityContainer },
      { name: "Rush", comp: Rush },
      { name: "Vampy", comp: Vampy },
      { name: "Paper", comp: Paper }
    ];
    const windowCheck = (windowId) => {
      if (windowsStore.getWindowById(windowId).windowState == "open") {
        return true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}><div class="screen" id="screen"><!--[-->`);
      ssrRenderList(unref(windows), (window2) => {
        _push(`<div${ssrRenderAttr("aria-label", window2.displayName)}>`);
        if (windowCheck(window2.windowId)) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(windowComponents.find((comp) => comp.name === window2.windowComponent).comp), {
            nameOfWindow: window2.windowId,
            content_padding_bottom: window2.windowContentPadding["bottom"],
            content_padding_left: window2.windowContentPadding["left"],
            content_padding_right: window2.windowContentPadding["right"],
            content_padding_top: window2.windowContentPadding["top"],
            id: window2.windowId,
            style: {
              position: window2.position,
              left: window2.positionX,
              top: window2.positionY
            },
            folderContent: window2.folderContent,
            folderSize: window2.folderSize
          }, {
            content: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(slotViews.find((comp) => comp.name === window2.windowContent).comp), null, null), _parent2, _scopeId);
                _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(slotViews.find((comp) => comp.name === window2.windowContent).comp))),
                  createVNode(_component_NuxtPage)
                ];
              }
            }),
            _: 2
          }), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(AppGrid, null, null, _parent));
      _push(`</div>`);
      if (unref(windowsStore).activeWindow == "Menu") {
        _push(ssrRenderComponent(StartMenu, { style: { "position": "absolute", "z-index": "9999", "left": "0", "bottom": "36px" } }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(Navbar, {
        style: { "position": "absolute", "bottom": "0", "z-index": "9999" },
        id: "navbar"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = _sfc_main$2;
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-CLoWxteo.mjs').then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import('./error-500-t00zgzHd.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, useRuntimeConfig as a, navigateTo as b, useRoute as c, entry$1 as default, injectHead as i, nuxtLinkDefaults as n, resolveUnrefHeadInput as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
