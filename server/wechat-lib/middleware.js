import sha1 from 'sha1'
import getRawBody from 'raw-body'
import config from '../config'
import * as util from './util'

export default function (opts, reply) {
  return async function wechatMiddle(ctx, next) {
    const token = config.wechat.token
    const {
      signature,
      echostr,
      timestamp,
      nonce
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    if (ctx.method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'FAILED'
      }
    } else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'FAILED'
        return false
      }
      const data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '5mb',
        encoding: ctx.charset
      })
      const content = await util.parseXML(data)
      const message = util.formatMessage(content.xml)
      // console.log(content, message)
      ctx.weixin = message
      await reply.apply(ctx, [ctx, next])
      const replyBody = ctx.body
      const msg = ctx.weixin
      const xml = util.tpl(replyBody, msg)
      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = xml
    }
  }
}
