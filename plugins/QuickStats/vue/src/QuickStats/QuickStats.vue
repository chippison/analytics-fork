<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="quick-stat-component">
    <a class="btn" target="_blank" v-on:click="showQuickStatsDialog">Quick Stats</a>

    <MatomoDialog v-model="showDialog">
      <div class="ui-confirm">
        <h2>Visitor Stats</h2>
        <ActivityIndicator :loading="loading"/>
        <div class="card-container" v-show="!loading">
          <div class="card">
            <div class="card-content">
                Visits: {{ visits }}
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              Visitors: {{ visitors }}
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              Actions: {{ actions }}
            </div>
          </div>
          <div class="card">
            <div class="card-content">
              Visits Converted: {{ visitsConverted }}
            </div>
          </div>
        </div>
        <input type="button" value="OK" role="yes"/>
      </div>
    </MatomoDialog>
  </div>
</template>

<style lang="less" scoped>
  .quick-stat-component {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { MatomoDialog, AjaxHelper, ActivityIndicator } from 'CoreHome';

interface QuickStatsState {
  showDialog: boolean;
  loading: boolean;
  visits: string;
  actions: string;
  visitors: string;
  visitsConverted: string;
}

export default defineComponent({
  components: {
    MatomoDialog,
    ActivityIndicator,
  },
  data(): QuickStatsState {
    return {
      showDialog: false,
      loading: true,
      visits: '1',
      actions: '1',
      visitors: '1',
      visitsConverted: '1',
    };
  },
  watch: {
    showDialog(val) {
      if (val) {
        console.log('Dialog opened');
        this.getQuickStats();
      } else {
        console.log('Dialog closed');
      }
    },
  },
  methods: {
    showQuickStatsDialog() {
      this.showDialog = true;
    },
    getQuickStats() {
      AjaxHelper.fetch({
        method: 'Live.getCounters',
        idSite: 1,
        lastMinutes: 240,
        format: 'json',
      }).then((response) => {
        console.log('i got responses', response[0]);
        const resp = response[0];
        this.visits = resp.visits;
        this.actions = resp.actions;
        this.visitors = resp.visitors;
        this.visitsConverted = resp.visitsConverted;
        this.loading = false;
      });
    },
  },
});
</script>
