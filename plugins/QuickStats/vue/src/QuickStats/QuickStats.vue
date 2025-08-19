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
        <p>
          The count is greater than 15 right now!
        </p>

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
import { MatomoDialog } from 'CoreHome';

interface QuickStatsState {
  showDialog: boolean;
}

export default defineComponent({
  components: {
    MatomoDialog,
  },
  data(): QuickStatsState {
    return {
      showDialog: false,
    };
  },
  methods: {
    showQuickStatsDialog() {
      this.showDialog = true;
    },
  },
});
</script>
