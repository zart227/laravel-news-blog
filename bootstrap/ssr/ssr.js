import { mergeProps, useSSRContext, defineComponent, unref, withCtx, renderSlot, computed, createTextVNode, toDisplayString, h, createVNode, resolveDynamicComponent, withModifiers, ref, resolveComponent, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, vModelCheckbox, vModelRadio, onMounted, vModelSelect, createCommentVNode, onBeforeUnmount, createSSRApp } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrGetDynamicModelProps } from "vue/server-renderer";
import { Link, usePage, useForm, Head, router, WhenVisible, createInertiaApp } from "@inertiajs/vue3";
import { route as route$1, ZiggyVue } from "ziggy-js";
import axios from "axios";
import debounce from "lodash/debounce.js";
import { Line } from "vue-chartjs";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { renderToString } from "@vue/server-renderer";
import createServer from "@inertiajs/vue3/server";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$z = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 316 316",
    xmlns: "http://www.w3.org/2000/svg",
    class: "w-20 h-20"
  }, _attrs))}><path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.885 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.195 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"></path></svg>`);
}
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    href: {},
    active: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: _ctx.href,
        class: [
          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none",
          _ctx.active ? "border-indigo-400 text-gray-900 focus:border-indigo-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
        ]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const appName = computed(() => {
      var _a;
      return ((_a = page.props.app) == null ? void 0 : _a.name) || "Laravel News Blog";
    });
    const footerNavigation = {
      main: [
        { name: "Главная", href: route$1("articles.index") },
        { name: "Теги", href: route$1("tags.index") }
      ],
      social: [
        {
          name: "GitHub",
          href: "https://github.com",
          icon: (props) => h("svg", {
            fill: "currentColor",
            viewBox: "0 0 24 24",
            ...props
          }, [
            h("path", {
              "fill-rule": "evenodd",
              "d": "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
              "clip-rule": "evenodd"
            })
          ])
        },
        {
          name: "Telegram",
          href: "https://t.me",
          icon: (props) => h("svg", {
            fill: "currentColor",
            viewBox: "0 0 24 24",
            ...props
          }, [
            h("path", {
              "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.13-.02.2z"
            })
          ])
        }
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}><div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8"><nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer"><!--[-->`);
      ssrRenderList(footerNavigation.main, (item) => {
        _push(`<div class="pb-6">`);
        _push(ssrRenderComponent(unref(Link), {
          href: item.href,
          class: "text-sm leading-6 text-gray-600 hover:text-gray-900"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></nav><div class="mt-10 flex justify-center space-x-10"><!--[-->`);
      ssrRenderList(footerNavigation.social, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer"><span class="sr-only">${ssrInterpolate(item.name)}</span>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), {
          class: "h-6 w-6",
          "aria-hidden": "true"
        }, null), _parent);
        _push(`</a>`);
      });
      _push(`<!--]--></div><p class="mt-10 text-center text-xs leading-5 text-gray-500"> © ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(appName.value)}. Все права защищены. </p></div></footer>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Footer.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    const page = usePage();
    const isAdmin = computed(() => {
      var _a;
      return ((_a = page.props.auth.user) == null ? void 0 : _a.role) === "admin";
    });
    const currentRoute = computed(() => route$1().current() || "");
    const isCurrentRoute = (routeName) => currentRoute.value === routeName;
    const routeStartsWith = (prefix) => currentRoute.value.startsWith(prefix);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100" }, _attrs))}><header class="bg-white shadow"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold text-gray-900">${ssrInterpolate(_ctx.title)}</h1></div></header><nav class="bg-white border-b border-gray-100"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="shrink-0 flex items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route$1)("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$y, {
        href: unref(route$1)("home"),
        active: isCurrentRoute("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Главная `);
          } else {
            return [
              createTextVNode(" Главная ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$y, {
        href: unref(route$1)("articles.index"),
        active: isCurrentRoute("articles.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Статьи `);
          } else {
            return [
              createTextVNode(" Статьи ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$y, {
        href: unref(route$1)("tags.index"),
        active: isCurrentRoute("tags.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Теги `);
          } else {
            return [
              createTextVNode(" Теги ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isAdmin.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_sfc_main$y, {
          href: unref(route$1)("admin.articles.index"),
          active: routeStartsWith("admin.articles.")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Управление статьями `);
            } else {
              return [
                createTextVNode(" Управление статьями ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$y, {
          href: unref(route$1)("admin.tags.index"),
          active: routeStartsWith("admin.tags.")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Управление тегами `);
            } else {
              return [
                createTextVNode(" Управление тегами ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$y, {
          href: unref(route$1)("admin.statistics"),
          active: isCurrentRoute("admin.statistics")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Статистика `);
            } else {
              return [
                createTextVNode(" Статистика ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></nav><main class="py-12"><div class="max-w-7xl mx-auto sm:px-6 lg:px-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      _push(ssrRenderComponent(_sfc_main$x, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      title: "",
      content: "",
      image: null,
      tags: []
    });
    const handleSubmit = () => {
      form.post(route("admin.articles.store"), {
        preserveScroll: true,
        onSuccess: () => {
          notify.success("Статья успешно создана");
        },
        onError: () => {
          notify.error("Ошибка при создании статьи");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$w, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Создание статьи </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Создание статьи ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><form class="space-y-6"${_scopeId}></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        class: "space-y-6"
                      }, null, 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Articles/Create.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      title: props.article.title,
      content: props.article.content,
      image: null,
      tags: props.article.tags.map((tag) => tag.id),
      _method: "PUT"
    });
    const handleSubmit = () => {
      form.post(route("admin.articles.update", props.article.slug), {
        preserveScroll: true,
        onSuccess: () => {
          notify.success("Статья успешно обновлена");
        },
        onError: () => {
          notify.error("Ошибка при обновлении статьи");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$w, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Редактирование статьи </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Редактирование статьи ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><form class="space-y-6"${_scopeId}></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        class: "space-y-6"
                      }, null, 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Articles/Edit.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  props: {
    modelValue: {
      type: [File, null],
      default: null
    },
    accept: {
      type: String,
      default: "image/*"
    },
    maxFileSize: {
      type: Number,
      default: 2 * 1024 * 1024
      // 2MB
    },
    initialPreview: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isDragging = ref(false);
    const error = ref("");
    const currentFile = ref(null);
    const preview = ref(props.initialPreview);
    const inputId = `file-upload-${Math.random().toString(36).substr(2, 9)}`;
    const acceptedFileTypes = computed(() => {
      return props.accept.split(",").map((type) => type.trim()).map((type) => {
        if (type === "image/*") return "Изображения";
        return type.replace("image/", "").toUpperCase();
      }).join(", ");
    });
    const validateFile = (file) => {
      if (!file) return "Файл не выбран";
      if (!file.type.startsWith("image/")) {
        return "Пожалуйста, загрузите изображение";
      }
      if (file.size > props.maxFileSize) {
        return `Размер файла не должен превышать ${formatFileSize(props.maxFileSize)}`;
      }
      return "";
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const handleFile = (file) => {
      error.value = validateFile(file);
      if (error.value) {
        clearFile();
        return;
      }
      currentFile.value = file;
      emit("update:modelValue", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      handleFile(file);
    };
    const handleDrop = (event) => {
      isDragging.value = false;
      const file = event.dataTransfer.files[0];
      handleFile(file);
    };
    const clearFile = () => {
      currentFile.value = null;
      preview.value = null;
      emit("update:modelValue", null);
    };
    return {
      isDragging,
      error,
      preview,
      currentFile,
      inputId,
      acceptedFileTypes,
      formatFileSize,
      handleFileSelect,
      handleDrop,
      clearFile
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-center w-full"><label${ssrRenderAttr("for", $setup.inputId)} class="${ssrRenderClass([{
    "border-indigo-500": $setup.isDragging,
    "border-red-500": $setup.error
  }, "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"])}">`);
  if (!$setup.preview) {
    _push(`<div class="flex flex-col items-center justify-center pt-5 pb-6"><svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path></svg><p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Нажмите для загрузки</span> или перетащите файл </p><p class="text-xs text-gray-500">${ssrInterpolate($setup.acceptedFileTypes)} (макс. ${ssrInterpolate($setup.formatFileSize($props.maxFileSize))}) </p></div>`);
  } else {
    _push(`<div class="relative w-full h-full"><img${ssrRenderAttr("src", $setup.preview)} class="w-full h-full object-contain"${ssrRenderAttr("alt", ((_a = $setup.currentFile) == null ? void 0 : _a.name) || "Preview")}><button class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
  }
  _push(`</label><input${ssrRenderAttr("id", $setup.inputId)} type="file" class="hidden"${ssrRenderAttr("accept", $props.accept)}></div>`);
  if ($setup.error) {
    _push(`<div class="mt-2 text-sm text-red-600">${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FileUpload.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const FileUpload = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$s = {
  components: {
    AppLayout: _sfc_main$w,
    FileUpload,
    Link,
    Head
  },
  props: {
    article: {
      type: Object,
      default: null
    },
    availableTags: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    var _a, _b, _c, _d, _e;
    const isSubmitting = ref(false);
    const isEditing = computed(() => !!props.article);
    const initialImageUrl = computed(() => {
      var _a2;
      if ((_a2 = props.article) == null ? void 0 : _a2.image_path) {
        return `/storage/${props.article.image_path}`;
      }
      return null;
    });
    const form = ref({
      title: ((_a = props.article) == null ? void 0 : _a.title) || "",
      content: ((_b = props.article) == null ? void 0 : _b.content) || "",
      image: null,
      tags: ((_d = (_c = props.article) == null ? void 0 : _c.tags) == null ? void 0 : _d.map((tag) => tag.id)) || [],
      status: ((_e = props.article) == null ? void 0 : _e.status) || "draft"
    });
    const submitForm = async () => {
      isSubmitting.value = true;
      const formData = new FormData();
      formData.append("title", form.value.title);
      formData.append("content", form.value.content);
      formData.append("status", form.value.status);
      if (form.value.image) {
        formData.append("image", form.value.image);
      }
      form.value.tags.forEach((tagId) => {
        formData.append("tags[]", tagId);
      });
      try {
        if (isEditing.value) {
          formData.append("_method", "PUT");
          await router.post(`/api/articles/${props.article.id}`, formData);
        } else {
          await router.post("/api/articles", formData);
        }
        router.visit(route("admin.articles"));
      } catch (error) {
        console.error("Ошибка при сохранении статьи:", error);
      } finally {
        isSubmitting.value = false;
      }
    };
    return {
      form,
      isEditing,
      isSubmitting,
      initialImageUrl,
      submitForm
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_AppLayout = resolveComponent("AppLayout");
  const _component_FileUpload = resolveComponent("FileUpload");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, {
    title: $setup.isEditing ? "Редактирование статьи" : "Создание статьи"
  }, null, _parent));
  _push(ssrRenderComponent(_component_AppLayout, {
    title: $setup.isEditing ? "Редактирование статьи" : "Создание статьи"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="max-w-4xl mx-auto"${_scopeId}><div class="bg-white shadow rounded-lg p-6"${_scopeId}><h1 class="text-2xl font-bold mb-6"${_scopeId}>${ssrInterpolate($setup.isEditing ? "Редактирование статьи" : "Создание новой статьи")}</h1><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="title" class="block text-sm font-medium text-gray-700"${_scopeId}>Заголовок</label><input id="title"${ssrRenderAttr("value", $setup.form.title)} type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Изображение</label>`);
        _push2(ssrRenderComponent(_component_FileUpload, {
          modelValue: $setup.form.image,
          "onUpdate:modelValue": ($event) => $setup.form.image = $event,
          "initial-preview": $setup.initialImageUrl,
          "max-file-size": 5 * 1024 * 1024
        }, null, _parent2, _scopeId));
        _push2(`</div><div${_scopeId}><label for="content" class="block text-sm font-medium text-gray-700"${_scopeId}>Содержание</label><textarea id="content" rows="10" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required${_scopeId}>${ssrInterpolate($setup.form.content)}</textarea></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Теги</label><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
        ssrRenderList($props.availableTags, (tag) => {
          _push2(`<label class="inline-flex items-center"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", tag.id)}${ssrIncludeBooleanAttr(Array.isArray($setup.form.tags) ? ssrLooseContain($setup.form.tags, tag.id) : $setup.form.tags) ? " checked" : ""} class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}><span class="ml-2"${_scopeId}>${ssrInterpolate(tag.name)}</span></label>`);
        });
        _push2(`<!--]--></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700"${_scopeId}>Статус</label><div class="mt-1"${_scopeId}><label class="inline-flex items-center mr-4"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.form.status, "draft")) ? " checked" : ""} value="draft" class="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}><span class="ml-2"${_scopeId}>Черновик</span></label><label class="inline-flex items-center"${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.form.status, "published")) ? " checked" : ""} value="published" class="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}><span class="ml-2"${_scopeId}>Опубликовано</span></label></div></div><div class="flex justify-end space-x-3"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("admin.articles"),
          class: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Отмена `);
            } else {
              return [
                createTextVNode(" Отмена ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<button type="submit"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"${_scopeId}>${ssrInterpolate($setup.isSubmitting ? "Сохранение..." : $setup.isEditing ? "Сохранить" : "Создать")}</button></div></form></div></div>`);
      } else {
        return [
          createVNode("div", { class: "max-w-4xl mx-auto" }, [
            createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
              createVNode("h1", { class: "text-2xl font-bold mb-6" }, toDisplayString($setup.isEditing ? "Редактирование статьи" : "Создание новой статьи"), 1),
              createVNode("form", {
                onSubmit: withModifiers($setup.submitForm, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    for: "title",
                    class: "block text-sm font-medium text-gray-700"
                  }, "Заголовок"),
                  withDirectives(createVNode("input", {
                    id: "title",
                    "onUpdate:modelValue": ($event) => $setup.form.title = $event,
                    type: "text",
                    class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, $setup.form.title]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Изображение"),
                  createVNode(_component_FileUpload, {
                    modelValue: $setup.form.image,
                    "onUpdate:modelValue": ($event) => $setup.form.image = $event,
                    "initial-preview": $setup.initialImageUrl,
                    "max-file-size": 5 * 1024 * 1024
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "initial-preview"])
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    for: "content",
                    class: "block text-sm font-medium text-gray-700"
                  }, "Содержание"),
                  withDirectives(createVNode("textarea", {
                    id: "content",
                    "onUpdate:modelValue": ($event) => $setup.form.content = $event,
                    rows: "10",
                    class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, $setup.form.content]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Теги"),
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList($props.availableTags, (tag) => {
                      return openBlock(), createBlock("label", {
                        key: tag.id,
                        class: "inline-flex items-center"
                      }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          value: tag.id,
                          "onUpdate:modelValue": ($event) => $setup.form.tags = $event,
                          class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        }, null, 8, ["value", "onUpdate:modelValue"]), [
                          [vModelCheckbox, $setup.form.tags]
                        ]),
                        createVNode("span", { class: "ml-2" }, toDisplayString(tag.name), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Статус"),
                  createVNode("div", { class: "mt-1" }, [
                    createVNode("label", { class: "inline-flex items-center mr-4" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => $setup.form.status = $event,
                        value: "draft",
                        class: "border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, $setup.form.status]
                      ]),
                      createVNode("span", { class: "ml-2" }, "Черновик")
                    ]),
                    createVNode("label", { class: "inline-flex items-center" }, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        "onUpdate:modelValue": ($event) => $setup.form.status = $event,
                        value: "published",
                        class: "border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, $setup.form.status]
                      ]),
                      createVNode("span", { class: "ml-2" }, "Опубликовано")
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end space-x-3" }, [
                  createVNode(_component_Link, {
                    href: _ctx.route("admin.articles"),
                    class: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Отмена ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode("button", {
                    type: "submit",
                    disabled: $setup.isSubmitting,
                    class: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  }, toDisplayString($setup.isSubmitting ? "Сохранение..." : $setup.isEditing ? "Сохранить" : "Создать"), 9, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Articles/Form.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender]]);
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Form
}, Symbol.toStringTag, { value: "Module" }));
const notify$2 = {
  success(message, options = {}) {
    return;
  },
  error(message, options = {}) {
    return;
  },
  info(message, options = {}) {
    return;
  },
  warning(message, options = {}) {
    return;
  }
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tags: { default: () => [] }
  },
  setup(__props) {
    const articles = ref({
      data: [],
      links: [],
      from: 0,
      to: 0,
      total: 0
    });
    const filters = ref({
      search: "",
      status: "",
      tag: "",
      page: 1
    });
    const searchQuery = ref("");
    const fetchArticles = async (url = "/api/articles", params = {}) => {
      try {
        const response = await axios.get(url, { params });
        articles.value = response.data;
      } catch (error) {
        notify$2.error("Ошибка при загрузке статей");
        console.error("Error fetching articles:", error);
      }
    };
    const handleFilterChange = (event) => {
      const target = event.target;
      fetchArticles("/api/articles", { [target.name]: target.value });
    };
    const debouncedSearch = debounce(() => {
      filters.value.page = 1;
      fetchArticles("/api/articles", { search: searchQuery.value });
    }, 300);
    const goToPage = (url) => {
      if (url) {
        fetchArticles(url);
      }
    };
    const deleteArticle = async (id) => {
      if (!confirm("Вы уверены, что хотите удалить эту статью?")) {
        return;
      }
      try {
        await axios.delete(`/api/articles/${id}`);
        notify$2.success("Статья успешно удалена");
        fetchArticles("/api/articles");
      } catch (error) {
        notify$2.error("Ошибка при удалении статьи");
        console.error("Error deleting article:", error);
      }
    };
    const formatDate2 = (date) => {
      return new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    onMounted(() => {
      fetchArticles();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Управление статьями" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, { title: "Управление статьями" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>Управление статьями</h1>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.articles.create"),
              class: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Создать статью `);
                } else {
                  return [
                    createTextVNode(" Создать статью ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow rounded-lg p-4 mb-6"${_scopeId}><div class="flex flex-wrap gap-4"${_scopeId}><div class="flex-1 min-w-[200px]"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Поиск по заголовку..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}></div><div class="w-48"${_scopeId}><select name="status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "") : ssrLooseEqual(filters.value.status, "")) ? " selected" : ""}${_scopeId}>Все статусы</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "published") : ssrLooseEqual(filters.value.status, "published")) ? " selected" : ""}${_scopeId}>Опубликованные</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "draft") : ssrLooseEqual(filters.value.status, "draft")) ? " selected" : ""}${_scopeId}>Черновики</option></select></div><div class="w-48"${_scopeId}><select name="tag" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.tag) ? ssrLooseContain(filters.value.tag, "") : ssrLooseEqual(filters.value.tag, "")) ? " selected" : ""}${_scopeId}>Все теги</option><!--[-->`);
            ssrRenderList(_ctx.tags, (tag) => {
              _push2(`<option${ssrRenderAttr("value", tag.id)}${ssrIncludeBooleanAttr(Array.isArray(filters.value.tag) ? ssrLooseContain(filters.value.tag, tag.id) : ssrLooseEqual(filters.value.tag, tag.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(tag.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div><div class="bg-white shadow rounded-lg overflow-hidden"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Заголовок </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Автор </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Статус </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Дата создания </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Действия </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(articles.value.data, (article) => {
              _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}>`);
              if (article.image_url) {
                _push2(`<img${ssrRenderAttr("src", article.image_url)} class="h-10 w-10 rounded-md object-cover mr-3"${ssrRenderAttr("alt", article.title)}${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(article.title)}</div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(article.user.name)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": article.status === "published",
                "bg-gray-100 text-gray-800": article.status === "draft"
              }, "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(article.status === "published" ? "Опубликовано" : "Черновик")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate2(article.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("articles.show", article.slug),
                class: "text-indigo-600 hover:text-indigo-900",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Просмотр `);
                  } else {
                    return [
                      createTextVNode(" Просмотр ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.articles.edit", article.id),
                class: "text-yellow-600 hover:text-yellow-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Редактировать `);
                  } else {
                    return [
                      createTextVNode(" Редактировать ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-600 hover:text-red-900"${_scopeId}> Удалить </button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (articles.value.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-4 text-center text-gray-500"${_scopeId}> Статьи не найдены </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table><div class="px-6 py-4 bg-gray-50"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Показано ${ssrInterpolate(articles.value.from)}-${ssrInterpolate(articles.value.to)} из ${ssrInterpolate(articles.value.total)} результатов </div><div class="flex space-x-2"${_scopeId}><!--[-->`);
            ssrRenderList(articles.value.links, (link) => {
              _push2(`<button class="${ssrRenderClass([{
                "bg-indigo-600 text-white": link.active,
                "text-gray-700 hover:bg-gray-100": !link.active,
                "opacity-50 cursor-not-allowed": !link.url
              }, "px-3 py-1 rounded-md text-sm"])}"${ssrIncludeBooleanAttr(!link.url) ? " disabled" : ""}${_scopeId}>${link.label ?? ""}</button>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto" }, [
                createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "Управление статьями"),
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.articles.create"),
                    class: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Создать статью ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg p-4 mb-6" }, [
                  createVNode("div", { class: "flex flex-wrap gap-4" }, [
                    createVNode("div", { class: "flex-1 min-w-[200px]" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        type: "text",
                        placeholder: "Поиск по заголовку...",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                        onInput: unref(debouncedSearch)
                      }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                        [vModelText, searchQuery.value]
                      ])
                    ]),
                    createVNode("div", { class: "w-48" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.value.status = $event,
                        name: "status",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                        onChange: handleFilterChange
                      }, [
                        createVNode("option", { value: "" }, "Все статусы"),
                        createVNode("option", { value: "published" }, "Опубликованные"),
                        createVNode("option", { value: "draft" }, "Черновики")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.value.status]
                      ])
                    ]),
                    createVNode("div", { class: "w-48" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.value.tag = $event,
                        name: "tag",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                        onChange: handleFilterChange
                      }, [
                        createVNode("option", { value: "" }, "Все теги"),
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tags, (tag) => {
                          return openBlock(), createBlock("option", {
                            key: tag.id,
                            value: tag.id
                          }, toDisplayString(tag.name), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.value.tag]
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow rounded-lg overflow-hidden" }, [
                  createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Заголовок "),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Автор "),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Статус "),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Дата создания "),
                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Действия ")
                      ])
                    ]),
                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(articles.value.data, (article) => {
                        return openBlock(), createBlock("tr", {
                          key: article.id
                        }, [
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              article.image_url ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: article.image_url,
                                class: "h-10 w-10 rounded-md object-cover mr-3",
                                alt: article.title
                              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(article.title), 1)
                            ])
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(article.user.name), 1)
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                            createVNode("span", {
                              class: ["px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                "bg-green-100 text-green-800": article.status === "published",
                                "bg-gray-100 text-gray-800": article.status === "draft"
                              }]
                            }, toDisplayString(article.status === "published" ? "Опубликовано" : "Черновик"), 3)
                          ]),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate2(article.created_at)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("articles.show", article.slug),
                              class: "text-indigo-600 hover:text-indigo-900",
                              target: "_blank"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Просмотр ")
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode(unref(Link), {
                              href: _ctx.route("admin.articles.edit", article.id),
                              class: "text-yellow-600 hover:text-yellow-900"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Редактировать ")
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("button", {
                              onClick: ($event) => deleteArticle(article.id),
                              class: "text-red-600 hover:text-red-900"
                            }, " Удалить ", 8, ["onClick"])
                          ])
                        ]);
                      }), 128)),
                      articles.value.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "5",
                          class: "px-6 py-4 text-center text-gray-500"
                        }, " Статьи не найдены ")
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4 bg-gray-50" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-gray-700" }, " Показано " + toDisplayString(articles.value.from) + "-" + toDisplayString(articles.value.to) + " из " + toDisplayString(articles.value.total) + " результатов ", 1),
                      createVNode("div", { class: "flex space-x-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(articles.value.links, (link) => {
                          return openBlock(), createBlock("button", {
                            key: link.label,
                            onClick: ($event) => goToPage(link.url),
                            class: ["px-3 py-1 rounded-md text-sm", {
                              "bg-indigo-600 text-white": link.active,
                              "text-gray-700 hover:bg-gray-100": !link.active,
                              "opacity-50 cursor-not-allowed": !link.url
                            }],
                            disabled: !link.url,
                            innerHTML: link.label
                          }, null, 10, ["onClick", "disabled", "innerHTML"]);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Articles/Index.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  __name: "Statistics",
  __ssrInlineRender: true,
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const period = ref("week");
    const summary = ref({});
    const views = ref([]);
    const comments = ref([]);
    const popularArticles = ref([]);
    const activeUsers = ref([]);
    const articlesStats = ref([]);
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    const viewsChartData = computed(() => {
      if (!views.value.length) return null;
      const labels = views.value.map((item) => item.date);
      return {
        labels,
        datasets: [
          {
            label: "Все просмотры",
            data: views.value.map((item) => item.views),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
          },
          {
            label: "Уникальные просмотры",
            data: views.value.map((item) => item.unique_views),
            borderColor: "rgb(153, 102, 255)",
            tension: 0.1
          }
        ]
      };
    });
    const commentsChartData = computed(() => {
      if (!comments.value.length) return null;
      const labels = comments.value.map((item) => item.date);
      return {
        labels,
        datasets: [
          {
            label: "Комментарии",
            data: comments.value.map((item) => item.count),
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1
          }
        ]
      };
    });
    const formatStatName = (key) => {
      const names = {
        total_articles: "Всего статей",
        published_articles: "Опубликовано",
        total_views: "Просмотров",
        total_comments: "Комментариев",
        unique_viewers: "Уникальных просмотров"
      };
      return names[key] || key;
    };
    const formatDate2 = (date) => {
      return new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/api/statistics");
        statistics.value = response.data;
      } catch (error) {
        notify$2.error("Ошибка при загрузке статистики");
        console.error("Error fetching statistics:", error);
      }
    };
    const updateArticleStats = (articleId, type, count) => {
      const article = articlesStats.value.find((a) => a.id === articleId);
      if (article) {
        article[type] = count;
        article.isUpdated = true;
        article.updatedField = type;
        setTimeout(() => {
          article.isUpdated = false;
          article.updatedField = null;
        }, 2e3);
        articlesStats.value = [...articlesStats.value].sort((a, b) => b.views - a.views);
      }
    };
    const exportStatistics = () => {
      const data = articlesStats.value.map((article) => ({
        "Название": article.title,
        "Статус": article.status === "published" ? "Опубликовано" : "Черновик",
        "Просмотры": article.views,
        "Комментарии": article.comments,
        "Дата создания": formatDate2(article.created_at)
      }));
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `statistics_${period.value}_${(/* @__PURE__ */ new Date()).toISOString()}.csv`;
      link.click();
    };
    let echo = null;
    let updateInterval = null;
    onMounted(() => {
      fetchStatistics();
      echo = window.Echo.channel("statistics").listen("StatisticsUpdated", (e) => {
        updateArticleStats(e.article_id, e.type, e.count);
        notify$2.info(`Обновлена статистика: ${e.type} для статьи #${e.article_id}`);
      }).error((error) => {
        notify$2.error("Ошибка подключения к WebSocket");
        console.error("WebSocket error:", error);
      });
      echo.connector.pusher.connection.bind("disconnected", () => {
        notify$2.warning("Соединение потеряно, пытаемся переподключиться...");
      });
      echo.connector.pusher.connection.bind("connected", () => {
        notify$2.success("Соединение восстановлено");
        fetchStatistics();
      });
      updateInterval = setInterval(fetchStatistics, 5 * 60 * 1e3);
    });
    onBeforeUnmount(() => {
      if (echo) {
        echo.stopListening("StatisticsUpdated");
        echo.connector.pusher.connection.unbind_all();
      }
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Статистика" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, { title: "Статистика" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-c2494eb3${_scopeId}> Статистика </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Статистика ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12" data-v-c2494eb3${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8" data-v-c2494eb3${_scopeId}><div class="flex justify-between items-center mb-6" data-v-c2494eb3${_scopeId}><div class="w-64" data-v-c2494eb3${_scopeId}><label class="block text-sm font-medium text-gray-700" data-v-c2494eb3${_scopeId}>Период</label><select class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" data-v-c2494eb3${_scopeId}><option value="week" data-v-c2494eb3${ssrIncludeBooleanAttr(Array.isArray(period.value) ? ssrLooseContain(period.value, "week") : ssrLooseEqual(period.value, "week")) ? " selected" : ""}${_scopeId}>Неделя</option><option value="month" data-v-c2494eb3${ssrIncludeBooleanAttr(Array.isArray(period.value) ? ssrLooseContain(period.value, "month") : ssrLooseEqual(period.value, "month")) ? " selected" : ""}${_scopeId}>Месяц</option><option value="year" data-v-c2494eb3${ssrIncludeBooleanAttr(Array.isArray(period.value) ? ssrLooseContain(period.value, "year") : ssrLooseEqual(period.value, "year")) ? " selected" : ""}${_scopeId}>Год</option></select></div><button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-v-c2494eb3${_scopeId}><svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-c2494eb3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c2494eb3${_scopeId}></path></svg> Экспорт CSV </button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" data-v-c2494eb3${_scopeId}><div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-4" data-v-c2494eb3${_scopeId}>Статьи</h3><div class="space-y-2" data-v-c2494eb3${_scopeId}><div class="flex justify-between" data-v-c2494eb3${_scopeId}><span class="text-gray-600" data-v-c2494eb3${_scopeId}>Всего:</span><span class="font-medium" data-v-c2494eb3${_scopeId}>${ssrInterpolate(_ctx.statistics.totalArticles)}</span></div><div class="flex justify-between" data-v-c2494eb3${_scopeId}><span class="text-gray-600" data-v-c2494eb3${_scopeId}>Опубликовано:</span><span class="font-medium" data-v-c2494eb3${_scopeId}>${ssrInterpolate(_ctx.statistics.publishedArticles)}</span></div><div class="flex justify-between" data-v-c2494eb3${_scopeId}><span class="text-gray-600" data-v-c2494eb3${_scopeId}>Черновики:</span><span class="font-medium" data-v-c2494eb3${_scopeId}>${ssrInterpolate(_ctx.statistics.draftArticles)}</span></div></div></div><div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-4" data-v-c2494eb3${_scopeId}>Теги</h3><div class="space-y-2" data-v-c2494eb3${_scopeId}><div class="flex justify-between" data-v-c2494eb3${_scopeId}><span class="text-gray-600" data-v-c2494eb3${_scopeId}>Всего тегов:</span><span class="font-medium" data-v-c2494eb3${_scopeId}>${ssrInterpolate(_ctx.statistics.totalTags)}</span></div><div class="mt-4" data-v-c2494eb3${_scopeId}><h4 class="text-sm font-medium text-gray-600 mb-2" data-v-c2494eb3${_scopeId}>Популярные теги:</h4><div class="space-y-1" data-v-c2494eb3${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.statistics.popularTags, (tag) => {
              _push2(`<div class="flex justify-between" data-v-c2494eb3${_scopeId}><span class="text-gray-800" data-v-c2494eb3${_scopeId}>${ssrInterpolate(tag.name)}</span><span class="text-gray-600" data-v-c2494eb3${_scopeId}>${ssrInterpolate(tag.articles_count)}</span></div>`);
            });
            _push2(`<!--]--></div></div></div></div><div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-4" data-v-c2494eb3${_scopeId}>Пользователи</h3><div class="flex justify-between" data-v-c2494eb3${_scopeId}><span class="text-gray-600" data-v-c2494eb3${_scopeId}>Всего пользователей:</span><span class="font-medium" data-v-c2494eb3${_scopeId}>${ssrInterpolate(_ctx.statistics.totalUsers)}</span></div></div></div><div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-4" data-v-c2494eb3${_scopeId}>Последние статьи</h3><div class="space-y-4" data-v-c2494eb3${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.statistics.recentArticles, (article) => {
              _push2(`<div class="flex justify-between items-center" data-v-c2494eb3${_scopeId}><div data-v-c2494eb3${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("articles.show", article.slug),
                class: "text-blue-600 hover:text-blue-800"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(article.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="text-sm text-gray-600" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.author.name)} • ${ssrInterpolate(formatDate2(article.created_at))}</div></div><span class="${ssrRenderClass([{
                "bg-green-100 text-green-800": article.status === "published",
                "bg-gray-100 text-gray-800": article.status === "draft"
              }, "px-2 py-1 text-xs rounded-full"])}" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.status === "published" ? "Опубликовано" : "Черновик")}</span></div>`);
            });
            _push2(`<!--]--></div></div><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6" data-v-c2494eb3${_scopeId}><!--[-->`);
            ssrRenderList(summary.value, (stat, key) => {
              _push2(`<div class="bg-white overflow-hidden shadow rounded-lg" data-v-c2494eb3${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-c2494eb3${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-c2494eb3${_scopeId}>${ssrInterpolate(formatStatName(key))}</dt><dd class="mt-1 text-3xl font-semibold text-gray-900" data-v-c2494eb3${_scopeId}>${ssrInterpolate(stat)}</dd></div></div>`);
            });
            _push2(`<!--]--></div><div class="bg-white shadow rounded-lg mb-6" data-v-c2494eb3${_scopeId}><div class="px-4 py-5 sm:px-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-c2494eb3${_scopeId}>Статистика по статьям</h3></div><div class="border-t border-gray-200" data-v-c2494eb3${_scopeId}><div class="overflow-x-auto" data-v-c2494eb3${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-c2494eb3${_scopeId}><thead class="bg-gray-50" data-v-c2494eb3${_scopeId}><tr data-v-c2494eb3${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c2494eb3${_scopeId}> Название </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c2494eb3${_scopeId}> Статус </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c2494eb3${_scopeId}> Просмотры </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c2494eb3${_scopeId}> Комментарии </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c2494eb3${_scopeId}> Дата создания </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-c2494eb3${_scopeId}><!--[-->`);
            ssrRenderList(articlesStats.value, (article) => {
              _push2(`<tr class="${ssrRenderClass({ "bg-green-50": article.isUpdated })}" data-v-c2494eb3${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-c2494eb3${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.title)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c2494eb3${_scopeId}><span class="${ssrRenderClass({
                "px-2 py-1 text-xs rounded-full": true,
                "bg-green-100 text-green-800": article.status === "published",
                "bg-gray-100 text-gray-800": article.status === "draft"
              })}" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.status === "published" ? "Опубликовано" : "Черновик")}</span></td><td class="${ssrRenderClass([{ "text-green-600": article.updatedField === "views" }, "px-6 py-4 whitespace-nowrap"])}" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.views)}</td><td class="${ssrRenderClass([{ "text-green-600": article.updatedField === "comments" }, "px-6 py-4 whitespace-nowrap"])}" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.comments)}</td><td class="px-6 py-4 whitespace-nowrap" data-v-c2494eb3${_scopeId}>${ssrInterpolate(formatDate2(article.created_at))}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-v-c2494eb3${_scopeId}><div class="bg-white shadow rounded-lg p-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-c2494eb3${_scopeId}>Просмотры</h3>`);
            if (viewsChartData.value) {
              _push2(ssrRenderComponent(unref(Line), {
                "chart-data": viewsChartData.value,
                options: chartOptions
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white shadow rounded-lg p-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-c2494eb3${_scopeId}>Комментарии</h3>`);
            if (commentsChartData.value) {
              _push2(ssrRenderComponent(unref(Line), {
                "chart-data": commentsChartData.value,
                options: chartOptions
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-c2494eb3${_scopeId}><div class="bg-white shadow rounded-lg" data-v-c2494eb3${_scopeId}><div class="px-4 py-5 sm:px-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-c2494eb3${_scopeId}>Популярные статьи</h3></div><div class="border-t border-gray-200" data-v-c2494eb3${_scopeId}><ul role="list" class="divide-y divide-gray-200" data-v-c2494eb3${_scopeId}><!--[-->`);
            ssrRenderList(popularArticles.value, (article) => {
              _push2(`<li class="px-4 py-4 sm:px-6" data-v-c2494eb3${_scopeId}><div class="flex items-center justify-between" data-v-c2494eb3${_scopeId}><div class="truncate" data-v-c2494eb3${_scopeId}><p class="font-medium text-indigo-600 truncate" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.title)}</p><p class="text-sm text-gray-500" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.author)}</p></div><div class="ml-2 flex-shrink-0 flex" data-v-c2494eb3${_scopeId}><p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.views)} просмотров </p><p class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800" data-v-c2494eb3${_scopeId}>${ssrInterpolate(article.comments)} комментариев </p></div></div></li>`);
            });
            _push2(`<!--]--></ul></div></div><div class="bg-white shadow rounded-lg" data-v-c2494eb3${_scopeId}><div class="px-4 py-5 sm:px-6" data-v-c2494eb3${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-c2494eb3${_scopeId}>Активные пользователи</h3></div><div class="border-t border-gray-200" data-v-c2494eb3${_scopeId}><ul role="list" class="divide-y divide-gray-200" data-v-c2494eb3${_scopeId}><!--[-->`);
            ssrRenderList(activeUsers.value, (user, index) => {
              _push2(`<li class="px-4 py-4 sm:px-6" data-v-c2494eb3${_scopeId}><div class="flex items-center justify-between" data-v-c2494eb3${_scopeId}><p class="text-sm font-medium text-gray-900" data-v-c2494eb3${_scopeId}>${ssrInterpolate(user.user)}</p><p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800" data-v-c2494eb3${_scopeId}>${ssrInterpolate(user.comments)} комментариев </p></div></li>`);
            });
            _push2(`<!--]--></ul></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", { class: "w-64" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700" }, "Период"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => period.value = $event,
                        onChange: fetchStatistics,
                        class: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      }, [
                        createVNode("option", { value: "week" }, "Неделя"),
                        createVNode("option", { value: "month" }, "Месяц"),
                        createVNode("option", { value: "year" }, "Год")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, period.value]
                      ])
                    ]),
                    createVNode("button", {
                      onClick: exportStatistics,
                      class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "-ml-1 mr-2 h-5 w-5",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        })
                      ])),
                      createTextVNode(" Экспорт CSV ")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4" }, "Статьи"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Всего:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(_ctx.statistics.totalArticles), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Опубликовано:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(_ctx.statistics.publishedArticles), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Черновики:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(_ctx.statistics.draftArticles), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4" }, "Теги"),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Всего тегов:"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(_ctx.statistics.totalTags), 1)
                        ]),
                        createVNode("div", { class: "mt-4" }, [
                          createVNode("h4", { class: "text-sm font-medium text-gray-600 mb-2" }, "Популярные теги:"),
                          createVNode("div", { class: "space-y-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.statistics.popularTags, (tag) => {
                              return openBlock(), createBlock("div", {
                                key: tag.id,
                                class: "flex justify-between"
                              }, [
                                createVNode("span", { class: "text-gray-800" }, toDisplayString(tag.name), 1),
                                createVNode("span", { class: "text-gray-600" }, toDisplayString(tag.articles_count), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4" }, "Пользователи"),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Всего пользователей:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(_ctx.statistics.totalUsers), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4" }, "Последние статьи"),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.statistics.recentArticles, (article) => {
                        return openBlock(), createBlock("div", {
                          key: article.id,
                          class: "flex justify-between items-center"
                        }, [
                          createVNode("div", null, [
                            createVNode(unref(Link), {
                              href: _ctx.route("articles.show", article.slug),
                              class: "text-blue-600 hover:text-blue-800"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(article.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(article.author.name) + " • " + toDisplayString(formatDate2(article.created_at)), 1)
                          ]),
                          createVNode("span", {
                            class: ["px-2 py-1 text-xs rounded-full", {
                              "bg-green-100 text-green-800": article.status === "published",
                              "bg-gray-100 text-gray-800": article.status === "draft"
                            }]
                          }, toDisplayString(article.status === "published" ? "Опубликовано" : "Черновик"), 3)
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(summary.value, (stat, key) => {
                      return openBlock(), createBlock("div", {
                        key,
                        class: "bg-white overflow-hidden shadow rounded-lg"
                      }, [
                        createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, toDisplayString(formatStatName(key)), 1),
                          createVNode("dd", { class: "mt-1 text-3xl font-semibold text-gray-900" }, toDisplayString(stat), 1)
                        ])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Статистика по статьям")
                    ]),
                    createVNode("div", { class: "border-t border-gray-200" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Название "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Статус "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Просмотры "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Комментарии "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Дата создания ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(articlesStats.value, (article) => {
                              return openBlock(), createBlock("tr", {
                                key: article.id,
                                class: { "bg-green-50": article.isUpdated }
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(article.title), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: {
                                      "px-2 py-1 text-xs rounded-full": true,
                                      "bg-green-100 text-green-800": article.status === "published",
                                      "bg-gray-100 text-gray-800": article.status === "draft"
                                    }
                                  }, toDisplayString(article.status === "published" ? "Опубликовано" : "Черновик"), 3)
                                ]),
                                createVNode("td", {
                                  class: ["px-6 py-4 whitespace-nowrap", { "text-green-600": article.updatedField === "views" }]
                                }, toDisplayString(article.views), 3),
                                createVNode("td", {
                                  class: ["px-6 py-4 whitespace-nowrap", { "text-green-600": article.updatedField === "comments" }]
                                }, toDisplayString(article.comments), 3),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(formatDate2(article.created_at)), 1)
                              ], 2);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Просмотры"),
                      viewsChartData.value ? (openBlock(), createBlock(unref(Line), {
                        key: 0,
                        "chart-data": viewsChartData.value,
                        options: chartOptions
                      }, null, 8, ["chart-data"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-white shadow rounded-lg p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Комментарии"),
                      commentsChartData.value ? (openBlock(), createBlock(unref(Line), {
                        key: 0,
                        "chart-data": commentsChartData.value,
                        options: chartOptions
                      }, null, 8, ["chart-data"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white shadow rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Популярные статьи")
                      ]),
                      createVNode("div", { class: "border-t border-gray-200" }, [
                        createVNode("ul", {
                          role: "list",
                          class: "divide-y divide-gray-200"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(popularArticles.value, (article) => {
                            return openBlock(), createBlock("li", {
                              key: article.id,
                              class: "px-4 py-4 sm:px-6"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("div", { class: "truncate" }, [
                                  createVNode("p", { class: "font-medium text-indigo-600 truncate" }, toDisplayString(article.title), 1),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(article.author), 1)
                                ]),
                                createVNode("div", { class: "ml-2 flex-shrink-0 flex" }, [
                                  createVNode("p", { class: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" }, toDisplayString(article.views) + " просмотров ", 1),
                                  createVNode("p", { class: "ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800" }, toDisplayString(article.comments) + " комментариев ", 1)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white shadow rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Активные пользователи")
                      ]),
                      createVNode("div", { class: "border-t border-gray-200" }, [
                        createVNode("ul", {
                          role: "list",
                          class: "divide-y divide-gray-200"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(activeUsers.value, (user, index) => {
                            return openBlock(), createBlock("li", {
                              key: index,
                              class: "px-4 py-4 sm:px-6"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(user.user), 1),
                                createVNode("p", { class: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800" }, toDisplayString(user.comments) + " комментариев ", 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Statistics.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const Statistics = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-c2494eb3"]]);
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Statistics
}, Symbol.toStringTag, { value: "Module" }));
const toastOptions = {
  position: "top-right",
  timeout: 5e3,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};
const dummyToast$1 = {
  success: () => {
  },
  error: () => {
  },
  warning: () => {
  },
  info: () => {
  }
};
let toast$1 = dummyToast$1;
if (typeof window !== "undefined") {
  import("vue-toastification").then((pkg) => {
    const Toast = pkg.default;
    toast$1 = Toast();
  });
}
const notify$1 = {
  success(message, options) {
    toast$1.success(message, { ...toastOptions, ...options });
  },
  error(message, options) {
    toast$1.error(message, { ...toastOptions, ...options });
  },
  warning(message, options) {
    toast$1.warning(message, { ...toastOptions, ...options });
  },
  info(message, options) {
    toast$1.info(message, { ...toastOptions, ...options });
  }
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "InputLabel",
  __ssrInlineRender: true,
  props: {
    value: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block font-medium text-sm text-gray-700" }, _attrs))}>`);
      if (_ctx.value) {
        _push(`<span>${ssrInterpolate(_ctx.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputLabel.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "TextInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    type: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const input = ref(null);
    onMounted(() => {
      var _a, _b;
      if ((_a = input.value) == null ? void 0 : _a.hasAttribute("autofocus")) {
        (_b = input.value) == null ? void 0 : _b.focus();
      }
    });
    __expose({ focus: () => {
      var _a;
      return (_a = input.value) == null ? void 0 : _a.focus();
    } });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        ref_key: "input",
        ref: input,
        class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
        value: _ctx.modelValue,
        type: _ctx.type
      }, _attrs))}>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: _ctx.message ? null : { display: "none" }
      }, _attrs))}><p class="text-sm text-red-600">${ssrInterpolate(_ctx.message)}</p></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "PrimaryButton",
  __ssrInlineRender: true,
  props: {
    type: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: _ctx.type,
        class: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrimaryButton.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      description: ""
    });
    const handleSubmit = () => {
      form.post(route("admin.tags.store"), {
        preserveScroll: true,
        onSuccess: () => {
          notify$1.success("Тег успешно создан");
        },
        onError: () => {
          notify$1.error("Ошибка при создании тега");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$w, mergeProps({ title: "Создание тега" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              for: "name",
              value: "Название"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$n, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              for: "description",
              value: "Описание"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="3"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$n, {
              message: unref(form).errors.description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Создать `);
                } else {
                  return [
                    createTextVNode(" Создать ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$p, {
                            for: "name",
                            value: "Название"
                          }),
                          createVNode(_sfc_main$o, {
                            id: "name",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            class: "mt-1 block w-full",
                            required: "",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$n, {
                            message: unref(form).errors.name,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$p, {
                            for: "description",
                            value: "Описание"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                            rows: "3"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode(_sfc_main$n, {
                            message: unref(form).errors.description,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end" }, [
                          createVNode(_sfc_main$m, {
                            class: { "opacity-25": unref(form).processing },
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Создать ")
                            ]),
                            _: 1
                          }, 8, ["class", "disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Tags/Create.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    tag: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.tag.name,
      description: props.tag.description || "",
      _method: "PUT"
    });
    const handleSubmit = () => {
      form.post(route("admin.tags.update", props.tag.id), {
        preserveScroll: true,
        onSuccess: () => {
          notify$1.success("Тег успешно обновлен");
        },
        onError: () => {
          notify$1.error("Ошибка при обновлении тега");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$w, mergeProps({ title: "Редактирование тега" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              for: "name",
              value: "Название"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$n, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              for: "description",
              value: "Описание"
            }, null, _parent2, _scopeId));
            _push2(`<textarea id="description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="3"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$n, {
              message: unref(form).errors.description,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Сохранить `);
                } else {
                  return [
                    createTextVNode(" Сохранить ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(handleSubmit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode(_sfc_main$p, {
                            for: "name",
                            value: "Название"
                          }),
                          createVNode(_sfc_main$o, {
                            id: "name",
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            class: "mt-1 block w-full",
                            required: "",
                            autofocus: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$n, {
                            message: unref(form).errors.name,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_sfc_main$p, {
                            for: "description",
                            value: "Описание"
                          }),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            class: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                            rows: "3"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode(_sfc_main$n, {
                            message: unref(form).errors.description,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "flex items-center justify-end" }, [
                          createVNode(_sfc_main$m, {
                            class: { "opacity-25": unref(form).processing },
                            disabled: unref(form).processing
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Сохранить ")
                            ]),
                            _: 1
                          }, 8, ["class", "disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Tags/Edit.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    links: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" }, _attrs))}><div class="flex flex-1 justify-between sm:hidden"><!--[-->`);
      ssrRenderList(_ctx.links.filter((link) => link.label === "Previous" || link.label === "Next"), (link) => {
        _push(ssrRenderComponent(unref(Link), {
          key: link.label,
          href: link.url || "#",
          class: [
            link.url ? "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" : "relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label === "Previous" ? "Назад" : "Вперед")}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label === "Previous" ? "Назад" : "Вперед"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"><div><nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination"><!--[-->`);
      ssrRenderList(_ctx.links, (link) => {
        _push(ssrRenderComponent(unref(Link), {
          key: link.label,
          href: link.url || "#",
          class: [
            link.url ? link.active ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 cursor-not-allowed"
          ]
        }, null, _parent));
      });
      _push(`<!--]--></nav></div></div></div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tags: {}
  },
  setup(__props) {
    const deleteTag = (tag) => {
      if (confirm(`Вы уверены, что хотите удалить тег "${tag.name}"?`)) {
        router.delete(route("admin.tags.destroy", tag.id), {
          preserveScroll: true,
          onSuccess: () => {
            notify$1.success("Тег успешно удален");
          },
          onError: () => {
            notify$1.error("Ошибка при удалении тега");
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$w, mergeProps({ title: "Управление тегами" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-xl font-semibold text-gray-900"${_scopeId}>Теги</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}> Список всех тегов в блоге </p></div><div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.tags.create"),
              class: "inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Создать тег `);
                } else {
                  return [
                    createTextVNode(" Создать тег ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8 flex flex-col"${_scopeId}><div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"${_scopeId}><div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-300"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"${_scopeId}> Название </th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"${_scopeId}> Описание </th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"${_scopeId}> Статей </th><th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6"${_scopeId}><span class="sr-only"${_scopeId}>Действия</span></th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.tags.data, (tag) => {
              _push2(`<tr${_scopeId}><td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"${_scopeId}>${ssrInterpolate(tag.name)}</td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(tag.description || "—")}</td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(tag.articles_count)}</td><td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin.tags.edit", tag.id),
                class: "text-indigo-600 hover:text-indigo-900 mr-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Редактировать `);
                  } else {
                    return [
                      createTextVNode(" Редактировать ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-600 hover:text-red-900"${_scopeId}> Удалить </button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$j, {
              links: _ctx.tags.links
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-xl font-semibold text-gray-900" }, "Теги"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, " Список всех тегов в блоге ")
                ]),
                createVNode("div", { class: "mt-4 sm:mt-0 sm:ml-16 sm:flex-none" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.tags.create"),
                    class: "inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Создать тег ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ]),
              createVNode("div", { class: "mt-8 flex flex-col" }, [
                createVNode("div", { class: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8" }, [
                  createVNode("div", { class: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8" }, [
                    createVNode("div", { class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-300" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", {
                              scope: "col",
                              class: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            }, " Название "),
                            createVNode("th", {
                              scope: "col",
                              class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            }, " Описание "),
                            createVNode("th", {
                              scope: "col",
                              class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            }, " Статей "),
                            createVNode("th", {
                              scope: "col",
                              class: "relative py-3.5 pl-3 pr-4 sm:pr-6"
                            }, [
                              createVNode("span", { class: "sr-only" }, "Действия")
                            ])
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tags.data, (tag) => {
                            return openBlock(), createBlock("tr", {
                              key: tag.id
                            }, [
                              createVNode("td", { class: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6" }, toDisplayString(tag.name), 1),
                              createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, toDisplayString(tag.description || "—"), 1),
                              createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, toDisplayString(tag.articles_count), 1),
                              createVNode("td", { class: "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin.tags.edit", tag.id),
                                  class: "text-indigo-600 hover:text-indigo-900 mr-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Редактировать ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteTag(tag),
                                  class: "text-red-600 hover:text-red-900"
                                }, " Удалить ", 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "mt-6" }, [
                createVNode(_sfc_main$j, {
                  links: _ctx.tags.links
                }, null, 8, ["links"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Tags/Index.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const dummyToast = {
  success: () => {
  },
  error: () => {
  },
  warning: () => {
  },
  info: () => {
  }
};
let toast = dummyToast;
if (typeof window !== "undefined") {
  import("vue-toastification").then((pkg) => {
    const Toast = pkg.default;
    toast = Toast();
  });
}
const showInfoMessage = (message, options) => {
  toast.info(message, options);
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "Comments",
  __ssrInlineRender: true,
  props: {
    articleId: {},
    initialComments: {},
    user: {}
  },
  emits: ["comment-added", "comment-deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const comments = ref(props.initialComments.map((comment) => ({
      ...comment,
      isEditing: false,
      editedContent: comment.content
    })));
    const newComment = ref("");
    const isSubmitting = ref(false);
    const formatDate2 = (date) => {
      return new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const canManageComment = (comment) => {
      return !!props.user && (props.user.id === comment.user_id || props.user.role === "admin");
    };
    const listenToComments = () => {
      window.Echo.channel(`article.${props.articleId}`).listen("CommentCreated", (e) => {
        comments.value.unshift({
          ...e.comment,
          isEditing: false,
          editedContent: e.comment.content
        });
        showInfoMessage("Добавлен новый комментарий");
      }).listen("CommentUpdated", (e) => {
        const index = comments.value.findIndex((c) => c.id === e.comment.id);
        if (index !== -1) {
          comments.value[index] = {
            ...e.comment,
            isEditing: false,
            editedContent: e.comment.content
          };
          showInfoMessage("Комментарий был обновлен");
        }
      }).listen("CommentDeleted", (e) => {
        const index = comments.value.findIndex((c) => c.id === e.commentId);
        if (index !== -1) {
          comments.value.splice(index, 1);
          showInfoMessage("Комментарий был удален");
        }
      });
    };
    onMounted(() => {
      listenToComments();
    });
    onBeforeUnmount(() => {
      window.Echo.leave(`article.${props.articleId}`);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><h2 class="text-2xl font-bold">Комментарии</h2>`);
      if (_ctx.user) {
        _push(`<div class="bg-gray-50 p-4 rounded-lg"><form class="space-y-4"><div><label for="comment" class="sr-only">Ваш комментарий</label><textarea id="comment" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Напишите комментарий..." required>${ssrInterpolate(newComment.value)}</textarea></div><div class="flex justify-end"><button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""}>${ssrInterpolate(isSubmitting.value ? "Отправка..." : "Отправить")}</button></div></form></div>`);
      } else {
        _push(`<div class="bg-gray-50 p-4 rounded-lg text-center"><p class="text-gray-600">Войдите, чтобы оставить комментарий</p></div>`);
      }
      if (comments.value.length) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(comments.value, (comment) => {
          _push(`<div class="bg-white p-4 rounded-lg shadow-sm space-y-2"><div class="flex items-center justify-between"><div class="flex items-center space-x-2"><span class="font-medium">${ssrInterpolate(comment.user.name)}</span><span class="text-gray-500 text-sm">${ssrInterpolate(formatDate2(comment.created_at))}</span></div>`);
          if (canManageComment(comment)) {
            _push(`<div class="flex space-x-2">`);
            if (!comment.isEditing) {
              _push(`<button class="text-gray-600 hover:text-gray-900"> Редактировать </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<button class="text-red-600 hover:text-red-900"> Удалить </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (comment.isEditing) {
            _push(`<div class="mt-2"><textarea class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="3">${ssrInterpolate(comment.editedContent)}</textarea><div class="mt-2 flex justify-end space-x-2"><button class="text-gray-600 hover:text-gray-900"> Отмена </button><button class="text-indigo-600 hover:text-indigo-900"> Сохранить </button></div></div>`);
          } else {
            _push(`<div class="text-gray-700">${ssrInterpolate(comment.content)}</div>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-4 text-gray-500"> Пока нет комментариев </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Comments.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Article",
  __ssrInlineRender: true,
  props: {
    article: {},
    comments: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(ssrRenderComponent(_sfc_main$w, mergeProps({
        title: _ctx.article.title
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-hidden bg-white shadow-xl sm:rounded-lg" data-v-18efb129${_scopeId}><div class="p-6 sm:px-20 bg-white" data-v-18efb129${_scopeId}><article class="prose lg:prose-xl mx-auto" data-v-18efb129${_scopeId}><h1 data-v-18efb129${_scopeId}>${ssrInterpolate(_ctx.article.title)}</h1><div class="flex items-center space-x-4 text-sm text-gray-500" data-v-18efb129${_scopeId}><time${ssrRenderAttr("datetime", _ctx.article.created_at)} data-v-18efb129${_scopeId}>${ssrInterpolate(unref(formatDate)(_ctx.article.created_at))}</time><div class="flex items-center space-x-2" data-v-18efb129${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.article.tags, (tag) => {
              _push2(`<span data-v-18efb129${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Link, {
                href: _ctx.route("tags.show", tag.slug),
                class: "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(tag.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(tag.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            });
            _push2(`<!--]--></div></div>`);
            if (_ctx.article.image) {
              _push2(`<div class="my-8" data-v-18efb129${_scopeId}><img${ssrRenderAttr("src", _ctx.article.image)}${ssrRenderAttr("alt", _ctx.article.title)} class="w-full rounded-lg shadow-lg" data-v-18efb129${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-8" data-v-18efb129${_scopeId}>${_ctx.article.content ?? ""}</div></article><div class="mt-16" data-v-18efb129${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$h, {
              comments: _ctx.comments,
              "article-id": _ctx.article.id
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-hidden bg-white shadow-xl sm:rounded-lg" }, [
                createVNode("div", { class: "p-6 sm:px-20 bg-white" }, [
                  createVNode("article", { class: "prose lg:prose-xl mx-auto" }, [
                    createVNode("h1", null, toDisplayString(_ctx.article.title), 1),
                    createVNode("div", { class: "flex items-center space-x-4 text-sm text-gray-500" }, [
                      createVNode("time", {
                        datetime: _ctx.article.created_at
                      }, toDisplayString(unref(formatDate)(_ctx.article.created_at)), 9, ["datetime"]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.article.tags, (tag) => {
                          return openBlock(), createBlock("span", {
                            key: tag.id
                          }, [
                            createVNode(_component_Link, {
                              href: _ctx.route("tags.show", tag.slug),
                              class: "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(tag.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]);
                        }), 128))
                      ])
                    ]),
                    _ctx.article.image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "my-8"
                    }, [
                      createVNode("img", {
                        src: _ctx.article.image,
                        alt: _ctx.article.title,
                        class: "w-full rounded-lg shadow-lg"
                      }, null, 8, ["src", "alt"])
                    ])) : createCommentVNode("", true),
                    createVNode("div", {
                      innerHTML: _ctx.article.content,
                      class: "mt-8"
                    }, null, 8, ["innerHTML"])
                  ]),
                  createVNode("div", { class: "mt-16" }, [
                    createVNode(_sfc_main$h, {
                      comments: _ctx.comments,
                      "article-id": _ctx.article.id
                    }, null, 8, ["comments", "article-id"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Article.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Article = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-18efb129"]]);
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Article
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "ArticleCard",
  __ssrInlineRender: true,
  props: {
    article: {},
    prefetch: { type: [String, Boolean] }
  },
  setup(__props) {
    const truncate = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    const formatDate2 = (date) => {
      return new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white overflow-hidden shadow-sm sm:rounded-lg h-full flex flex-col hover:shadow-md transition-shadow duration-200" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("articles.show", _ctx.article.slug),
        class: "flex flex-col h-full",
        prefetch: _ctx.prefetch
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.article.image_url) {
              _push2(`<img${ssrRenderAttr("src", _ctx.article.image_url)}${ssrRenderAttr("alt", _ctx.article.title)} class="w-full h-48 object-cover"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="p-6 flex-1 flex flex-col"${_scopeId}><h2 class="text-xl font-semibold mb-2 hover:text-gray-600 transition-colors duration-200"${_scopeId}>${ssrInterpolate(_ctx.article.title)}</h2><p class="text-gray-600 mb-4 flex-1"${_scopeId}>${ssrInterpolate(truncate(_ctx.article.content, 150))}</p><div class="mt-auto"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(_ctx.article.user.name)}</span><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate2(_ctx.article.created_at))}</span></div></div></div>`);
          } else {
            return [
              _ctx.article.image_url ? (openBlock(), createBlock("img", {
                key: 0,
                src: _ctx.article.image_url,
                alt: _ctx.article.title,
                class: "w-full h-48 object-cover"
              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
              createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                createVNode("h2", { class: "text-xl font-semibold mb-2 hover:text-gray-600 transition-colors duration-200" }, toDisplayString(_ctx.article.title), 1),
                createVNode("p", { class: "text-gray-600 mb-4 flex-1" }, toDisplayString(truncate(_ctx.article.content, 150)), 1),
                createVNode("div", { class: "mt-auto" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                    createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(_ctx.article.user.name), 1),
                    createVNode("span", { class: "text-sm text-gray-500" }, toDisplayString(formatDate2(_ctx.article.created_at)), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="px-6 pb-6"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(_ctx.article.tags, (tag) => {
        _push(ssrRenderComponent(unref(Link), {
          key: tag.id,
          href: _ctx.route("tags.show", tag.slug),
          class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200",
          prefetch: "hover"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ArticleCard.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "LoadingSpinner",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center" }, _attrs))}><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LoadingSpinner.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const hasMorePages = computed(() => {
      const pagination = page.props.articlesPagination;
      return pagination && pagination.current_page < pagination.last_page;
    });
    const isFirstPage = computed(() => {
      var _a;
      return ((_a = page.props.articlesPagination) == null ? void 0 : _a.current_page) === 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Статьи" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, { title: "Статьи" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Статьи </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Статьи ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(page).props.articles.data, (article) => {
              _push2(`<div class="relative flex flex-col"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$f, {
                article,
                prefetch: "hover"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div>`);
            if (isFirstPage.value && unref(page).props.articles.data.length === 0) {
              _push2(`<div class="text-center py-6 text-gray-600"${_scopeId}> Статьи не найдены </div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              if (hasMorePages.value) {
                _push2(ssrRenderComponent(unref(WhenVisible), {
                  params: {
                    data: {
                      page: unref(page).props.articlesPagination.current_page + 1
                    },
                    only: ["articles", "articlesPagination"],
                    preserveScroll: true,
                    preserveState: true
                  },
                  buffer: 500
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex justify-center py-6"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$e, null, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex justify-center py-6" }, [
                          createVNode(_sfc_main$e)
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (!hasMorePages.value && unref(page).props.articles.data.length > 0) {
                _push2(`<div class="text-center py-6 text-gray-600"${_scopeId}> Вы достигли конца списка </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(page).props.articles.data, (article) => {
                      return openBlock(), createBlock("div", {
                        key: article.id,
                        class: "relative flex flex-col"
                      }, [
                        createVNode(_sfc_main$f, {
                          article,
                          prefetch: "hover"
                        }, null, 8, ["article"])
                      ]);
                    }), 128))
                  ]),
                  isFirstPage.value && unref(page).props.articles.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-6 text-gray-600"
                  }, " Статьи не найдены ")) : (openBlock(), createBlock("div", { key: 1 }, [
                    hasMorePages.value ? (openBlock(), createBlock(unref(WhenVisible), {
                      key: 0,
                      params: {
                        data: {
                          page: unref(page).props.articlesPagination.current_page + 1
                        },
                        only: ["articles", "articlesPagination"],
                        preserveScroll: true,
                        preserveState: true
                      },
                      buffer: 500
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex justify-center py-6" }, [
                          createVNode(_sfc_main$e)
                        ])
                      ]),
                      _: 1
                    }, 8, ["params"])) : createCommentVNode("", true),
                    !hasMorePages.value && unref(page).props.articles.data.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-6 text-gray-600"
                    }, " Вы достигли конца списка ")) : createCommentVNode("", true)
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Articles/Index.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Comment",
  __ssrInlineRender: true,
  props: {
    comment: {},
    currentUser: {}
  },
  emits: ["reply", "update", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isEditing = ref(false);
    ref(false);
    const editedContent = ref(props.comment.content);
    const canModifyComment = () => {
      return props.currentUser && (props.currentUser.id === props.comment.user_id || props.currentUser.role === "admin");
    };
    const formatDate2 = (date) => {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ru
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Comment = resolveComponent("Comment", true);
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment" }, _attrs))}><div class="bg-white rounded-lg shadow p-4 mb-2">`);
      if (_ctx.comment.parent_id) {
        _push(`<div class="text-sm text-gray-500 mb-2"> Ответ на комментарий </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-start space-x-4"><div class="flex-1"><div class="flex items-center justify-between"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(_ctx.comment.user.name)}</div><div class="text-sm text-gray-500">${ssrInterpolate(formatDate2(_ctx.comment.created_at))}</div></div>`);
      if (!isEditing.value) {
        _push(`<div class="mt-2 text-sm text-gray-700">${ssrInterpolate(_ctx.comment.content)}</div>`);
      } else {
        _push(`<div class="mt-2"><textarea class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3">${ssrInterpolate(editedContent.value)}</textarea><div class="mt-2 flex justify-end space-x-2"><button class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"> Отмена </button><button class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"${ssrIncludeBooleanAttr(!editedContent.value.trim()) ? " disabled" : ""}> Сохранить </button></div></div>`);
      }
      if (!isEditing.value) {
        _push(`<div class="mt-2 flex items-center space-x-4"><button class="text-sm text-gray-500 hover:text-gray-700"> Ответить </button>`);
        if (canModifyComment()) {
          _push(`<!--[--><button class="text-sm text-gray-500 hover:text-gray-700"> Редактировать </button><button class="text-sm text-red-500 hover:text-red-700"> Удалить </button><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (_ctx.comment.replies && _ctx.comment.replies.length > 0) {
        _push(`<div class="pl-8 space-y-2 border-l-2 border-gray-100"><!--[-->`);
        ssrRenderList(_ctx.comment.replies, (reply) => {
          _push(ssrRenderComponent(_component_Comment, {
            key: reply.id,
            comment: reply,
            "current-user": _ctx.currentUser,
            onReply: (id) => _ctx.$emit("reply", id),
            onUpdate: (id, content) => _ctx.$emit("update", id, content),
            onDelete: (id) => _ctx.$emit("delete", id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Comments/Comment.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "CommentSection",
  __ssrInlineRender: true,
  props: {
    articleSlug: {},
    currentUser: {}
  },
  setup(__props) {
    const props = __props;
    usePage();
    const comments = ref([]);
    const newComment = ref("");
    const replyToId = ref(null);
    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const loadComments = async () => {
      try {
        const response = await axios.get(`/api/articles/${props.articleSlug}/comments`);
        console.log(response.data);
        comments.value = organizeComments(response.data);
        console.log(comments.value);
      } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const organizeComments = (flatComments) => {
      const commentMap = /* @__PURE__ */ new Map();
      const rootComments = [];
      const sortedComments = [...flatComments].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      sortedComments.forEach((comment) => {
        commentMap.set(comment.id, { ...comment });
      });
      sortedComments.forEach((comment) => {
        const processedComment = commentMap.get(comment.id);
        if (!processedComment) return;
        if (comment.parent_id === null) {
          rootComments.push(processedComment);
        } else {
          const parentComment = commentMap.get(comment.parent_id);
          if (parentComment) {
            if (!Array.isArray(parentComment.replies)) {
              parentComment.replies = [];
            }
            parentComment.replies.push(processedComment);
          } else {
            rootComments.push(processedComment);
          }
        }
      });
      const sortReplies = (comment) => {
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
          comment.replies.forEach(sortReplies);
        }
      };
      rootComments.forEach(sortReplies);
      return rootComments;
    };
    const updateComment = async (commentId, content) => {
      try {
        const response = await axios.put(`/api/comments/${commentId}`, { content });
        const comment = findComment(comments.value, commentId);
        if (comment) {
          comment.content = content;
          comment.updated_at = response.data.updated_at;
        }
      } catch (error) {
        console.error("Ошибка при обновлении комментария:", error);
      }
    };
    const deleteComment = async (commentId) => {
      try {
        await axios.delete(`/api/comments/${commentId}`);
        removeComment(comments.value, commentId);
      } catch (error) {
        console.error("Ошибка при удалении комментария:", error);
      }
    };
    const findComment = (comments2, id) => {
      for (const comment of comments2) {
        if (comment.id === id) return comment;
        if (comment.replies) {
          const found = findComment(comment.replies, id);
          if (found) return found;
        }
      }
      return null;
    };
    const removeComment = (comments2, id) => {
      const index = comments2.findIndex((c) => c.id === id);
      if (index !== -1) {
        comments2.splice(index, 1);
        return true;
      }
      for (const comment of comments2) {
        if (comment.replies && removeComment(comment.replies, id)) {
          return true;
        }
      }
      return false;
    };
    onMounted(() => {
      loadComments();
      const channel = Echo.channel(`article.${props.articleSlug}`);
      channel.listen(".comment.created", (e) => {
        const newComment2 = e.comment;
        if (newComment2.parent_id) {
          const parentComment = findComment(comments.value, newComment2.parent_id);
          if (parentComment) {
            if (!parentComment.replies) parentComment.replies = [];
            parentComment.replies.push(newComment2);
          }
        } else {
          comments.value.unshift(newComment2);
        }
      }).listen(".comment.updated", (e) => {
        const comment = findComment(comments.value, e.comment.id);
        if (comment) {
          comment.content = e.comment.content;
          comment.updated_at = e.comment.updated_at;
        }
      }).listen(".comment.deleted", (e) => {
        removeComment(comments.value, e.commentId);
      });
    });
    onBeforeUnmount(() => {
      Echo.leave(`article.${props.articleSlug}`);
    });
    const handleReply = (commentId) => {
      var _a;
      replyToId.value = commentId;
      (_a = document.getElementById("comment-form")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><h2 class="text-2xl font-bold">Комментарии</h2>`);
      if (_ctx.currentUser) {
        _push(`<div id="comment-form" class="bg-white p-4 rounded-lg shadow-sm"><form class="space-y-4"><div>`);
        if (replyToId.value) {
          _push(`<label class="block text-sm text-gray-600 mb-2"> Ответ на комментарий <button class="ml-2 text-blue-600 hover:text-blue-800"> отменить </button></label>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<textarea rows="3" class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"${ssrRenderAttr("placeholder", replyToId.value ? "Напишите ответ..." : "Напишите комментарий...")} required>${ssrInterpolate(newComment.value)}</textarea></div><div class="flex justify-end"><button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"${ssrIncludeBooleanAttr(isSubmitting.value || !newComment.value.trim()) ? " disabled" : ""}>${ssrInterpolate(isSubmitting.value ? "Отправка..." : "Отправить")}</button></div></form></div>`);
      } else {
        _push(`<div class="bg-gray-50 p-4 rounded-lg text-center"><p class="text-gray-600">Войдите, чтобы оставить комментарий</p></div>`);
      }
      if (isLoading.value) {
        _push(`<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>`);
      } else if (comments.value.length) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(comments.value, (comment) => {
          _push(ssrRenderComponent(_sfc_main$c, {
            key: comment.id,
            comment,
            "current-user": _ctx.currentUser,
            level: 0,
            onReply: handleReply,
            onUpdate: updateComment,
            onDelete: deleteComment
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-8"><p class="text-gray-500">Пока нет комментариев. Будьте первым!</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Comments/CommentSection.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: ((_a = _ctx.article) == null ? void 0 : _a.title) || "Статья"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, {
        title: ((_b = _ctx.article) == null ? void 0 : _b.title) || "Статья"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}>${ssrInterpolate((_a2 = _ctx.article) == null ? void 0 : _a2.title)}</h2>`);
            if ((_c = (_b2 = _ctx.article) == null ? void 0 : _b2.tags) == null ? void 0 : _c.length) {
              _push2(`<div class="flex gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.article.tags, (tag) => {
                _push2(`<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"${_scopeId}> #${ssrInterpolate(tag.name)}</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, toDisplayString((_d = _ctx.article) == null ? void 0 : _d.title), 1),
                ((_f = (_e = _ctx.article) == null ? void 0 : _e.tags) == null ? void 0 : _f.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex gap-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.article.tags, (tag) => {
                    return openBlock(), createBlock("span", {
                      key: tag.id,
                      class: "px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                    }, " #" + toDisplayString(tag.name), 1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}><div class="flex flex-col space-y-4"${_scopeId}><h1 class="text-3xl font-bold"${_scopeId}>${ssrInterpolate((_a2 = _ctx.article) == null ? void 0 : _a2.title)}</h1>`);
            if ((_c = (_b2 = _ctx.article) == null ? void 0 : _b2.tags) == null ? void 0 : _c.length) {
              _push2(`<div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.article.tags, (tag) => {
                _push2(`<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 cursor-pointer"${_scopeId}> #${ssrInterpolate(tag.name)}</span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_d = _ctx.article) == null ? void 0 : _d.image_url) {
              _push2(`<img${ssrRenderAttr("src", _ctx.article.image_url)}${ssrRenderAttr("alt", (_e = _ctx.article) == null ? void 0 : _e.title)} class="w-full h-64 object-cover rounded-lg"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="prose max-w-none"${_scopeId}>${((_f = _ctx.article) == null ? void 0 : _f.content) ?? ""}</div></div></div>`);
            if (_ctx.article) {
              _push2(`<div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$b, {
                "article-slug": _ctx.article.slug,
                "current-user": _ctx.$page.props.auth.user
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg" }, [
                    createVNode("div", { class: "flex flex-col space-y-4" }, [
                      createVNode("h1", { class: "text-3xl font-bold" }, toDisplayString((_g = _ctx.article) == null ? void 0 : _g.title), 1),
                      ((_i = (_h = _ctx.article) == null ? void 0 : _h.tags) == null ? void 0 : _i.length) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.article.tags, (tag) => {
                          return openBlock(), createBlock("span", {
                            key: tag.id,
                            class: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 cursor-pointer"
                          }, " #" + toDisplayString(tag.name), 1);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      ((_j = _ctx.article) == null ? void 0 : _j.image_url) ? (openBlock(), createBlock("img", {
                        key: 1,
                        src: _ctx.article.image_url,
                        alt: (_k = _ctx.article) == null ? void 0 : _k.title,
                        class: "w-full h-64 object-cover rounded-lg"
                      }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                      createVNode("div", {
                        class: "prose max-w-none",
                        innerHTML: (_l = _ctx.article) == null ? void 0 : _l.content
                      }, null, 8, ["innerHTML"])
                    ])
                  ]),
                  _ctx.article ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-4 sm:p-8 bg-white shadow sm:rounded-lg"
                  }, [
                    createVNode(_sfc_main$b, {
                      "article-slug": _ctx.article.slug,
                      "current-user": _ctx.$page.props.auth.user
                    }, null, 8, ["article-slug", "current-user"])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Articles/Show.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ArticlesList",
  __ssrInlineRender: true,
  props: {
    articles: {},
    filters: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$w, mergeProps({ title: "Статьи" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-hidden bg-white shadow-xl sm:rounded-lg" data-v-bd4e5d57${_scopeId}><div class="p-6 sm:px-20 bg-white" data-v-bd4e5d57${_scopeId}><div class="mt-8 space-y-6" data-v-bd4e5d57${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.articles.data, (article) => {
              _push2(`<div class="flex flex-col space-y-4" data-v-bd4e5d57${_scopeId}><div class="space-y-2" data-v-bd4e5d57${_scopeId}><div class="flex items-center justify-between" data-v-bd4e5d57${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("articles.show", article.slug),
                class: "text-2xl font-bold text-gray-900 hover:text-indigo-600"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(article.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<span class="text-sm text-gray-500" data-v-bd4e5d57${_scopeId}>${ssrInterpolate(unref(formatDate)(article.created_at))}</span></div><div class="flex items-center space-x-2" data-v-bd4e5d57${_scopeId}><!--[-->`);
              ssrRenderList(article.tags, (tag) => {
                _push2(`<span data-v-bd4e5d57${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("tags.show", tag.slug),
                  class: "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(tag.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(tag.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</span>`);
              });
              _push2(`<!--]--></div><p class="text-gray-500" data-v-bd4e5d57${_scopeId}>${ssrInterpolate(article.excerpt)}</p></div><hr class="border-gray-200" data-v-bd4e5d57${_scopeId}></div>`);
            });
            _push2(`<!--]--></div><div class="mt-6" data-v-bd4e5d57${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$j, {
              links: _ctx.articles.links
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-hidden bg-white shadow-xl sm:rounded-lg" }, [
                createVNode("div", { class: "p-6 sm:px-20 bg-white" }, [
                  createVNode("div", { class: "mt-8 space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.articles.data, (article) => {
                      return openBlock(), createBlock("div", {
                        key: article.id,
                        class: "flex flex-col space-y-4"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("articles.show", article.slug),
                              class: "text-2xl font-bold text-gray-900 hover:text-indigo-600"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(article.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("span", { class: "text-sm text-gray-500" }, toDisplayString(unref(formatDate)(article.created_at)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(article.tags, (tag) => {
                              return openBlock(), createBlock("span", {
                                key: tag.id
                              }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("tags.show", tag.slug),
                                  class: "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tag.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]);
                            }), 128))
                          ]),
                          createVNode("p", { class: "text-gray-500" }, toDisplayString(article.excerpt), 1)
                        ]),
                        createVNode("hr", { class: "border-gray-200" })
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "mt-6" }, [
                    createVNode(_sfc_main$j, {
                      links: _ctx.articles.links
                    }, null, 8, ["links"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ArticlesList.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ArticlesList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-bd4e5d57"]]);
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ArticlesList
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "GuestLayout",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: _ctx.title }, null, _parent));
      _push(`<div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: { type: Boolean },
    value: {}
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: _ctx.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, _ctx.value) : proxyChecked.value,
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: { type: Boolean },
    status: {}
  },
  setup(__props) {
    const page = usePage();
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        preserveScroll: true,
        onSuccess: () => {
          const flash = page.props.flash;
          if (flash.message) {
            notify$2.success(flash.message);
          }
        },
        onError: () => {
          notify$2.error("Ошибка входа в систему");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Вход" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$8, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Пожалуйста, войдите в свою учетную запись </div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$n, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$p, {
              for: "password",
              value: "Пароль"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$o, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$n, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>Запомнить меня</span></label></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            if (_ctx.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Забыли пароль? `);
                  } else {
                    return [
                      createTextVNode(" Забыли пароль? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$m, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Войти `);
                } else {
                  return [
                    createTextVNode(" Войти ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Пожалуйста, войдите в свою учетную запись "),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$p, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$o, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$n, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$p, {
                    for: "password",
                    value: "Пароль"
                  }),
                  createVNode(_sfc_main$o, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$n, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "block mt-4" }, [
                  createVNode("label", { class: "flex items-center" }, [
                    createVNode(_sfc_main$7, {
                      name: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ms-2 text-sm text-gray-600" }, "Запомнить меня")
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  _ctx.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Забыли пароль? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$m, {
                    class: ["ms-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Войти ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "Test",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const isAuthenticated = computed(() => {
      var _a, _b;
      return !!((_b = (_a = page.props) == null ? void 0 : _a.auth) == null ? void 0 : _b.user);
    });
    const user = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props) == null ? void 0 : _a.auth) == null ? void 0 : _b.user) || null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Тест авторизации" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, { title: "Тест авторизации" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6"${_scopeId}><h2 class="text-2xl font-bold mb-4"${_scopeId}>Тест авторизации</h2><div class="space-y-4"${_scopeId}><div${_scopeId}><strong${_scopeId}>Статус авторизации:</strong><span class="${ssrRenderClass(isAuthenticated.value ? "text-green-600" : "text-red-600")}"${_scopeId}>${ssrInterpolate(isAuthenticated.value ? "Авторизован" : "Не авторизован")}</span></div>`);
            if (user.value) {
              _push2(`<div${_scopeId}><h3 class="text-xl font-semibold mb-2"${_scopeId}>Информация о пользователе:</h3><ul class="list-disc list-inside space-y-2"${_scopeId}><li${_scopeId}><strong${_scopeId}>ID:</strong> ${ssrInterpolate(user.value.id)}</li><li${_scopeId}><strong${_scopeId}>Имя:</strong> ${ssrInterpolate(user.value.name)}</li><li${_scopeId}><strong${_scopeId}>Email:</strong> ${ssrInterpolate(user.value.email)}</li><li${_scopeId}><strong${_scopeId}>Роль:</strong> ${ssrInterpolate(user.value.role || "Не указана")}</li></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-xl sm:rounded-lg p-6" }, [
                    createVNode("h2", { class: "text-2xl font-bold mb-4" }, "Тест авторизации"),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("strong", null, "Статус авторизации:"),
                        createVNode("span", {
                          class: isAuthenticated.value ? "text-green-600" : "text-red-600"
                        }, toDisplayString(isAuthenticated.value ? "Авторизован" : "Не авторизован"), 3)
                      ]),
                      user.value ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("h3", { class: "text-xl font-semibold mb-2" }, "Информация о пользователе:"),
                        createVNode("ul", { class: "list-disc list-inside space-y-2" }, [
                          createVNode("li", null, [
                            createVNode("strong", null, "ID:"),
                            createTextVNode(" " + toDisplayString(user.value.id), 1)
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Имя:"),
                            createTextVNode(" " + toDisplayString(user.value.name), 1)
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Email:"),
                            createTextVNode(" " + toDisplayString(user.value.email), 1)
                          ]),
                          createVNode("li", null, [
                            createVNode("strong", null, "Роль:"),
                            createTextVNode(" " + toDisplayString(user.value.role || "Не указана"), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Test.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: {},
    message: {},
    ziggy: {}
  },
  setup(__props) {
    const props = __props;
    const title = {
      404: "Страница не найдена",
      500: "Ошибка сервера",
      503: "Сервис недоступен"
    }[props.status] || "Ошибка";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Head), { title: unref(title) }, null, _parent));
      _push(`<div class="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 text-center"><h1 class="text-6xl font-bold text-gray-800 mb-4">${ssrInterpolate(_ctx.status)}</h1><p class="text-xl text-gray-600 mb-6">${ssrInterpolate(unref(title))}</p>`);
      if (_ctx.message) {
        _push(`<p class="text-gray-500 mb-8">${ssrInterpolate(_ctx.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Вернуться на главную </button></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    statistics: {
      type: Object,
      required: true
    },
    popularArticles: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Статистика" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, { title: "Статистика" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto px-4 py-8"${_scopeId}><h1 class="text-3xl font-bold mb-8"${_scopeId}>Статистика блога</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"${_scopeId}><div class="bg-white rounded-lg shadow p-6"${_scopeId}><h2 class="text-xl font-semibold mb-4"${_scopeId}>Общие просмотры</h2><p class="text-4xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(__props.statistics.total_views)}</p></div><div class="bg-white rounded-lg shadow p-6"${_scopeId}><h2 class="text-xl font-semibold mb-4"${_scopeId}>Уникальные просмотры</h2><p class="text-4xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(__props.statistics.total_unique_views)}</p></div><div class="bg-white rounded-lg shadow p-6"${_scopeId}><h2 class="text-xl font-semibold mb-4"${_scopeId}>Среднее количество просмотров</h2><p class="text-4xl font-bold text-purple-600"${_scopeId}>${ssrInterpolate(Math.round(__props.statistics.average_views_per_article))}</p></div></div><div class="bg-white rounded-lg shadow p-6 mb-8"${_scopeId}><h2 class="text-2xl font-semibold mb-6"${_scopeId}>Популярные браузеры</h2><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.statistics.most_used_browsers, (browser) => {
              _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="text-gray-700"${_scopeId}>${ssrInterpolate(browser._id)}</span><span class="text-blue-600 font-semibold"${_scopeId}>${ssrInterpolate(browser.count)} просмотров</span></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow p-6 mb-8"${_scopeId}><h2 class="text-2xl font-semibold mb-6"${_scopeId}>Источники трафика</h2><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.statistics.top_referrers, (referrer) => {
              _push2(`<div class="flex justify-between items-center"${_scopeId}><span class="text-gray-700"${_scopeId}>${ssrInterpolate(referrer._id || "Прямой переход")}</span><span class="text-green-600 font-semibold"${_scopeId}>${ssrInterpolate(referrer.count)} переходов</span></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow p-6"${_scopeId}><h2 class="text-2xl font-semibold mb-6"${_scopeId}>Популярные статьи</h2><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.popularArticles, (item) => {
              _push2(`<div class="border-b pb-4 last:border-0"${_scopeId}><h3 class="text-xl font-medium mb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("articles.show", item.article.slug),
                class: "text-blue-600 hover:text-blue-800"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.article.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</h3><div class="flex space-x-6 text-sm text-gray-600"${_scopeId}><span${_scopeId}>${ssrInterpolate(item.statistics.views)} просмотров</span><span${_scopeId}>${ssrInterpolate(item.statistics.unique_views)} уникальных просмотров</span></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container mx-auto px-4 py-8" }, [
                createVNode("h1", { class: "text-3xl font-bold mb-8" }, "Статистика блога"),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("h2", { class: "text-xl font-semibold mb-4" }, "Общие просмотры"),
                    createVNode("p", { class: "text-4xl font-bold text-blue-600" }, toDisplayString(__props.statistics.total_views), 1)
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("h2", { class: "text-xl font-semibold mb-4" }, "Уникальные просмотры"),
                    createVNode("p", { class: "text-4xl font-bold text-green-600" }, toDisplayString(__props.statistics.total_unique_views), 1)
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("h2", { class: "text-xl font-semibold mb-4" }, "Среднее количество просмотров"),
                    createVNode("p", { class: "text-4xl font-bold text-purple-600" }, toDisplayString(Math.round(__props.statistics.average_views_per_article)), 1)
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow p-6 mb-8" }, [
                  createVNode("h2", { class: "text-2xl font-semibold mb-6" }, "Популярные браузеры"),
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.statistics.most_used_browsers, (browser) => {
                      return openBlock(), createBlock("div", {
                        key: browser._id,
                        class: "flex justify-between items-center"
                      }, [
                        createVNode("span", { class: "text-gray-700" }, toDisplayString(browser._id), 1),
                        createVNode("span", { class: "text-blue-600 font-semibold" }, toDisplayString(browser.count) + " просмотров", 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow p-6 mb-8" }, [
                  createVNode("h2", { class: "text-2xl font-semibold mb-6" }, "Источники трафика"),
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.statistics.top_referrers, (referrer) => {
                      return openBlock(), createBlock("div", {
                        key: referrer._id,
                        class: "flex justify-between items-center"
                      }, [
                        createVNode("span", { class: "text-gray-700" }, toDisplayString(referrer._id || "Прямой переход"), 1),
                        createVNode("span", { class: "text-green-600 font-semibold" }, toDisplayString(referrer.count) + " переходов", 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                  createVNode("h2", { class: "text-2xl font-semibold mb-6" }, "Популярные статьи"),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.popularArticles, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.article.id,
                        class: "border-b pb-4 last:border-0"
                      }, [
                        createVNode("h3", { class: "text-xl font-medium mb-2" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("articles.show", item.article.slug),
                            class: "text-blue-600 hover:text-blue-800"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.article.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]),
                        createVNode("div", { class: "flex space-x-6 text-sm text-gray-600" }, [
                          createVNode("span", null, toDisplayString(item.statistics.views) + " просмотров", 1),
                          createVNode("span", null, toDisplayString(item.statistics.unique_views) + " уникальных просмотров", 1)
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Statistics/Index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tags: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Теги" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, { title: "Теги" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gray-100 py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 mb-8"${_scopeId}>Теги</h1><div class="bg-white overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 bg-white border-b border-gray-200"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.tags, (tag) => {
              _push2(`<div class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"${_scopeId}><div class="min-w-0 flex-1"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("tags.show", tag.slug),
                class: "focus:outline-none"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="absolute inset-0" aria-hidden="true"${_scopeId2}></span><p class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(tag.name)}</p><p class="truncate text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(tag.description)}</p><p class="mt-1 text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(tag.articles_count)} статей </p>`);
                  } else {
                    return [
                      createVNode("span", {
                        class: "absolute inset-0",
                        "aria-hidden": "true"
                      }),
                      createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(tag.name), 1),
                      createVNode("p", { class: "truncate text-sm text-gray-500" }, toDisplayString(tag.description), 1),
                      createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(tag.articles_count) + " статей ", 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gray-100 py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("h1", { class: "text-3xl font-bold text-gray-900 mb-8" }, "Теги"),
                  createVNode("div", { class: "bg-white overflow-hidden shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 bg-white border-b border-gray-200" }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tags, (tag) => {
                          return openBlock(), createBlock("div", {
                            key: tag.id,
                            class: "relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                          }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("tags.show", tag.slug),
                                class: "focus:outline-none"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", {
                                    class: "absolute inset-0",
                                    "aria-hidden": "true"
                                  }),
                                  createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(tag.name), 1),
                                  createVNode("p", { class: "truncate text-sm text-gray-500" }, toDisplayString(tag.description), 1),
                                  createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(tag.articles_count) + " статей ", 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tags/Index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Show",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const hasMorePages = computed(
      () => {
        var _a, _b;
        return ((_a = page.props.articlesPagination) == null ? void 0 : _a.current_page) < ((_b = page.props.articlesPagination) == null ? void 0 : _b.last_page);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(page).props.tag.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, {
        title: unref(page).props.tag.name
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white shadow sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(unref(page).props.tag.name)}</h3><div class="mt-2 text-gray-600"${_scopeId}><p${_scopeId}>${ssrInterpolate(unref(page).props.tag.description)}</p></div></div></div><div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(page).props.articles.data, (article) => {
              _push2(`<div class="relative flex flex-col"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$f, {
                article,
                prefetch: "hover"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(unref(WhenVisible), {
              always: hasMorePages.value,
              params: {
                data: {
                  page: unref(page).props.articlesPagination.current_page + 1
                },
                only: ["articles", "articlesPagination"],
                preserveScroll: true,
                preserveState: true
              },
              buffer: 500
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!hasMorePages.value) {
                    _push3(`<div class="text-center py-6 text-gray-600 col-span-1 md:col-span-2 lg:col-span-3"${_scopeId2}> Вы достигли конца списка </div>`);
                  } else {
                    _push3(`<div class="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$e, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    !hasMorePages.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-6 text-gray-600 col-span-1 md:col-span-2 lg:col-span-3"
                    }, " Вы достигли конца списка ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-6"
                    }, [
                      createVNode(_sfc_main$e)
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(page).props.articles.data.length === 0) {
              _push2(`<div class="text-center py-6 text-gray-600 col-span-1 md:col-span-2 lg:col-span-3"${_scopeId}><p class="mb-4"${_scopeId}>В этом теге пока нет статей</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("articles.index"),
                class: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700",
                prefetch: "hover"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Все статьи `);
                  } else {
                    return [
                      createTextVNode(" Все статьи ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow sm:rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                    createVNode("h3", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(unref(page).props.tag.name), 1),
                    createVNode("div", { class: "mt-2 text-gray-600" }, [
                      createVNode("p", null, toDisplayString(unref(page).props.tag.description), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(page).props.articles.data, (article) => {
                    return openBlock(), createBlock("div", {
                      key: article.id,
                      class: "relative flex flex-col"
                    }, [
                      createVNode(_sfc_main$f, {
                        article,
                        prefetch: "hover"
                      }, null, 8, ["article"])
                    ]);
                  }), 128)),
                  createVNode(unref(WhenVisible), {
                    always: hasMorePages.value,
                    params: {
                      data: {
                        page: unref(page).props.articlesPagination.current_page + 1
                      },
                      only: ["articles", "articlesPagination"],
                      preserveScroll: true,
                      preserveState: true
                    },
                    buffer: 500
                  }, {
                    default: withCtx(() => [
                      !hasMorePages.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-6 text-gray-600 col-span-1 md:col-span-2 lg:col-span-3"
                      }, " Вы достигли конца списка ")) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-6"
                      }, [
                        createVNode(_sfc_main$e)
                      ]))
                    ]),
                    _: 1
                  }, 8, ["always", "params"]),
                  unref(page).props.articles.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-6 text-gray-600 col-span-1 md:col-span-2 lg:col-span-3"
                  }, [
                    createVNode("p", { class: "mb-4" }, "В этом теге пока нет статей"),
                    createVNode(unref(Link), {
                      href: _ctx.route("articles.index"),
                      class: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700",
                      prefetch: "hover"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Все статьи ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tags/Show.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WebSocketTest",
  __ssrInlineRender: true,
  setup(__props) {
    const connectionStatus = ref("Подключение...");
    const messages = ref([]);
    onMounted(() => {
      window.Echo.channel("test-channel").listen("TestEvent", (e) => {
        messages.value.push(e.message);
      });
      window.Echo.connector.pusher.connection.bind("connected", () => {
        connectionStatus.value = "Подключено";
      });
      window.Echo.connector.pusher.connection.bind("disconnected", () => {
        connectionStatus.value = "Отключено";
      });
      window.Echo.connector.pusher.connection.bind("error", (err) => {
        connectionStatus.value = `Ошибка: ${err.message}`;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-2xl font-bold mb-4">Тест WebSocket</h1><div class="mb-4"><strong>Статус соединения:</strong><span class="${ssrRenderClass({
        "text-green-600": connectionStatus.value === "Подключено",
        "text-red-600": connectionStatus.value === "Отключено" || connectionStatus.value.includes("Ошибка"),
        "text-yellow-600": connectionStatus.value === "Подключение..."
      })}">${ssrInterpolate(connectionStatus.value)}</span></div>`);
      if (messages.value.length > 0) {
        _push(`<div><h2 class="text-xl font-semibold mb-2">Полученные сообщения:</h2><ul class="list-disc list-inside"><!--[-->`);
        ssrRenderList(messages.value, (message, index) => {
          _push(`<li>${ssrInterpolate(message)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<div><p class="text-gray-600">Сообщений пока нет</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/WebSocketTest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
const Ziggy = { "url": "http://127.0.0.1:8000", "port": 8e3, "defaults": {}, "routes": { "l5-swagger.default.api": { "uri": "api/documentation", "methods": ["GET", "HEAD"] }, "l5-swagger.default.docs": { "uri": "docs", "methods": ["GET", "HEAD"] }, "l5-swagger.default.asset": { "uri": "docs/asset/{asset}", "methods": ["GET", "HEAD"], "parameters": ["asset"] }, "l5-swagger.default.oauth2_callback": { "uri": "api/oauth2-callback", "methods": ["GET", "HEAD"] }, "sanctum.csrf-cookie": { "uri": "sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "articles.store": { "uri": "api/articles", "methods": ["POST"] }, "articles.update": { "uri": "api/articles/{article}", "methods": ["PUT", "PATCH"], "parameters": ["article"], "bindings": { "article": "slug" } }, "articles.destroy": { "uri": "api/articles/{article}", "methods": ["DELETE"], "parameters": ["article"], "bindings": { "article": "slug" } }, "api.tags.index": { "uri": "api/tags", "methods": ["GET", "HEAD"] }, "api.tags.store": { "uri": "api/tags", "methods": ["POST"] }, "api.tags.show": { "uri": "api/tags/{tag}", "methods": ["GET", "HEAD"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "api.tags.update": { "uri": "api/tags/{tag}", "methods": ["PUT", "PATCH"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "api.tags.destroy": { "uri": "api/tags/{tag}", "methods": ["DELETE"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "home": { "uri": "/", "methods": ["GET", "HEAD"] }, "articles.index": { "uri": "articles", "methods": ["GET", "HEAD"] }, "articles.show": { "uri": "articles/{article}", "methods": ["GET", "HEAD"], "parameters": ["article"], "bindings": { "article": "slug" } }, "tags.index": { "uri": "tags", "methods": ["GET", "HEAD"] }, "tags.show": { "uri": "tags/{tag}", "methods": ["GET", "HEAD"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "login": { "uri": "login", "methods": ["GET", "HEAD"] }, "logout": { "uri": "logout", "methods": ["POST"] }, "auth.test": { "uri": "auth-test", "methods": ["GET", "HEAD"] }, "profile.edit": { "uri": "profile", "methods": ["GET", "HEAD"] }, "profile.update": { "uri": "profile", "methods": ["PATCH"] }, "profile.destroy": { "uri": "profile", "methods": ["DELETE"] }, "admin.articles.index": { "uri": "admin/articles", "methods": ["GET", "HEAD"] }, "admin.articles.create": { "uri": "admin/articles/create", "methods": ["GET", "HEAD"] }, "admin.articles.store": { "uri": "admin/articles", "methods": ["POST"] }, "admin.articles.edit": { "uri": "admin/articles/{article}/edit", "methods": ["GET", "HEAD"], "parameters": ["article"], "bindings": { "article": "slug" } }, "admin.articles.update": { "uri": "admin/articles/{article}", "methods": ["PUT"], "parameters": ["article"], "bindings": { "article": "slug" } }, "admin.articles.destroy": { "uri": "admin/articles/{article}", "methods": ["DELETE"], "parameters": ["article"], "bindings": { "article": "slug" } }, "admin.tags.index": { "uri": "admin/tags", "methods": ["GET", "HEAD"] }, "admin.tags.create": { "uri": "admin/tags/create", "methods": ["GET", "HEAD"] }, "admin.tags.store": { "uri": "admin/tags", "methods": ["POST"] }, "admin.tags.edit": { "uri": "admin/tags/{tag}/edit", "methods": ["GET", "HEAD"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "admin.tags.update": { "uri": "admin/tags/{tag}", "methods": ["PUT"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "admin.tags.destroy": { "uri": "admin/tags/{tag}", "methods": ["DELETE"], "parameters": ["tag"], "bindings": { "tag": "slug" } }, "admin.statistics": { "uri": "admin/statistics", "methods": ["GET", "HEAD"] }, "websocket.test": { "uri": "websocket-test", "methods": ["GET", "HEAD"] }, "websocket.send": { "uri": "websocket-test/send", "methods": ["POST"] }, "storage.local": { "uri": "storage/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
const dummyToastPlugin = {
  install: (app) => {
    app.config.globalProperties.$toast = createToast();
    app.provide("toast", createToast());
    app.provide("notify", notify$2);
  }
};
createServer((page) => createInertiaApp({
  page,
  render: renderToString,
  resolve: (name) => {
    const pages = /* @__PURE__ */ Object.assign({ "./Pages/Admin/Articles/Create.vue": __vite_glob_0_0, "./Pages/Admin/Articles/Edit.vue": __vite_glob_0_1, "./Pages/Admin/Articles/Form.vue": __vite_glob_0_2, "./Pages/Admin/Articles/Index.vue": __vite_glob_0_3, "./Pages/Admin/Statistics.vue": __vite_glob_0_4, "./Pages/Admin/Tags/Create.vue": __vite_glob_0_5, "./Pages/Admin/Tags/Edit.vue": __vite_glob_0_6, "./Pages/Admin/Tags/Index.vue": __vite_glob_0_7, "./Pages/Article.vue": __vite_glob_0_8, "./Pages/Articles/Index.vue": __vite_glob_0_9, "./Pages/Articles/Show.vue": __vite_glob_0_10, "./Pages/ArticlesList.vue": __vite_glob_0_11, "./Pages/Auth/Login.vue": __vite_glob_0_12, "./Pages/Auth/Test.vue": __vite_glob_0_13, "./Pages/Error.vue": __vite_glob_0_14, "./Pages/Statistics/Index.vue": __vite_glob_0_15, "./Pages/Tags/Index.vue": __vite_glob_0_16, "./Pages/Tags/Show.vue": __vite_glob_0_17, "./Pages/WebSocketTest.vue": __vite_glob_0_18 });
    return pages[`./Pages/${name}.vue`];
  },
  title: (title) => title ? `${title} - ${"Laravel"}` : "Laravel",
  setup({ el, App, props, plugin }) {
    const app = createSSRApp({ render: () => h(App, props) });
    app.use(plugin);
    app.use(ZiggyVue, Ziggy);
    app.use(dummyToastPlugin);
    app.provide("notify", notify$2);
    app.config.globalProperties.$notify = notify$2;
    return app;
  }
}));
function createApp({ el, App, props, plugin }) {
  const app = createSSRApp({ render: () => h(App, props) });
  app.use(plugin);
  app.use(ZiggyVue, Ziggy);
  return app;
}
export {
  createApp as default
};
