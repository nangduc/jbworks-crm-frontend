<template>
  <div id="dashboard">
    <div class="row align-items-stretch">
      <div class="col-half-lg-block col-md-6 col-lg-6 col-xl-3 grid-b-space">
        <total-revenue />
      </div>
      <div class="col-half-lg-block col-md-6 col-lg-6 col-xl-3 grid-b-space">
        <total-orders />
      </div>
      <div class="col-half-lg-block col-md-6 col-lg-6 col-xl-3 grid-b-space">
        <daily-sales />
      </div>
      <div class="col-half-lg-block col-md-6 col-lg-6 col-xl-3 grid-b-space">
        <expences />
      </div>
    </div>
    <div class="row">
      <div class="col-half-lg-block col-md-6 col-lg-6 col-xl-6 grid-b-space">
        <app-card :heading="$t('message.salesReport')" :heading-menu="true" class="overflow-hide">
          <targets-and-achievements-chart :width="300" :height="166" />
        </app-card>
      </div>
      <div class="col-half-lg-block col-md-6 col-lg-6 col-xl-6 grid-b-space">
        <app-card
          :heading="$t('message.salesByCompanion')"
          :heading-menu="true"
          content-custom-class="p-0"
          custom-classes="companionman-widget overflow-hide"
        >
          <companion />
        </app-card>
      </div>
    </div>
    <div class="row align-items-stretch">
      <div class="col-half-lg-block col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 grid-b-space">
        <app-card
          content-custom-class="mx-auto"
          app-card-class="h-100 justify-content-between flex-column d-flex"
          :heading="$t('message.trending')"
          :heading-menu="true"
          custom-classes="sales-category-widget overflow-hide h-100"
          footer-classes="p-0"
          :enable-footer="true"
        >
          <sales-by-category />
          <ul slot="footer" class="footer-border border-0">
            <li v-for="(category,index) in salesByCategory" :key="index" class="w-25">
              <h5 class="font-weight-bold mb text-center">{{ category.count }}</h5>
              <span class="font-xs">{{ category.category }}</span>
            </li>
          </ul>
        </app-card>
      </div>
      <div class="col-full-lg-block col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 grid-b-space">
        <app-card
          :heading="$t('message.salesByCategory')"
          :heading-menu="true"
          content-custom-class="p-0"
          custom-classes="trending-widget overflow-hide"
        >
          <trending />
        </app-card>
      </div>
      <div class="col-half-lg-block col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 grid-b-space">
        <todo-list />
      </div>
    </div>
    <div class="row">
      <div class="col-full-lg-block col-sm-12 col-md-12 col-lg-12 grid-b-space">
        <recent-orders />
      </div>
    </div>
  </div>
</template>

<script>

// widgets
import TotalRevenue from 'Components/Widgets/TotalRevenue'
import TotalOrders from 'Components/Widgets/TotalOrders'
import DailySales from 'Components/Widgets/DailySales'
import Expences from 'Components/Widgets/Expences'
import SalesByCategory from 'Components/Widgets/SalesByCategory'
import Trending from 'Components/Widgets/Trending'
import Companion from 'Components/Widgets/Companion'
import TodoList from 'Components/Widgets/TodoList'
import RecentOrders from 'Components/Widgets/RecentOrders'
// data
import { salesByCategory } from 'Assets/data/salesByCategory.js'
import TargetsAndAchievementsChart from 'Components/Charts/TargetsAndAchievementsChart'
// chartconfig color
import ChartConfig from 'Constants/ChartConfig'

export default {
  name: 'dashboard',
  components: {
    TodoList,
    TotalRevenue,
    TotalOrders,
    DailySales,
    Expences,
    SalesByCategory,
    Trending,
    Companion,
    RecentOrders,
    TargetsAndAchievementsChart
  },
  data() {
    return {
      ChartConfig,
      salesByCategory
    }
  }
}
</script>
