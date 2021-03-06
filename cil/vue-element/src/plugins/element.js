import Vue from 'vue'
import {
  Button,
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  TabPane,
  Tabs,
  DatePicker,
  Input,
  Radio,
  RadioGroup,
  Message,
  MessageBox,
  Select,
  Option,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Step,
  Steps,
  Popover,
  Tag,
  Notification,
  Tooltip,
  Upload,
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  InputNumber,
  Progress
} from 'element-ui'

const UI = [
  Button,
  Col,
  Row,
  Container,
  Header,
  Aside,
  Main,
  TabPane,
  Tabs,
  DatePicker,
  Input,
  Radio,
  RadioGroup,
  Message,
  MessageBox,
  Select,
  Option,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Step,
  Steps,
  Popover,
  Tag,
  Notification,
  Tooltip,
  Upload,
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  InputNumber,
  Progress
]

UI.forEach(o => {
  Vue.component(o.name, o)
})
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$notify = Notification
