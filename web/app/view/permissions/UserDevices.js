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

Ext.define('Trackmont.view.permissions.UserDevices', {
    extend: 'Trackmont.view.permissions.Base',
    xtype: 'userDevicesView',

    requires: [
        'Ext.grid.filters.Filters',
        'Trackmont.AttributeFormatter'
    ],

    plugins: 'gridfilters',

    columns: {
        items: [{
            text: Strings.sharedName,
            dataIndex: 'name',
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.deviceIdentifier,
            dataIndex: 'uniqueId',
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal,
            filter: 'string'
        }, {
            text: Strings.sharedPhone,
            dataIndex: 'phone',
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal,
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.deviceModel,
            dataIndex: 'model',
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal,
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.deviceContact,
            dataIndex: 'contact',
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal,
            hidden: true,
            filter: 'string'
        }, {
            text: Strings.groupDialog,
            dataIndex: 'groupId',
            flex: 1,
            minWidth: Trackmont.Style.columnWidthNormal,
            hidden: true,
            filter: {
                type: 'list',
                labelField: 'name',
                store: 'AllGroups'
            },
            renderer: Trackmont.AttributeFormatter.getFormatter('groupId')
        }]
    }
});
