import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyTabbar from '@/components/MyTabbar'
import 'lib-flexible'
import '@/assets/less/common.less'

import {
  Uploader,
  Lazyload,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sidebar,
  SidebarItem,
  Empty,
  Tag,
  Swipe,
  SwipeItem,
  Search,
  Toast,
  Popup,
  Overlay,
  Button,
  Form,
  Field,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Dialog,
  AddressList,
  Area,
  AddressEdit,
  SubmitBar,
  Checkbox,
  SwipeCell,
  Card,
  RadioGroup,
  Radio,
  Image as VanImage,
  Loading
} from 'vant';
Vue.config.productionTip = false

Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Icon).use(Form)
  .use(Field).use(Button).use(Overlay).use(Popup).use(Toast)
  .use(Search).use(Swipe).use(SwipeItem).use(Tag).use(Empty)
  .use(Sidebar).use(SidebarItem).use(GoodsAction).use(GoodsActionButton)
  .use(GoodsActionIcon).use(Stepper).use(Lazyload, {
    lazyComponent: true,
  }).use(Uploader).use(Cell).use(CellGroup).use(Tab).use(Tabs).use(Dialog)
  .use(AddressList).use(Area).use(AddressEdit).use(SubmitBar).use(Checkbox)
  .use(SwipeCell).use(Card).use(Radio).use(RadioGroup).use(VanImage).use(Loading)

Vue.component(MyTabbar.name, MyTabbar)

Toast.allowMultiple();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')