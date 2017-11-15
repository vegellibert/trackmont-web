/*
 * Copyright 2015 - 2017 Vicente Venegas  (vicente@republik.ec)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Trackmont.view.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.main',

    requires: [
        'Trackmont.view.MainController',
        'Trackmont.view.edit.Devices',
        'Trackmont.view.State',
        'Trackmont.view.Report',
        'Trackmont.view.Events',
        'Trackmont.view.map.Map'
    ],

    controller: 'mainController',

    layout: 'border',

    defaults: {
        header: false,
        collapsible: true,
        split: true
    },

    items: [{
        region: 'west',
        layout: 'border',
        width: Trackmont.Style.deviceWidth,
        title: Strings.devicesAndState,
        titleCollapse: true,
        floatable: false,
        stateful: true,
        stateId: 'devices-and-state-panel',

        defaults: {
            split: true,
            flex: 1
        },

        items: [{
            region: 'center',
            xtype: 'devicesView'
        }, {
            region: 'south',
            xtype: 'stateView'
        }]
    }, {
        region: 'south',
        xtype: 'reportView',
        reference: 'reportView',
        height: Trackmont.Style.reportHeight,
        collapsed: true,
        titleCollapse: true,
        floatable: false
    }, {
        region: 'center',
        xtype: 'mapView',
        collapsible: false
    }, {
        region: 'east',
        xtype: 'eventsView',
        width: Trackmont.Style.deviceWidth,
        collapsed: true,
        titleCollapse: true,
        floatable: false
    }]
});
