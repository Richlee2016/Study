import OtherAgint from '@/views/OtherAgint/Index'
import DataSet from '@/views/OtherAgint/DataSet'
import Test from '@/views/OtherAgint/Test'

export default [
  {
    path: '/',
    name: 'Index',
    component: OtherAgint
  },
  {
    path: '/dataset',
    name: 'DataSet',
    component: DataSet
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]
