'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _test = require('../../test');

var _context_menu = require('./context_menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const panel2 = {
  id: 2,
  title: '2',
  content: _react2.default.createElement(
    'div',
    null,
    '2'
  )
};

const panel1 = {
  id: 1,
  title: '1',
  items: [{
    name: '2a',
    panel: 2
  }, {
    name: '2b',
    panel: 2
  }, {
    name: '2c',
    panel: 2
  }]
};

const panel0 = {
  id: 0,
  title: '0',
  items: [{
    name: '1',
    panel: 1
  }]
};

const panels = [panel0, panel1, panel2];

describe('KuiContextMenu', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu.KuiContextMenu, _test.requiredProps));

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('panels and initialPanelId', () => {
      it('renders the referenced panel', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu.KuiContextMenu, {
          panels: panels,
          initialPanelId: 2
        }));

        expect(component).toMatchSnapshot();
      });

      it('allows you to click the title button to go back to the previous panel', () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu.KuiContextMenu, {
          panels: panels,
          initialPanelId: 2
        }));

        expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();

        // Navigate to a different panel.
        component.find('[data-test-subj="contextMenuPanelTitleButton"]').simulate('click');

        expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();
      });
    });
  });
});
