/*
 * Copyright 2016 - 2017 Vicente Venegas  (vicente@republik.ec)
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

Ext.define('Trackmont.view.edit.Attributes', {
    extend: 'Ext.grid.Panel',
    xtype: 'attributesView',

    requires: [
        'Ext.grid.filters.Filters',
        'Trackmont.view.edit.AttributesController',
        'Trackmont.view.edit.Toolbar'
    ],

    plugins: 'gridfilters',

    controller: 'attributes',

    tbar: {
        xtype: 'editToolbar'
    },

    listeners: {
        selectionchange: 'onSelectionChange'
    },

    columns: {
        defaults: {
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal
        },
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            filter: 'string',
            renderer: function (value) {
                var attribute;
                if (this.attributesStore) {
                    attribute = Ext.getStore(this.attributesStore).getById(value);
                }
                return attribute && attribute.get('name') ? attribute.get('name') : value;
            }
        }, {
            text: Strings.stateValue,
            dataIndex: 'value',
            renderer: function (value, metaData, record) {
                var attribute;
                if (this.attributesStore) {
                    attribute = Ext.getStore(this.attributesStore).getById(record.get('name'));
                }
                if (attribute && attribute.get('dataType') === 'speed') {
                    return Ext.getStore('SpeedUnits').formatValue(value, Trackmont.app.getPreference('speedUnit', 'kn'), true);
                } else if (attribute && attribute.get('dataType') === 'distance') {
                    return Ext.getStore('DistanceUnits').formatValue(value, Trackmont.app.getPreference('distanceUnit', 'km'), true);
                } else {
                    return value;
                }
            }
        }]
    }
});
