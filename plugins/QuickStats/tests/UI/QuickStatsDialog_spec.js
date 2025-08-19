/*!
 * Matomo - free/libre analytics platform
 *
 * Screenshot integration tests.
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("QuickStatsDialog", function () {
    this.timeout(0);

    it('should show the QuickStats dialog', async function () {
      await page.goto("?module=CoreHome&action=index&idSite=1&period=day&date=today");
      await page.waitForNetworkIdle();

      // Wait for and click the QuickStats button (adjust selector if needed)
      await page.waitForSelector('.quick-stat-component .btn-flat');
      await page.click('.quick-stat-component .btn-flat');

      // Wait for the dialog to appear
      await page.waitForSelector('.card-container');
      await page.waitForNetworkIdle();

      // Take a screenshot of the dialog
      const dialog = await page.$('.card-container');
      expect(await dialog.screenshot()).to.matchImage('QuickStatsDialog');
    });
});
