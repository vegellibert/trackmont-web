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

Ext.define('Trackmont.view.edit.UsersController', {
    extend: 'Trackmont.view.edit.ToolbarController',
    alias: 'controller.users',

    requires: [
        'Trackmont.view.dialog.User',
        'Trackmont.view.permissions.UserDevices',
        'Trackmont.view.permissions.UserGroups',
        'Trackmont.view.permissions.UserGeofences',
        'Trackmont.view.permissions.UserCalendars',
        'Trackmont.view.permissions.UserUsers',
        'Trackmont.view.permissions.UserAttributes',
        'Trackmont.view.permissions.UserDrivers',
        'Trackmont.view.Notifications',
        'Trackmont.view.BaseWindow',
        'Trackmont.model.User'
    ],

    objectModel: 'Trackmont.model.User',
    objectDialog: 'Trackmont.view.dialog.User',
    removeTitle: Strings.settingsUser,

    init: function () {
        Ext.getStore('Users').load();
        this.lookupReference('userUsersButton').setHidden(!Trackmont.app.getUser().get('admin'));
        this.lookupReference('userDriversButton').setHidden(
            Trackmont.app.getVehicleFeaturesDisabled() || Trackmont.app.getBooleanAttributePreference('ui.disableDrivers'));
        this.lookupReference('userAttributesButton').setHidden(
            Trackmont.app.getBooleanAttributePreference('ui.disableComputedAttributes'));
        this.lookupReference('userCalendarsButton').setHidden(
            Trackmont.app.getBooleanAttributePreference('ui.disableCalendars'));
    },

    onEditClick: function () {
        var dialog, user = this.getView().getSelectionModel().getSelection()[0];
        dialog = Ext.create('Trackmont.view.dialog.User', {
            selfEdit: user.get('id') === Trackmont.app.getUser().get('id')
        });
        dialog.down('form').loadRecord(user);
        dialog.show();
    },

    onAddClick: function () {
        var user, dialog;
        user = Ext.create('Trackmont.model.User');
        if (Trackmont.app.getUser().get('admin')) {
            user.set('deviceLimit', -1);
        }
        if (Trackmont.app.getUser().get('expirationTime')) {
            user.set('expirationTime', Trackmont.app.getUser().get('expirationTime'));
        }
        dialog = Ext.create('Trackmont.view.dialog.User');
        dialog.down('form').loadRecord(user);
        dialog.show();
    },

    onDevicesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.getStore('AllGroups').load();
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.deviceTitle,
            items: {
                xtype: 'userDevicesView',
                baseObjectName: 'userId',
                linkObjectName: 'deviceId',
                storeName: 'AllDevices',
                linkStoreName: 'Devices',
                baseObject: user.getId()
            }
        }).show();
    },

    onGroupsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.settingsGroups,
            items: {
                xtype: 'userGroupsView',
                baseObjectName: 'userId',
                linkObjectName: 'groupId',
                storeName: 'AllGroups',
                linkStoreName: 'Groups',
                baseObject: user.getId()
            }
        }).show();
    },

    onGeofencesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedGeofences,
            items: {
                xtype: 'userGeofencesView',
                baseObjectName: 'userId',
                linkObjectName: 'geofenceId',
                storeName: 'AllGeofences',
                linkStoreName: 'Geofences',
                baseObject: user.getId()
            }
        }).show();
    },

    onNotificationsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedNotifications,
            items: {
                xtype: 'notificationsView',
                user: user
            }
        }).show();
    },

    onCalendarsClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedCalendars,
            items: {
                xtype: 'userCalendarsView',
                baseObjectName: 'userId',
                linkObjectName: 'calendarId',
                storeName: 'AllCalendars',
                linkStoreName: 'Calendars',
                baseObject: user.getId()
            }
        }).show();
    },

    onUsersClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.settingsUsers,
            items: {
                xtype: 'userUsersView',
                baseObjectName: 'userId',
                linkObjectName: 'managedUserId',
                storeName: 'Users',
                baseObject: user.getId()
            }
        }).show();
    },

    onAttributesClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedComputedAttributes,
            items: {
                xtype: 'userAttributesView',
                baseObjectName: 'userId',
                linkObjectName: 'attributeId',
                storeName: 'AllComputedAttributes',
                linkStoreName: 'ComputedAttributes',
                baseObject: user.getId()
            }
        }).show();
    },

    onDriversClick: function () {
        var user = this.getView().getSelectionModel().getSelection()[0];
        Ext.create('Trackmont.view.BaseWindow', {
            title: Strings.sharedDrivers,
            items: {
                xtype: 'userDriversView',
                baseObjectName: 'userId',
                linkObjectName: 'driverId',
                storeName: 'AllDrivers',
                linkStoreName: 'Drivers',
                baseObject: user.getId()
            }
        }).show();
    },


    onSelectionChange: function (selection, selected) {
        var disabled = selected.length === 0;
        this.lookupReference('userDevicesButton').setDisabled(disabled);
        this.lookupReference('userGroupsButton').setDisabled(disabled);
        this.lookupReference('userGeofencesButton').setDisabled(disabled);
        this.lookupReference('userNotificationsButton').setDisabled(disabled);
        this.lookupReference('userCalendarsButton').setDisabled(disabled);
        this.lookupReference('userAttributesButton').setDisabled(disabled);
        this.lookupReference('userDriversButton').setDisabled(disabled);
        this.lookupReference('userUsersButton').setDisabled(disabled || selected[0].get('userLimit') === 0);
        this.callParent(arguments);
    }
});
