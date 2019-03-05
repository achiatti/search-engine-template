
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
require('plugins/kibana/kibana');
require('plugins/timelion/register_feature');
require('plugins/input_control_vis/register_vis');
require('plugins/kbn_vislib_vis_types/kbn_vislib_vis_types');
require('plugins/markdown_vis/markdown_vis');
require('plugins/metric_vis/metric_vis');
require('plugins/metrics/kbn_vis_types');
require('plugins/region_map/region_map_vis');
require('plugins/table_vis/table_vis');
require('plugins/tagcloud/tag_cloud_vis');
require('plugins/tile_map/tile_map_vis');
require('plugins/timelion/vis');
require('ui/vis/response_handlers/basic');
require('ui/vis/response_handlers/none');
require('ui/vis/response_handlers/tabify');
require('ui/vis/request_handlers/courier');
require('ui/vis/request_handlers/none');
require('ui/vis/editors/default/default');
require('plugins/kibana/visualize/saved_visualizations/saved_visualization_register');
require('plugins/kibana/discover/saved_searches/saved_search_register');
require('plugins/kibana/dashboard/saved_dashboard/saved_dashboard_register');
require('plugins/spy_modes/table_spy_mode');
require('plugins/spy_modes/req_resp_stats_spy_mode');
require('plugins/kibana/field_formats/register');
require('ui/field_format_editor/register');
require('plugins/console/console');
require('plugins/kbn_doc_views/kbn_doc_views');
require('plugins/kibana/visualize/embeddable/visualize_embeddable_factory_provider');
require('plugins/kibana/discover/embeddable/search_embeddable_factory_provider');
require('plugins/console/hacks/register');
require('plugins/kibana/dev_tools/hacks/hide_empty_tools');
require('plugins/timelion/lib/panel_registry');
require('plugins/timelion/panels/timechart/timechart');
require('ui/chrome').bootstrap(/* xoxo */);

