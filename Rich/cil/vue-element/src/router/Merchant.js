import {
  PROPERTY_MERCHANT_ADMIN as R_A,
  PROPERTY_MERCHANT_OPERATOR as R_O
} from '@/config/role'
import Layout from '@/layout'
export default [
  {
    path: '/merchant-coupon',
    name: 'MerchantCoupon',
    component: Layout,
    meta: {
      title: '商户优惠券',
      role: [R_A, R_O]
    },
    children: [
      {
        path: 'index',
        name: 'MerchantCouponIndex',
        meta: {
          title: '商户优首页',
          role: [R_A]
        },
        component: () => import('@/views/Merchant/Coupon/Index')
      },
      {
        path: 'add',
        name: 'MerchantCouponAdd',
        hidden: true,
        meta: {
          title: '商户优添加',
          role: [R_A, R_O]
        },
        component: () => import('@/views/Merchant/Coupon/Add')
      }
    ]
  }
]
