<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\QuickStats;

use Piwik\View;

class QuickStats extends \Piwik\Plugin
{
    public function registerEvents()
    {
        return [
            'CronArchive.getArchivingAPIMethodForPlugin' => 'getArchivingAPIMethodForPlugin',
            'Template.pageFooter' => 'getPageFooter',
        ];
    }

    // support archiving just this plugin via core:archive
    public function getArchivingAPIMethodForPlugin(&$method, $plugin)
    {
        if ($plugin == 'QuickStats') {
            $method = 'QuickStats.getExampleArchivedMetric';
        }
    }
    public function getPageFooter(&$out)
    {
        $view = new View('@QuickStats/footer.twig');
        $out .= $view->render();
    }
}