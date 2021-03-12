import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ea24da02 = () => interopDefault(import('./prismic/pages/preview.vue' /* webpackChunkName: "" */))
const _cfcb13ec = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _30ecf148 = () => interopDefault(import('../pages/_lang/index.vue' /* webpackChunkName: "pages/_lang/index" */))
const _47772e09 = () => interopDefault(import('../pages/_uid.vue' /* webpackChunkName: "pages/_uid" */))
const _5ce9530b = () => interopDefault(import('../pages/_lang/_uid.vue' /* webpackChunkName: "pages/_lang/_uid" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/preview",
    component: _ea24da02,
    name: "prismic-preview"
  }, {
    path: "/",
    component: _cfcb13ec,
    name: "index"
  }, {
    path: "/:lang",
    component: _30ecf148,
    name: "lang"
  }, {
    path: "/:uid",
    component: _47772e09,
    name: "uid"
  }, {
    path: "/:lang/:uid",
    component: _5ce9530b,
    name: "lang-uid"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
