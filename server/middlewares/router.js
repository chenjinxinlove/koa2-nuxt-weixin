import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'

export const router = app => {
  const router = new Router()
  require('../wechat')
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  router.get('/wechat-signature', signature)
  router.get('/wechat-redirect', redirect)
  router.get('/wechat-oauth', oauth)
  // router.get('/upload', (ctx, next) => {
  //   const Wechat = require('../wechat-lib')
  //   const wechat = new Wechat(options)

  //   wechat.handle('uploadMaterial', type, file)
  // })
  app
    .use(router.routes())
    .use(router.allowedMethods())
}
