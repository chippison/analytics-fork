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

    // uncomment this if you want to define a custom fixture to load before the test instead of the default one
    // this.fixture = "Piwik\\Plugins\\QuickStats\\tests\\Fixtures\\YOUR_FIXTURE_NAME";

    var generalParams = 'idSite=1&period=day&date=2010-01-03',
        urlBase = 'module=CoreHome&action=index&' + generalParams;

    // before(function () {
    //     testEnvironment.pluginsToLoad = ['QuickStats'];
    //     testEnvironment.save();
    // });
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
      const dialog = await page.$('.ui-confirm .quick-stat-dialog-content');
      expect(await dialog.screenshot()).to.matchImage('QuickStatsDialog');
    });
});
