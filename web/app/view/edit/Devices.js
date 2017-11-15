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

Ext.define('Trackmont.view.edit.Devices', {
    extend: 'Ext.grid.Panel',
    xtype: 'devicesView',

    requires: [
        'Ext.grid.filters.Filters',
        'Trackmont.AttributeFormatter',
        'Trackmont.view.edit.DevicesController',
        'Trackmont.view.ArrayListFilter'
    ],

    controller: 'devices',

    plugins: 'gridfilters',

    store: 'VisibleDevices',

    stateful: true,
    stateId: 'devices-grid',

    tbar: {
        componentCls: 'toolbar-header-style',
        items: [{
            xtype: 'tbtext',
            html: Strings.deviceTitle,
            baseCls: 'x-panel-header-title-default'
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onAddClick',
            reference: 'toolbarAddButton',
            glyph: 'xf067@FontAwesome',
            tooltip: Strings.sharedAdd,
            tooltipType: 'title'
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onEditClick',
            reference: 'toolbarEditButton',
            glyph: 'xf040@FontAwesome',
            tooltip: Strings.sharedEdit,
            tooltipType: 'title'
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onRemoveClick',
            reference: 'toolbarRemoveButton',
            glyph: 'xf00d@FontAwesome',
            tooltip: Strings.sharedRemove,
            tooltipType: 'title'
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onGeofencesClick',
            reference: 'toolbarGeofencesButton',
            glyph: 'xf21d@FontAwesome',
            tooltip: Strings.sharedGeofences,
            tooltipType: 'title'
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onAttributesClick',
            reference: 'toolbarAttributesButton',
            glyph: 'xf0ae@FontAwesome',
            tooltip: Strings.sharedComputedAttributes,
            tooltipType: 'title'
        }, {
            xtype: 'button',
            disabled: true,
            handler: 'onDriversClick',
            reference: 'toolbarDriversButton',
            glyph: 'xf2c2@FontAwesome',
            tooltip: Strings.sharedDrivers,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onCommandClick',
            reference: 'deviceCommandButton',
            glyph: 'xf093@FontAwesome',
            tooltip: Strings.deviceCommand,
            tooltipType: 'title'
        }]
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    viewConfig: {
        getRowClass: function (record) {
            var status = record.get('status');
            if (status) {
                return Ext.getStore('DeviceStatuses').getById(status).get('color');
            }
            return null;
        }
    },

    columns: {
        defaults: {
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal
        },
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            filter: 'string'
        }, {
            text: Strings.deviceIdentifier,
            dataIndex: 'uniqueId',
            hidden: true
        }, {
            text: Strings.sharedPhone,
            dataIndex: 'phone',
            hidden: true
        }, {
            text: Strings.deviceModel,
            dataIndex: 'model',
            hidden: true
        }, {
            text: Strings.deviceContact,
            dataIndex: 'contact',
            hidden: true
        }, {
            text: Strings.groupDialog,
            dataIndex: 'groupId',
            hidden: true,
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'Groups'
            },
            renderer: Trackmont.AttributeFormatter.getFormatter('groupId')
        }, {
            text: Strings.sharedGeofences,
            dataIndex: 'geofenceIds',
            hidden: true,
            filter: {
                type: 'arraylist',
                idField: 'id',
                labelField: 'name',
                store: 'Geofences'
            },
            renderer: function (value) {
                var i, name, result = '';
                if (Ext.isArray(value)) {
                    for (i = 0; i < value.length; i++) {
                        name = Trackmont.AttributeFormatter.geofenceIdFormatter(value[i]);
                        if (name) {
                            result += name + (i < value.length - 1 ? ', ' : '');
                        }
                    }
                }
                return result;
            }
        }, {
            text: Strings.deviceStatus,
            dataIndex: 'status',
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'DeviceStatuses'
            },
            renderer: function (value) {
                var status;
                if (value) {
                    status = Ext.getStore('DeviceStatuses').getById(value);
                    if (status) {
                        return status.get('name');
                    }
                }
                return null;
            }
        }, {
            text: Strings.deviceLastUpdate,
            dataIndex: 'lastUpdate',
            renderer: Trackmont.AttributeFormatter.getFormatter('lastUpdate')
        }]
    }
});