/*
 * Copyright 2015 - 2017 Vicente Venegas  (vicente@republik.ec)
 * Copyright 2016 - 2017 Andrey Kunitsyn (andrey@trackmont.com)
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

Ext.define('Trackmont.view.edit.Users', {
    extend: 'Ext.grid.Panel',
    xtype: 'usersView',

    requires: [
        'Ext.grid.filters.Filters',
        'Trackmont.view.edit.UsersController',
        'Trackmont.view.edit.Toolbar'
    ],

    controller: 'users',
    store: 'Users',

    plugins: 'gridfilters',

    tbar: {
        xtype: 'editToolbar',
        items: [{
            disabled: true,
            handler: 'onGeofencesClick',
            reference: 'userGeofencesButton',
            glyph: 'xf21d@FontAwesome',
            tooltip: Strings.sharedGeofences,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onDevicesClick',
            reference: 'userDevicesButton',
            glyph: 'xf248@FontAwesome',
            tooltip: Strings.deviceTitle,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onGroupsClick',
            reference: 'userGroupsButton',
            glyph: 'xf247@FontAwesome',
            tooltip: Strings.settingsGroups,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onUsersClick',
            reference: 'userUsersButton',
            glyph: 'xf0c0@FontAwesome',
            tooltip: Strings.settingsUsers,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onNotificationsClick',
            reference: 'userNotificationsButton',
            glyph: 'xf003@FontAwesome',
            tooltip: Strings.sharedNotifications,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onCalendarsClick',
            reference: 'userCalendarsButton',
            glyph: 'xf073@FontAwesome',
            tooltip: Strings.sharedCalendars,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onAttributesClick',
            reference: 'userAttributesButton',
            glyph: 'xf0ae@FontAwesome',
            tooltip: Strings.sharedComputedAttributes,
            tooltipType: 'title'
        }, {
            disabled: true,
            handler: 'onDriversClick',
            reference: 'userDriversButton',
            glyph: 'xf2c2@FontAwesome',
            tooltip: Strings.sharedDrivers,
            tooltipType: 'title'
        }]
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
            filter: 'string'
        }, {
            text: Strings.userEmail,
            dataIndex: 'email',
            filter: 'string'
        }, {
            text: Strings.userAdmin,
            dataIndex: 'admin',
            filter: 'boolean'
        }, {
            text: Strings.serverReadonly,
            dataIndex: 'readonly',
            hidden: true,
            filter: 'boolean'
        }, {
            text: Strings.userDeviceReadonly,
            dataIndex: 'deviceReadonly',
            hidden: true,
            filter: 'boolean'
        }, {
            text: Strings.userDisabled,
            dataIndex: 'disabled',
            filter: 'boolean'
        }, {
            text: Strings.userExpirationTime,
            dataIndex: 'expirationTime',
            hidden: true,
            renderer: Trackmont.AttributeFormatter.getFormatter('expirationTime'),
            filter: 'date'
        }]
    }
});
