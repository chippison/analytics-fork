<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
-->

<template>
  <div class="quick-stat-component">
    <a class="btn-flat" target="_blank" v-on:click="showQuickStatsDialog">Quick Stats</a>
    <MatomoDialog v-model="showDialog">
      <div class="ui-confirm quick-stat-dialog-content">
        <h2>Visitor Stats</h2>
        <ActivityIndicator :loading="loading"/>
        <div class="card-container" v-show="!loading" style="margin-top: 20px">
          <div class="row">
            <div class="col s12 m6">
              <div class="card">
                <div class="card-content center-align">
                  Visits: {{ visits }}
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="card">
                <div class="card-content center-align">
                  Visitors: {{ visitors }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m6">
              <div class="card">
                <div class="card-content center-align">
                  Actions: {{ actions }}
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="card">
                <div class="card-content center-align">
                  Visits Converted: {{ visitsConverted }}
                </div>
              </div>
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
  .card-container {
    margin-top: 200px;
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
      visits: '0',
      actions: '0',
      visitors: '0',
      visitsConverted: '0',
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
        lastMinutes: 120,
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
