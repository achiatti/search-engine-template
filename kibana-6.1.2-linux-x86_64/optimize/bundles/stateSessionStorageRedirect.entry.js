
/**
 * Test entry file
 *
 * This is programatically created and updated, do not modify
 *
 * context: {"env":"production","kbnVersion":"6.1.2","buildNum":16363}
 * includes code from:
 *  - console@kibana
 *  - elasticsearch@kibana
 *  - input_control_vis@kibana
 *  - kbn_doc_views@kibana
 *  - kbn_vislib_vis_types@kibana
 *  - kibana@kibana
 *  - markdown_vis@kibana
 *  - metric_vis@kibana
 *  - metrics@kibana
 *  - region_map@kibana
 *  - spy_modes@kibana
 *  - state_session_storage_redirect@kibana
 *  - status_page@kibana
 *  - table_vis@kibana
 *  - tagcloud@kibana
 *  - tile_map@kibana
 *  - timelion@kibana
 *
 */

require('ui/chrome');
require('plugins/state_session_storage_redirect');
require('plugins/console/hacks/register');
require('plugins/kibana/dev_tools/hacks/hide_empty_tools');
require('plugins/timelion/lib/panel_registry');
require('plugins/timelion/panels/timechart/timechart');
require('ui/chrome').bootstrap(/* xoxo */);

