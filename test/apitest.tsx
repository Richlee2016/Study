/*
 * @Date: 2019-09-03 13:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-11 18:05:10
 * 活动菜单控制器
 */

import csrf from '@fe/framework/lib/csrf';
import {
  createRouter,
  catchError,
  response,
  session,
  api,
  ServiceError,
  SERVICE_CODE,
  ERROR_CODE,
} from '@fe/framework';
import * as activity from '../services/activity';
const router = createRouter();

/**
 * @api {get} /api/workbench/shape/getWxNewsMaterial 获取微信图文素材列表
 * @apiName getWxNewsMaterial
 * @apiGroup Activity
 *
 * @apiParam {number} pageNo 页码
 * @apiParam {number} pageSize 条数
 *
 * @apiSuccess {Object}  data 接口响应数据
 * @apiSuccess {Object[]}  data.item 图文列表
 * @apiSuccess {Object}   data.item.content 图文内容
 * @apiSuccess {Object[]}  data.item.content.newsItem 文章列表
 * @apiSuccess {string}  data.item.content.newsItem.author 作者
 * @apiSuccess {string}  data.item.content.newsItem.digest 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
 * @apiSuccess {string}  data.item.content.newsItem.thumbUrl 缩略图
 * @apiSuccess {string}  data.item.content.newsItem.title 标题
 * @apiSuccess {string}  data.item.mediaId 图文mediaId
 * @apiSuccess {number}  data.itemCount 本次调用获取的素材的数量
 * @apiSuccess {number}  data.totalCount 该类型的素材的总数
 */
router.get(
  '/shape/getWxNewsMaterial',
  catchError(async (req, res) => {
    const query = req.query;
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    query.orgId = orgId;
    const data = await activity.getWxNewsMaterial(query);
    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getSingleWxNewsMaterial 获取单个微信图文素材
 * @apiName getSingleWxNewsMaterial
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string} mediaId 素材Id
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.author 作者
 * @apiSuccess {string}  data.digest 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
 * @apiSuccess {string}  data.thumbUrl 缩略图
 * @apiSuccess {string}  data.title 图文消息的标题
 *
 */
router.get(
  '/shape/getSingleWxNewsMaterial',
  catchError(async (req, res) => {
    const query = req.query;
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    query.orgId = orgId;
    const data = await activity.getSingleWxNewsMaterial(query);
    response.json(res, data);
  })
);

/**
 * @api {post} /api/workbench/shape/createAudienceGroup 创建流程自动化客户分组
 * @apiName createAudienceGroup
 * @apiGroup Activity
 *
 * @apiParam {string} groupName 分组名称
 * @apiParam {string} orgId 企业ID
 * @apiParam {string} userId 创建人ID
 *
 * @apiSuccess {Object}  data 接口响应数据
 */
router.post(
  '/shape/createAudienceGroup',
  csrf,
  catchError(async (req, res) => {
    const body = req.body;
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    body.orgId = orgId;
    const data = await activity.createAudienceGroup(body);
    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getAudienceGroup 获取流程自动化客户分组列表
 * @apiName getAudienceGroup
 * @apiGroup Activity
 *
 * @apiParam {string} keyword 搜索关键字
 * @apiParam {number} pageNo 页码
 * @apiParam {number} pageSize 条数
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.audienceGroupId 分组Id
 * @apiSuccess {string}  data.audienceGroupName 分组名称
 */
router.get(
  '/shape/getAudienceGroup',
  catchError(async (req, res) => {
    const query = req.query;
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    query.orgId = orgId;
    const data = await activity.getAudienceGroup(query);
    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getAudienceCount 获取客户数量
 * @apiName getAudienceCount
 * @apiGroup Activity
 *
 * @apiParam {string} channelIds 员工渠道id
 * @apiParam {string} deptIds 部门id
 * @apiParam {string} userId 用户id
 * @apiParam {number=0,1,2} queryType 查询类型，0.个人，1企业全部，2.指定
 *
 * @apiSuccess {Object}  data 接口响应数据
 * @apiSuccess {number}  data.totalUserCount 客户数量
 */
router.get(
  '/shape/getAudienceCount',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId, userId } = userInfo!;
    const data = await activity.getAudienceCount({
      ...req.query,
      orgId,
      userId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/searchAudience 搜索指定客户
 * @apiName searchAudience
 * @apiGroup Activity
 *
 * @apiParam {string[]} channelIds 员工渠道id
 * @apiParam {string[]} deptIds 部门id
 * @apiParam {string} orgId 企业ID
 * @apiParam {string} userId 用户id
 * @apiParam {number=0,1,2} queryType 查询类型，0.个人，1企业全部，2.指定
 * @apiParam {string} keyword 搜索关键词：客户昵称、手机号
 * @apiParam {number} pageNo 页码
 * @apiParam {number} pageSize 条数
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.audienceUserAvatar 客户头像
 * @apiSuccess {string}  data.audienceUserId 客户Id
 * @apiSuccess {string}  data.audienceUserName 客户姓名
 * @apiSuccess {string}  data.audienceUserPhone 客户手机号码
 */
router.get(
  '/shape/searchAudience',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId, userId } = userInfo!;
    const data = await activity.searchAudience({
      ...req.query,
      orgId,
      userId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getTagList 根据标签类型获取标签接口
 * @apiName getTagList
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string} tagTypeId 标签类型id
 * @apiParam {string} tagGroupId 标签组id
 * @apiParam {number} pageNo 页码
 * @apiParam {number} pageSize 条数
 *
 * @apiSuccess {Object}  data 接口响应数据
 * @apiSuccess {Object[]}  data.list 标签列表数据
 * @apiSuccess {string}  data.list.tagId 标签Id
 * @apiSuccess {string}  data.list.tagName 标签名称
 * @apiSuccess {number}  data.totalCount 全局标签总数
 */
router.get(
  '/shape/getTagList',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getTagList({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/searchTag 搜索标签接口
 * @apiName searchTag
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string} tagTypeId 标签类型id
 * @apiParam {string} tagGroupId 标签组id
 * @apiParam {string} content 搜索内容
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.tagId 标签Id
 * @apiSuccess {string}  data.tagName 标签名称
 */
router.get(
  '/shape/searchTag',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.searchTag({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getAppAudienceCount 获取作品客户数
 * @apiName getAppAudienceCount
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string[]} appIds 作品Id组
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.appId 作品Id
 * @apiSuccess {string}  data.audienceCount 客户数
 */
router.get(
  '/shape/getAppAudienceCount',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getAppAudienceCount({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getEmployeeCount 获取员工数量
 * @apiName getEmployeeCount
 * @apiGroup Activity
 *
 * @apiParam {string[]} channelIds 作品Id组
 * @apiParam {string[]} deptIds 作品Id组
 * @apiParam {string} userId 作品Id组
 * @apiParam {number=1,2,3} queryEmployeeType=3 查询员工类型,1:查询有关联子账号(不传默认为1),2:查询已激活的,3:查询所有组织架构的员工，不传默认2
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.totalEmployeeCount 员工数量
 */
router.get(
  '/shape/getEmployeeCount',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId, userId } = userInfo!;
    const data = await activity.getEmployeeCount({
      ...req.query,
      orgId,
      userId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getAudienceGroupUserCount 获取客户分组的客户数
 * @apiName getAudienceGroupUserCount
 * @apiGroup Activity
 *
 * @apiParam {string[]} audienceGroupIds 客户分组Id集合
 *
 * @apiSuccess {Object}  data 接口响应数据
 * @apiSuccess {string}  data.totalCount 客户总数
 */
router.get(
  '/shape/getAudienceGroupUserCount',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getAudienceGroupUserCount({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getAudienceGroupById 根据客户分组id获取客户分组
 * @apiName getAudienceGroupById
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string[]} groupIds 客户分组Id集合
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.audienceGroupId 客户分组Id
 * @apiSuccess {string}  data.groupName 客户分组名称
 * @apiSuccess {string}  data.total 客户分组人数
 */
router.get(
  '/shape/getAudienceGroupById',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getAudienceGroupById({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getTagById 根据标签id获取标签接口
 * @apiName getTagById
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string[]} tagIds 标签Id集合
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.tagId 标签Id
 * @apiSuccess {string}  data.tagName 标签名称
 */
router.get(
  '/shape/getTagById',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getTagById({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getAudienceById 根据客户id查询客户信息
 * @apiName getAudienceById
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 * @apiParam {string[]} audienceUserIds 客户Id集合
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.audienceUserAvatar 客户头像
 * @apiSuccess {string}  data.audienceUserId 客户Id
 * @apiSuccess {string}  data.audienceUserName 客户名称
 * @apiSuccess {string}  data.audienceUserPhone 客户手机号码
 */
router.get(
  '/shape/getAudienceById',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getAudienceById({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getWxAppList 获取微信公众号列表
 * @apiName getWxAppList
 * @apiGroup Activity
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.wsid 公众号wsId
 * @apiSuccess {string}  data.wxappName 公众号名称
 * @apiSuccess {string}  data.wxappid 公众号appId
 */
router.get(
  '/shape/getWxAppList',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getWxAppList({
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getMiniAppMsg 获取内容小程序信息
 * @apiName getMiniAppMsg
 * @apiGroup Activity
 *
 * @apiParam {string} orgId 企业ID
 *
 * @apiSuccess {Object}  data 接口响应数据
 * @apiSuccess {string}  data.appId 小程序appId
 * @apiSuccess {string}  data.miniAppId 小程序ID
 * @apiSuccess {string}  data.miniappName 小程序名称
 * @apiSuccess {string}  data.wsId 小程序wsId
 */
router.get(
  '/shape/getMiniAppMsg',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getMiniAppMsg({
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getTabList 获取流程自动化作品类型列表
 * @apiName getTabList
 * @apiGroup Activity
 *
 * @apiParam {string=marketing_event,autoflow} scene=autoflow 场景值，营销插件：marketing_event，自动化其他场景：autoflow，不传当autoflow场景处理
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.appType 类型
 * @apiSuccess {string}  data.appTypeName 类型名称
 */
router.get(
  '/shape/getTabList',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getTabList({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

// 【创建流程-判斷组件】获取组件目标项列表
/**
 * @api {get} /api/workbench/shape/getTargetList 获取组件目标项列表
 * @apiName getTargetList
 * @apiGroup Activity
 *
 * @apiParam {string=contentminiapp_allpage,contentminiapp_homepage,no_type} appType 【其他类型根据之前的appType来传】作品类型,小程序全部页面：contentminiapp_allpage 小程序首页：contentminiapp_homepage 不指定类型：no_type
 * @apiParam {string=timeer,user_event,target_reach,marketing_event,wechat_event} targetScene 【场景】时机目标：timeer 用户事件：user_event 时机判断：target_reach 营销插件判断：marketing_event 公众号互动：wechat_event
 * @apiParam {string} contentId 外部作品Id
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.key 触发条件key
 * @apiSuccess {string}  data.name 触发条件名字
 */
router.get(
  '/shape/getTargetList',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getTargetList({
      ...req.query,
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/shape/getMiniAppPageBuriedPointId 获取小程序全部页面和首页的埋点id
 * @apiName getMiniAppPageBuriedPointId
 * @apiGroup Activity
 *
 * @apiSuccess {Object}  data 接口响应数据
 */
router.get(
  '/shape/getMiniAppPageBuriedPointId',
  catchError(async (req, res) => {
    const userInfo = session.getUserInfo(req);
    const { userOrganize: orgId } = userInfo!;
    const data = await activity.getMiniAppPageBuriedPointId({
      orgId,
    });

    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/customerTouch/getSmsTplById 获取单个短信模板信息
 * @apiName getSmsTplById
 * @apiGroup Activity
 *
 * @apiParam {string} rabbitUserId 兔展用户Id
 * @apiParam {string} tmplId 模版Id
 *
 * @apiSuccess {Object}  data 接口响应数据
 * @apiSuccess {string}  data.content 模版内容
 * @apiSuccess {string}  data.deleteFlag 是否可以删除
 * @apiSuccess {string}  data.orgId 企业Id
 * @apiSuccess {string}  data.rabbitUserId 兔展用户Id
 * @apiSuccess {string}  data.smsSign TODO:待询问
 * @apiSuccess {string}  data.tmplId 模版Id
 * @apiSuccess {string}  data.tmplName 模版名称
 */
router.get(
  '/customerTouch/getSmsTplById',
  catchError(async (req, res) => {
    const { userId, userOrganize = '' } = session.getUserInfo(req) as UserInfo;
    let query = {
      ...req.query,
      orgId: userOrganize,
      rabbitUserId: userId,
    };
    const data = await activity.getSmsTplById(query);
    response.json(res, data);
  })
);

/**
 * @api {get} /api/workbench/wechatImagesProxy 防盗链图片代理
 * @apiName wechatImagesProxy
 * @apiGroup Activity
 *
 * @apiParam {string} host 图片地址
 */
router.get(
  '/wechatImagesProxy',
  catchError(async (req, res) => {
    const { host } = req.query;
    if (!host) {
      throw new ServiceError(
        SERVICE_CODE.UNKONWN,
        ERROR_CODE.BAD_REQUEST,
        '缺少参数[host]'
      );
    }
    api.proxy(req, res, host, {
      headers: { Referer: '' },
    });
  })
);

/**
 * @api {get} /api/workbench/getWxMenuInfo 获取自定义菜单
 * @apiName getWxMenuInfo
 * @apiGroup Activity
 *
 * @apiParam {string} mpAppid 公众号appId
 *
 * @apiSuccess {Object[]}  data 接口响应数据
 * @apiSuccess {string}  data.key 菜单key
 * @apiSuccess {string}  data.name 菜单名称
 * @apiSuccess {Object}  data.subButton 子菜单
 * @apiSuccess {string}  data.type 菜单类型
 */
router.get(
  '/getWxMenuInfo',
  catchError(async (req, res) => {
    const data = await activity.getWxMenuInfo(req.query);
    response.json(res, data);
  })
);

export default router;

